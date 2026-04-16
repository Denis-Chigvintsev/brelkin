import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

import { Tooltip, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";

function LightDarkButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (computedColorScheme == "dark") {
          setColorScheme("light");
        } else {
          setColorScheme("dark");
        }
      }}
    >
      {computedColorScheme == "dark" && (
        <Tooltip label="дневной режим">
          <FaSun />
        </Tooltip>
      )}
      {computedColorScheme == "light" && (
        <Tooltip label="ночной режим">
          <FaMoon />
        </Tooltip>
      )}
    </div>
  );
}
export default LightDarkButton;
