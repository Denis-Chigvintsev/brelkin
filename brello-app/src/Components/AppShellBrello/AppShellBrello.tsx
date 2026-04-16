import { AppShell, Flex, Space, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUnit } from "effector-react";

import "@mantine/core/styles.css";

import UserMenue from "../../Components/User/UserMenue";
import Board from "../Board/Board";
import { $userMode } from "../Kanban/model";
import LightDarkButton from "../LightDarkButton/LightDarkButton";

function AppShellBrello() {
  const [mobileOpened] = useDisclosure();
  const [desktopOpened] = useDisclosure(false);

  const [userMode] = useUnit([$userMode]);

  return (
    <AppShell
      padding="md"
      header={{ height: 120 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Space h="sm" />
        <Flex justify="space-between" align={"center"} style={{ padding: "10px 20px" }}>
          <div></div>
          <div style={{ fontWeight: 700, fontSize: "20px" }}> Мистер Брелкин 🤔😂🤣 </div>
          <Flex gap="3px">
            <UserMenue />
            <LightDarkButton />
          </Flex>
        </Flex>
        <Flex justify="end" style={{ marginRight: "20px" }}>
          {userMode == false && <Text>Вы не авторизованы. Авторизуйтесь 😪 !</Text>}
        </Flex>
        <Flex justify="left" align={"center"} style={{ padding: "10px 20px", gap: "10px" }}></Flex>
      </AppShell.Header>
      <AppShell.Main>
        <Flex>
          <Board />
        </Flex>
      </AppShell.Main>
      <AppShell.Footer>
        <Flex justify="center" align="center">
          © Денис ⛹️‍♂️🚶‍♂️🛀
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
export default AppShellBrello;
