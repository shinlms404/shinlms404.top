import { onMounted, onUnmounted, ref } from 'vue'

interface DarkMode {
  isDarkMode: Ref<boolean>
  toggleDarkMode: () => void
}

export function useDarkMode(): DarkMode {
  const isDarkMode = ref(true)

  const updateDarkModeClass = (isDark: boolean) => {
    document.documentElement.classList.toggle('dark', isDark)
  }

  const initDarkMode = () => {
    try {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode !== null) {
        isDarkMode.value = savedMode === 'true'
      }
      else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches
        isDarkMode.value = prefersDark
      }
      updateDarkModeClass(isDarkMode.value)
    }
    catch (error) {
      console.error('Failed to initialize dark mode:', error)
    }
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    try {
      localStorage.setItem('darkMode', isDarkMode.value.toString())
      updateDarkModeClass(isDarkMode.value)
    }
    catch (error) {
      console.error('Failed to toggle dark mode:', error)
    }
  }

  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem('darkMode')) {
      isDarkMode.value = e.matches
      updateDarkModeClass(isDarkMode.value)
    }
  }

  onMounted(() => {
    initDarkMode()
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    )
    darkModeMediaQuery.addEventListener('change', handleSystemThemeChange)
  })

  onUnmounted(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    )
    darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange)
  })

  return {
    isDarkMode,
    toggleDarkMode,
  }
}
