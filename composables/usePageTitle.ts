export function usePageTitle() {
  const siteName = 'Charlie Chan'
  const separator = ' ｜ '

  const setTitle = (pageTitle: string, section?: string) => {
    let title = pageTitle
    if (section) {
      title = `${section} - ${pageTitle}`
    }
    title = `${title}${separator}${siteName}`

    useHead({
      title,
    })
  }

  return {
    setTitle,
    siteName,
    separator,
  }
}
