const socket = io()

//! Historial de chats
socket.on('historial', (data) => {
  try {
    let inner = ''
    data.map((msg) => {
      inner += `
      <div>
        <b style="color:blue">${msg.sennder}</b>
        [<span style="color:brown;">${msg.sendAt}</span>] : 
        <i style ="color:green">${msg.message}</i>
      </div>
      `
    })
    document.getElementById('mensajes').innerHTML = inner
  } catch (error) {
    document.getElementById('mensajes').innerHTML = `<h2 class="text-center"> No hay mensajes </h2>`
  }
})

//!El back envia el chat en tiempo real.
socket.on('chatBack', (data) => {
  let inner = `
      <div>
        <b style="color:blue">${data.sennder}</b>
        [<span style="color:brown;">${data.sendAt}</span>] : 
        <i style ="color:green">${data.message}</i>
      </div>
      `
  document.getElementById('mensajes').innerHTML += inner
})

socket.on('chatPersonal', (data) => {
  try {
    let inner = ''
    data.map((msg) => {
      inner += `
       <div>
         <b style="color:blue">${msg.sennder}</b>
         [<span style="color:brown;">${msg.sendAt}</span>] : 
         <i style ="color:green">${msg.message}</i>
       </div>
       `
    })
    document.getElementById('mensajes').innerHTML = inner
  } catch (error) {
    document.getElementById('mensajes').innerHTML = `<h2 class="text-center"> No hay mensajes </h2>`
  }
})
