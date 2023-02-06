const allProducts = [];
let currentProduct;
let tempProduct
const basket = []
let loaderEl = document.getElementsByClassName("loader")[0];
let spinnerEl = document.getElementsByClassName("spinner")[0];
let prodImgEl = document.getElementsByClassName("image")[0];

class Product {
  constructor(id, brand, productName, img, rating, url) {
    this.id = id;
    this.brand = brand;
    this.productName = productName;
    this.img = img;
    this.rating = rating;
    this.url = url;
  }
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8b6f1716a6mshcf509a7454e36cap1c2035jsna43f7158d40f",
    "X-RapidAPI-Host": "sephora.p.rapidapi.com",
  },
};
//FETCH API Data
fetch(
  "https://sephora.p.rapidapi.com/products/list?categoryId=cat150006&pageSize=60&currentPage=1",
  options
)
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log(`Something went wrong. ${error}`);
    }
  })
  .then((jsonResp) => {
    let data = jsonResp.products;
    // console.log(data);
    createProducts(data);
    toggleLoader()
  })
  .catch((err) => console.error(err))
  .finally();

function createProducts(product) {
  product.forEach((element) => {
    const newProduct = new Product(
      element.productId,
      element.brandName,
      element.displayName,
      element.image250,
      element.rating,
      `https://www.sephora.com/${element.targetUrl}`
    );
    allProducts.push(newProduct);
    // console.log(allProducts);
  });
}

function toggleLoader(){
  loaderEl.classList.toggle("loader");
  spinnerEl.classList.toggle("spinner");
}

function toggleImgLoader(){
  prodImgEl.classList.toggle('image')
  let div = document.createElement('div')
  div.classList.toggle('spinner')
  prodImgEl.appendChild(div)
  prodImgEl.classList.toggle('spinner')
}

function generateRandomProduct() {
  // console.log('current product 1', currentProduct)
  // console.log('previous product 1', previousProduct)
  // if(currentProduct){
  //   previousProduct = currentProduct
  //   console.log('previous product in IF', previousProduct)
  // }
  
  let prodContainer = document.getElementsByClassName("product-container")[0];
  rProd = Math.floor(Math.random() * allProducts.length);
  currentProduct = allProducts[rProd]

  if(prodContainer.childElementCount > 0){
    //Update product displayed
    document.getElementsByClassName('image')[0].src = currentProduct.img
    document.getElementsByClassName('brand')[0].innerText = currentProduct.brand;
    document.getElementsByClassName('name')[0].innerText = currentProduct.productName;
    document.getElementsByClassName('rating')[0].innerText = currentProduct.rating;
  }
  if(prodContainer.childElementCount === 0 ){
    //Create product displayed
    let imgEl = document.createElement('img')
    imgEl.className = 'image'
    let brandEl = document.createElement('h3')
    brandEl.className = 'brand'
    let nameEl = document.createElement('h4')
    nameEl.className = 'name'
    let aEl = document.createElement('a')
    aEl.innerText = 'View Product Details'
    aEl.className = 'btn btn-primary position-relative button-color'
    aEl.role = 'button'
    aEl.target = '_blank'

    nameEl.appendChild(aEl)
    let ratingEl = document.createElement('h5')
    ratingEl.className = 'rating'
    let basketButtonEl = document.createElement('button')
    basketButtonEl.className = 'btn btn-primary position-relative center button-color'
    basketButtonEl.type = 'button'
    basketButtonEl.innerText = 'Add to Cabinet'
    
    //Randomly display a new product
    imgEl.src = currentProduct.img;
    brandEl.innerText = currentProduct.brand;
    nameEl.innerText = currentProduct.productName;
    ratingEl.innerText = currentProduct.rating;
    aEl.href = currentProduct.url
  
    prodContainer.appendChild(imgEl)
    prodContainer.appendChild(brandEl)
    prodContainer.appendChild(nameEl)
    prodContainer.appendChild(ratingEl)
    prodContainer.appendChild(basketButtonEl)
    prodContainer.appendChild(aEl)
  }
}

function addCabinetProduct(){
  // console.log('current product', currentProduct)
  // console.log('previous product 2', previousProduct)
  if(currentProduct === tempProduct){
    window.alert(
      `You've already added this product. Add a different product to build your ultimate skincare cabinet!`
    );
  } else if(currentProduct){
    basket.push(currentProduct)
    let ul= document.getElementsByClassName('basket-products')[0]
    let img = document.createElement('img')
    let li = document.createElement('li')

    img.setAttribute('height', '25px')
    img.setAttribute('width', '25px')
    img.setAttribute('border-radius', '25%')
    img.setAttribute('src', currentProduct.img)

    li.appendChild(img)
    li.appendChild(document.createTextNode(currentProduct.productName))
    
    ul.appendChild(li)

  }

  tempProduct = currentProduct
}

function emptyCabinet(){
  let cabinet = document.querySelectorAll('.basket-products li')
  if(cabinet.length === 0){
    window.alert(`Your cabinet is empty! Add a new product to your cabinet to empty it.`)
  } else (
    cabinet.forEach((element) =>{
      element.remove()
    })
  )

}
function checkBasket(){

}

document.querySelectorAll("body").forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target.innerText === "Generate Products!") {
      generateRandomProduct();
      //toggleImgLoader()
    }
    if (event.target.innerText === "Add to Cabinet") {
      addCabinetProduct()
    }
    if (event.target.innerText === "Empty Cabinet") {
      emptyCabinet()
    }
  });
  item.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      //toggleSearch();
    }
  });
});
