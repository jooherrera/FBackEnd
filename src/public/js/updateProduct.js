const updatProduct = async () => {
  const btnUpdate = document.querySelector('.btnUpdate')
  let element = document.getElementById('msg')
  element.style.display = 'none'
  let span = document.getElementById('msgSpan')
  const formElement = document.getElementById('f')

  const resp = await fetch(`/api/v1/products/${btnUpdate.id}`, {
    method: 'PATCH',
    body: new FormData(formElement),
  })

  if (resp.status === 202 || resp.status === 200) {
    if (element.style.display === 'none') {
      element.style.display = 'block'
    } else {
      element.style.display = 'none'
    }
  }
  if (resp.status === 200) {
    span.innerHTML = 'No se actualizo nada porque no envio informacion'
  }
  if (resp.status === 202) {
    span.innerHTML = 'Producto actualizado'
  }
}
