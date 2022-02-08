const canvas = document.getElementById('image-output')
const context = canvas.getContext('2d')

// wait until image is uploaded
document.getElementById('image-input').addEventListener('change', ({ target }) => {
	const [imageFile] = target.files
	const imageFileUrl = URL.createObjectURL(imageFile)
	const image = new Image()
	image.src = imageFileUrl
	image.addEventListener('load', () => {
		// resize canvas
		canvas.width = image.naturalWidth
		canvas.height = image.naturalHeight
		
		context.drawImage(image, 0, 0)

		// free memory
		URL.revokeObjectURL(image.src)
	})
})

let minimum = 0
let maximum = 1024

const minimumOutput = document.getElementById('minimum-range-output')
document.getElementById('minimum-range').addEventListener('change', ({ target: { value } }) => {
	minimum = value
	minimumOutput.innerText = value
})
const maximumOutput = document.getElementById('maximum-range-output')
document.getElementById('maximum-range').addEventListener('change', ({ target: { value } }) => {
	maximum = value
	maximumOutput.innerText = value
})

const output = document.getElementById('photosensor-value')
const socket = new WebSocket('ws://localhost:5000/serial')
socket.addEventListener('message', ({ data }) => {
	const sensorValue = Number(data)
	const normalizedSensorValue = (data / ( maximum - minimum )) * 100
	normalizedOutput = normalizedSensorValue
	canvas.style.opacity = normalizedSensorValue / 100
	output.innerText = `${sensorValue} \\ ${normalizedSensorValue}%`
})

