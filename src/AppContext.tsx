import { createContext, useState, PropsWithChildren } from "react";
import { FormValues } from "./types";

type AppState =
  | {
      mode: "welcome";
      initialValues: null;
    }
  | {
      mode: "configure";
      initialValues: FormValues;
    };

export const AppContext = createContext<{
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}>(null as any);

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const [appState, setAppState] = useState<AppState>({
    mode: "welcome",
    initialValues: null,
  });

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}
