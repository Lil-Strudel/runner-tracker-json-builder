import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/app-layout";
import HomePage from "./components/home-page";
import FileConfigurePage from "./components/file-configure-page";
import ImportFromLivePage from "./components/import-from-live-page";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/build" element={<FileConfigurePage />} />
      </Route>
      <Route path="/import-live" element={<ImportFromLivePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
