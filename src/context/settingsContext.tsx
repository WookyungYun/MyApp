// ** React Imports
import { createContext, useState, ReactNode } from "react";

// ** MUI Imports
import { PaletteMode } from "@mui/material";

// ** ThemeConfig Import
import themeConfig from "src/configs/themeConfig";

// ** Types Import
import { ContentWidth, ThemeColor } from "src/components/layout/types";

export type Settings = {
  mode: PaletteMode;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
};

export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};

const initialSettings: Settings = {
  themeColor: "primary",
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth,
};

// ** Create Context - context를 사용하면 컴포넌트 트리 전체에 데이터 제공가능(일일이 props전달안해도됨)
//createContext함수는 Provider과 Consumer를 반환
//데이터로는 현재 로그인한 유저, 테마, 선호하는 언어 많이 사용
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer; //자식이 무조건 함수여야함
