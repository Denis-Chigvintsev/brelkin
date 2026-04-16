import { Menu, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconLogin, IconLogout, IconUser, IconUserPlus } from "@tabler/icons-react";

import UserLogOut from "./UserLogOut";
import UserSignIn from "./UserSignIn";
import UserSignUp from "./UserSignUp";

function UserMenue() {
  return (
    <div>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Tooltip label="пользователь">
            <IconUser style={{ cursor: "pointer" }} />
          </Tooltip>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Пользователь</Menu.Label>
          <Menu.Item
            onClick={() => {
              modals.open({
                title: (
                  <Text size="lg" style={{ fontWeight: 700 }}>
                    😊😊😊
                  </Text>
                ),
                children: <UserSignUp />,
                radius: "md",
              });
            }}
            leftSection={<IconUserPlus size={14} />}
          >
            Регистрация
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              modals.open({
                title: (
                  <Text size="lg" style={{ fontWeight: 700 }}>
                    😊😊😊
                  </Text>
                ),
                children: <UserSignIn />,
                radius: "md",
              });
            }}
            leftSection={<IconLogin size={14} />}
          >
            Вход
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              modals.open({
                title: (
                  <Text size="lg" style={{ fontWeight: 700 }}>
                    😊😊😊
                  </Text>
                ),
                children: <UserLogOut />,
                radius: "md",
              });
            }}
            leftSection={<IconLogout size={14} />}
          >
            Выход
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
export default UserMenue;
