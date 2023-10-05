import { AppContext } from "@/AppContext";
import { useContext } from "react";
import WelcomePage from "./welcome-page";
import FileConfigurePage from "./file-configure-page";

function PageDisplayer() {
  const { appState } = useContext(AppContext);
  return (
    <div>
      {appState.mode === "welcome" && <WelcomePage />}
      {appState.mode === "configure" && <FileConfigurePage />}
    </div>
  );
}

export default PageDisplayer;
