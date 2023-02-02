const allProducts = [];

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

//   Promise.all(fetchAPI(urls));

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
    console.log(data);
    createProducts(data);
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
    console.log(allProducts);
  });
}

document.querySelectorAll("body").forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log(event.target);
      if (event.target.innerText === "Sephora Products") {
        console.log('hi')
        //Update product displayed
        let imgEl = document.getElementsByClassName('image')
        let brandEl = document.getElementsByClassName('brand')
        let nameEl = document.getElementsByClassName('name')
        let ratingEl = document.getElementsByClassName('rating')
        console.log(imgEl)
        

        rProd = Math.floor(Math.random() * allProducts.length);
        console.log(imgEl.src)
        console.log(allProducts[rProd].img)
        imgEl.src = allProducts[rProd].img
        //loadPageContent(allRetrievedData,event.target.innerText)
      }
    });
    item.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        //toggleSearch();
      }
    });
  });
