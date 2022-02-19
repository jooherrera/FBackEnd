const prodDiv = document.getElementById('productsList')

const getProducts = async () => {
  const user = document.querySelector('.user')
  const data = await fetch('/api/v1/products/')
  const products = await data.json()

  let html = ''
  products.body.data.forEach((product) => {
    html += `
      <div class="col" >
      <div class="card h-100"  >
   
        <img src=/resources${product.info.imageURL} class="card-img-top product h-100 w-100"   alt="Imagen del producto" id= ${product._id}>
        <div class="card-body" >
          <h5 class="card-title">${product.info.name}</h5>
          <p class="card-text">${product.info.description}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">${product.info.price}</small>
        </div>
        <button class="btnAdd" id=${product._id} > Add</button>
      </div>
    </div>
    `
  })
  prodDiv.innerHTML = html

  const items = document.querySelectorAll('.product')
  const btnAdd = document.querySelectorAll('.btnAdd')

  items.forEach((item) => {
    item.addEventListener('click', () => {
      window.location = `product/${item.id}`
    })
  })

  btnAdd.forEach((btn) => {
    btn.addEventListener('click', async () => {
      await fetch(`/api/v1/cart/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: btn.id }),
      })
    })
  })
}

getProducts()
