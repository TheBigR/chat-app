const socket = io()

socket.on('message', (message) => {
  console.log(message)
})

const messageForm = document.querySelector('#message-form')

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = e.target.elements.message.value
  socket.emit('sendMessage', message, (error) => {
    if (error) {
      return console.log(error)
    }
    console.log('MessageDelivared!')
  })
})

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      'sendLocation',
      {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      },
      () => {
        console.log('Location shared!')
      },
    )
  })
})
