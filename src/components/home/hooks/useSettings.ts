import { useState } from "react";
import { useTranslation } from "react-i18next";

export function useSettings() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");
  const [darkMode, setDarkMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return {
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    isAdminMode,
    setIsAdminMode,
    changeLanguage,
  };
}
