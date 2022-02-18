const prodDiv = document.getElementById('productsList')

const getProducts = async () => {
  const data = await fetch('/api/v1/products/')
  const products = await data.json()

  console.log(products.body.data)
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
      </div>
    </div>
    `
  })
  prodDiv.innerHTML = html

  const items = document.querySelectorAll('.product')

  items.forEach((item) => {
    item.addEventListener('click', () => {
      window.location = `product/${item.id}`
    })
  })
}

getProducts()
