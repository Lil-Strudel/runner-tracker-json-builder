import { AppContext } from "@/AppContext";
import { useContext } from "react";
import WelcomePage from "./welcome-page";
import FileConfigurePage from "./file-configure-page";
import ImportFromLivePage from "./import-from-live-page";

function PageDisplayer() {
  const { appState } = useContext(AppContext);
  return (
    <div>
      {appState.mode === "welcome" && <WelcomePage />}
      {appState.mode === "configure" && <FileConfigurePage />}
      {appState.mode === "import-live" && <ImportFromLivePage />}
    </div>
  );
}

export default PageDisplayer;
