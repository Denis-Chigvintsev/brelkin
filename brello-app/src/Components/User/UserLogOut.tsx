import { useState } from "react";

import { debounceTime, exhaustMap, from, take } from "rxjs";

import { userModeSet } from "../Kanban/model";

export default function UserLogOut(e: any) {
  const [status, setStatus] = useState(-1);

  from([e])
    .pipe(
      debounceTime(300),
      exhaustMap(() => {
        return fetch("/api/auth/logout", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.status == 200) {
              userModeSet(false);
            }

            console.log(json);
            setStatus(json.status);
          })
          .catch((error) => console.log(error));
      }),
      take(1),
    )
    .subscribe();

  if (status == 200) return <div>Успешный выход</div>;
}
