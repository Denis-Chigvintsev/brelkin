import { useEffect, useState } from "react";

import { Button, Input, Paper, Space, Text } from "@mantine/core";
import { IconKey, IconMail, IconPhone, IconPlus, IconUser } from "@tabler/icons-react";
import { exhaustMap, from, fromEvent, map } from "rxjs";

import type { User } from "../../miscellaneous/userTypes";

function UserSignUp() {
  let email: string, pass: string, nick: string, contactPhone: string;
  let user: User;

  const [status, setStatus] = useState(-1);

  function handleSubmit(e: any) {
    e.preventDefault();
    user = { email, password: pass, name: nick, contactPhone };

    //////////////////
    /*
    const signUpFx = createEffect<any>((user: User) => {
      return fetch("/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    });
  
    */
    /////////////////////////
    e.target.email1.value = "";
    e.target.pass1.value = "";
    e.target.nick1.value = "";
    e.target.phone1.value = "";

    from(JSON.stringify(user))
      .pipe(
        exhaustMap(() => {
          return fetch("/api/auth/signup", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((json) => {
              console.log(json.status);
              setStatus(json.status);
            })
            .catch((error) => console.log(error));
        }),
      )
      .subscribe();
  }

  useEffect(() => {
    const email_: any = document.getElementById("email1");
    fromEvent(email_, "change")
      .pipe(map((e: any) => e.target.value))
      .subscribe((data) => {
        console.log(data);
        email = data;
      });

    const pass_: any = document.getElementById("pass1");
    fromEvent(pass_, "change")
      .pipe(map((e: any) => e.target.value))
      .subscribe((data) => {
        console.log(data);
        pass = data;
      });

    const nick_: any = document.getElementById("nick1");
    fromEvent(nick_, "change")
      .pipe(map((e: any) => e.target.value))
      .subscribe((data) => {
        console.log(data);
        nick = data;
      });

    const contactPhone_: any = document.getElementById("phone1");
    fromEvent(contactPhone_, "change")
      .pipe(map((e: any) => e.target.value))
      .subscribe((data) => {
        console.log(data);
        contactPhone = data;
      });
  }, []);

  if (status == -1) {
    return (
      <Paper>
        <form onSubmit={handleSubmit}>
          <label>
            Электронная почта:
            <Input type="email" placeholder="" required leftSection={<IconMail size={14} />} id="email1" />
          </label>
          <Space h="10px" />
          <label>
            Пароль:
            <Input
              id="pass1"
              type="password"
              placeholder=""
              required
              minLength={5}
              leftSection={<IconKey size={14} />}
            />
          </label>
          <Space h="10px" />
          <label>
            Имя или Ник:
            <Input placeholder="" required leftSection={<IconUser size={14} />} id="nick1" />
          </label>
          <Space h="10px" />
          <label>
            Контактный телефон:
            <Input id="phone1" placeholder="" leftSection={<IconPhone size={14} />} />
          </label>
          <Space h="10px" />
          <Button
            type="submit"
            fullWidth
            color="black"
            bg="blue.1"
            variant="light"
            mt="sm"
            leftSection={<IconPlus size={14} />}
          >
            Зарегистрировать
          </Button>
        </form>
      </Paper>
    );
  }

  if (status == 200) {
    return <Text>успешная регистрация</Text>;
  }
  if (status == 400) {
    return <Text>пользователь с таким email уже существует -- попробуйте другой</Text>;
  }

  return <Text> ошибка - попробуйте зарешистрироваться еще раз </Text>;
}
export default UserSignUp;
