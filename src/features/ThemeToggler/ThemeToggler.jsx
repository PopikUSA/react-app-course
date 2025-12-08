
// import cls from "./ThemeToggler.module.css";
// import { useTheme } from "../../hooks/useTheme";
// import { THEME_STORAGE } from "../../constants";

// export const ThemeToggler = () => {
//   const { theme, setTheme } = useTheme();

//   const onChangeHandler = (e) => {
//     const isChecked = e.target.checked;
//     const updatedTheme = isChecked ? "dark" : "light";

//     setTheme(updatedTheme);
//     localStorage.setItem(THEME_STORAGE, updatedTheme);
//     // Класс body управляется в ThemeProvider через useEffect — не трогаем здесь
//   };

//   return (
//     <label className={cls.switch}>
//       <input
//         type="checkbox"
//         onChange={onChangeHandler}
//         checked={theme === "dark"} // ← теперь всегда корректно
//       />
//       <span className={cls.slider}></span>
//       <span className={cls.clouds_stars}></span>
//     </label>
//   );
// };

// components/ThemeToggler.jsx
import cls from "./ThemeToggler.module.css";
import { useTheme } from "../../hooks/useTheme";
import { THEME_STORAGE } from "../../constants";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme(); // ← теперь setTheme сохраняет в localStorage

  const onChangeHandler = (e) => {
    const isChecked = e.target.checked;
    const updatedTheme = isChecked ? "dark" : "light";

    setTheme(updatedTheme); // ← сохраняется + обновляется класс
  };

  return (
    <label className={cls.switch}>
      <input
        type="checkbox"
        onChange={onChangeHandler}
        // theme теперь никогда null — безопасно
        checked={theme === "dark"}
      />
      <span className={cls.slider}></span>
      <span className={cls.clouds_stars}></span>
    </label>
  );
};