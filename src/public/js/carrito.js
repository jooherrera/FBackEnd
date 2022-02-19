const carritoDiv = document.querySelector('.carrito')

const getProducts = async () => {
  const data = await fetch(`/api/v1/cart/${carritoDiv.id}`)
  const products = await data.json()

  let html = ''

  products.body.data.userCart.products.forEach((product) => {
    html += `
  
    <div class='card mb-3'>
    <div class='row g-0'>
      <div class='col-md-4' style='width: 7rem; '>
        <img src=/resources${product.imageURL} class='img-thumbnail rounded-start' alt='imagen del producto' />
      </div>
      <div class='col-md-6'>
        <div class='card-body'>
          <h5 class='card-title'>${product.name}</h5>
          <p class='card-text'><small class='text-muted'>$${product.price}</small></p>

        </div>
      </div>
      <div class='col-md-2'>
    
        <br />
        <span class='badge bg-danger btn btnDelete' id=${product._idInCart} >Delete</span>

      </div>
    </div>
  </div>

  `
  })
  carritoDiv.innerHTML = html

  const btnsDelete = document.querySelectorAll('.btnDelete')
  btnsDelete.forEach((btn) => {
    btn.addEventListener('click', async () => {
      await fetch(`/api/v1/cart/${carritoDiv.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _idInCart: btn.id }),
      })

      window.location.reload()
    })
  })
}

getProducts()

const comprar = () => {
  window.location = '/order'
}
