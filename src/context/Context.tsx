import { createContext, useContext } from 'react';

export interface AppContextValue {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextValue>({
  language: 'es',
  setLanguage: () => {},
  theme: 'dark',
  setTheme: () => {},
});

export const useAppContext = () => useContext(AppContext);
