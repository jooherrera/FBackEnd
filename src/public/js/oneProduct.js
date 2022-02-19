const prodDiv = document.querySelector('.producto')
const getProduct = async () => {
  const user = document.querySelector('.user')
  const data = await fetch(`/api/v1/products/${prodDiv.id}`)
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
    `
  })
  prodDiv.innerHTML = html
}

getProduct()

const back = () => {
  history.back()
}
