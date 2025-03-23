<script setup>
import downloadImage from '@tools/signature/src/downloadImage'

const canvas = ref(null)
let ctx = null

onMounted(() => {
  const canvasEl = canvas.value
  ctx = canvasEl.getContext('2d')
  canvasEl.width = 800
  canvasEl.height = 600
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 2

  let drawing = false

  const startDrawing = (event) => {
    drawing = true
    ctx.beginPath()
    ctx.moveTo(event.offsetX, event.offsetY)
  }

  const draw = (event) => {
    if (!drawing)
      return
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke()
  }

  const stopDrawing = () => {
    drawing = false
    ctx.closePath()
  }

  canvasEl.addEventListener('mousedown', startDrawing)
  canvasEl.addEventListener('mousemove', draw)
  canvasEl.addEventListener('mouseup', stopDrawing)
  canvasEl.addEventListener('mouseleave', stopDrawing)
})

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
}

function saveSignature() {
  const dataURL = canvas.value.toDataURL('image/png')
  downloadImage(dataURL, 'signature.png')
  console.warn('Signature saved:', dataURL)
}
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <canvas ref="canvas" class="border border-gray dark:border-gray-300 rounded-md cursor-crosshair bg-gray-100" />
    <div class="mt-5">
      <button @click="clearCanvas">
        Clear
      </button>
      <button @click="saveSignature">
        Save
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
