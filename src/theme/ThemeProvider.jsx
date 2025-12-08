
// import { createContext, useState, useEffect } from "react";
// import { THEME_STORAGE } from "../constants";

// export const ThemeContext = createContext(null);

// export const ThemeProvider = ({ children }) => {
//   // Читаем тему из localStorage или "light" по умолчанию
//   const savedTheme = localStorage.getItem(THEME_STORAGE) || "light";
//   const [theme, setTheme] = useState(savedTheme);

//   // Синхронизируем класс body с текущей темой
//   useEffect(() => {
//     if (theme === "dark") {
//       document.body.classList.add("darkLayout");
//     } else {
//       document.body.classList.remove("darkLayout");
//     }
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// theme/ThemeProvider.jsx
import { createContext, useState, useEffect } from "react";
import { THEME_STORAGE } from "../constants";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Инициализируем состояние как null, пока не узнаем тему
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    // 1. Читаем сохранённую тему
    const savedTheme = localStorage.getItem(THEME_STORAGE);
    
    // 2. Определяем системную тему
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    // 3. Решаем итоговую тему:
    //    - если пользователь выбрал — берём её,
    //    - иначе — системную.
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);

    // 4. Подписываемся на изменения системной темы
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      // Меняем тему ТОЛЬКО если пользователь ещё ничего не выбрал
      if (!localStorage.getItem(THEME_STORAGE)) {
        setTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // 5. Синхронизируем класс body с текущей темой (как только theme !== null)
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("darkLayout");
    } else if (theme === "light") {
      document.body.classList.remove("darkLayout");
    }
    // Если theme === null — ещё не инициализировано, ничего не делаем
  }, [theme]);

  // 6. Обёртка для setTheme, которая сохраняет выбор в localStorage
  const setThemeWithPersistence = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE, newTheme);
  };

  // Пока тема не инициализирована — не рендерим дочерние компоненты (во избежание моргания)
  if (theme === null) {
    return null; // или <div>Loading...</div>, но null быстрее
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeWithPersistence }}>
      {children}
    </ThemeContext.Provider>
  );
};