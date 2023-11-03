import ThemeSwitcherButton from "../components/ThemeSwitcher/ThemeSwitcher";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContextTheme } from "../context/ThemeContext";

export default function Inside() {
  const { theme } = useContextTheme();

  return (
    <div>
      <ConnectWallet switchToActiveChain={true} theme={theme} />
      <ThemeSwitcherButton />
    </div>
  );
}
