const btn = document.getElementById('btnChat')
const email = document.getElementById('email')
const msg = document.getElementById('msg')
btn.addEventListener('click', (e) => {
  e.preventDefault()
  if (email.value !== '') {
    info = {
      user: email.value,
      sennder: 'User',
      message: msg.value,
    }
    socket.emit('chatFront', info)
  }
})
