import { useEffect, useState } from "react";

import { Button, Input, Paper, Space, Text } from "@mantine/core";
import { IconKey, IconLogin2, IconMail } from "@tabler/icons-react";
import { exhaustMap, from, fromEvent, map } from "rxjs";

import type { SignInDTO } from "../../miscellaneous/userTypes";
import { boardUpdated } from "../Kanban/model";
import { userModeSet } from "../Kanban/model";

function UserSignIn() {
  let email: string, pass: string;
  let user: SignInDTO;

  const [status, setStatus] = useState(-1);

  function handleSubmit(e: any) {
    e.preventDefault();
    user = { email, password: pass };

    e.target.email2.value = "";
    e.target.pass2.value = "";

    from(JSON.stringify(user))
      .pipe(
        exhaustMap(() => {
          return fetch("/api/auth/signin", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((json) => {
              setStatus(json.status);

              if (json.status == 200) {
                boardUpdated(json.exitDto.kanbanboard);
                userModeSet(true);
              } else {
                userModeSet(false);
              }
            })
            .catch((error) => console.log(error));
        }),
      )
      .subscribe();
  }

  useEffect(() => {
    const email_: any = document.getElementById("email2");
    fromEvent(email_, "change")
      .pipe(map((e: any) => e.target.value))
      .subscribe((data) => {
        console.log(data);
        email = data;
      });

    const pass_: any = document.getElementById("pass2");
    fromEvent(pass_, "change")
      .pipe(map((e: any) => e.target.value))
      .subscribe((data) => {
        console.log(data);
        pass = data;
      });
  }, []);

  if (status == -1) {
    return (
      <Paper>
        <form onSubmit={handleSubmit}>
          <label>
            Электронная почта:
            <Input type="email" placeholder="" required leftSection={<IconMail size={14} />} id="email2" />
          </label>
          <Space h="10px" />
          <label>
            Пароль:
            <Input
              id="pass2"
              type="password"
              placeholder=""
              required
              minLength={5}
              leftSection={<IconKey size={14} />}
            />
          </label>
          <Space h="10px" />

          <Button
            type="submit"
            fullWidth
            color="black"
            bg="blue.1"
            variant="light"
            mt="sm"
            leftSection={<IconLogin2 size={14} />}
          >
            Войти
          </Button>
        </form>
      </Paper>
    );
  }
  if (status == 200) return <Text> успешный вход</Text>;
  if (status == 401) return <Text>пользователь не существует или неверный пароль</Text>;
  return <Text>прочая ошибка, попробуйте войти еще раз</Text>;
}

export default UserSignIn;
