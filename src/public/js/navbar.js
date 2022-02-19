const logOut = () => {
  window.location = '/logout'
}

const updateInfo = () => {
  const user = document.querySelector('.user')

  window.location = `/user/update/${user.id}`
}

const home = () => {
  window.location = '/'
}

const carrito = () => {
  window.location = '/carrito'
}
