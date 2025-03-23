export default (base64: string, output: string) => {
  const link = document.createElement('a')
  link.href = base64
  link.download = output // 下载的文件名
  link.click()
  link.remove()
}
