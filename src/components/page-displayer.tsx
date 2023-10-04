import { AppContext } from "@/AppContext";
import React, { useContext } from "react";
import WelcomePage from "./welcome-page";

function PageDisplayer() {
  const { appState } = useContext(AppContext);
  return (
    <div>
      {appState.mode === "welcome" && <WelcomePage />}
      {appState.mode === "configure" && <div>FileConfigurePage</div>}
    </div>
  );
}

export default PageDisplayer;
