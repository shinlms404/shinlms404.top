import { ref, onMounted } from "vue";

export const useDarkMode = () => {
  const isDarkMode = ref(true);

  const initDarkMode = () => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      isDarkMode.value = savedMode === "true";
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      isDarkMode.value = prefersDark;
    }
  };

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem("darkMode", isDarkMode.value.toString());
  };

  onMounted(() => {
    initDarkMode();
  });

  return {
    isDarkMode,
    toggleDarkMode
  };
};
