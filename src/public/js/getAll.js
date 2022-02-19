const prodDiv = document.getElementById('AllProducts')

const getProducts = async () => {
  const data = await fetch('/api/v1/products/')
  const products = await data.json()

  let html = ''
  products.body.data.forEach((product) => {
    html += `
  
    <div class='card mb-3'>
    <div class='row g-0'>
      <div class='col-md-4' style='width: 7rem; '>
        <img src=/resources${product.info.imageURL} class='img-thumbnail rounded-start' alt='imagen del producto' />
      </div>
      <div class='col-md-6'>
        <div class='card-body'>
          <h5 class='card-title'>${product.info.name}</h5>
          <p class='card-text'><small class='text-muted'>$${product.info.price}</small></p>
          <p class='card-text'><small class='text-muted'>STOCK:${product.info.stock}</small></p>
        </div>
      </div>
      <div class='col-md-2'>
        <span class='badge bg-warning text-dark btn btnEdit' id=${product._id}>Edit</span>
        <br />
        <span class='badge bg-danger btn btnDelete' id=${product._id}>Delete</span>

      </div>
    </div>
  </div>

  `
  })
  prodDiv.innerHTML = html

  const btns = document.querySelectorAll('.btnEdit')
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      window.location = `/product/update/${btn.id}`
    })
  })

  const btnsDelete = document.querySelectorAll('.btnDelete')
  btnsDelete.forEach((btn) => {
    btn.addEventListener('click', async () => {
      await fetch(`/api/v1/products/${btn.id}`, { method: 'DELETE' })

      window.location.reload()
    })
  })
}

getProducts()
