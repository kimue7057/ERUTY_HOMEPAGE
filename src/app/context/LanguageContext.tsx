import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "ko" | "en";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({ lang: "ko", setLang: () => {}, toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("eruty-lang") as Lang) || "ko";
    } catch {
      return "ko";
    }
  });

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem("eruty-lang", l);
    } catch {
      return;
    }
    setLangState(l);
  };

  const toggle = () => setLang(lang === "ko" ? "en" : "ko");

  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);
