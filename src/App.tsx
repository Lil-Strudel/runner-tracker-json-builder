import { AppContextProvider } from "./AppContext";
import PageDisplayer from "./components/page-displayer";

function App() {
  return (
    <AppContextProvider>
      <PageDisplayer />
    </AppContextProvider>
  );
}

export default App;
