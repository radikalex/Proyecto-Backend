const homeDiv = document.getElementById('home');
const productsDiv = document.getElementById('products');
const productDetailDiv = document.getElementById('product-detail');
const sidebarFilters = document.getElementById("sidebar-filters");
const productsContainer = document.getElementById("products-container");

let categories = [];
let products = [];

function hideAllViews() {
    homeDiv.classList.replace('home', 'hide');
    productsDiv.classList.replace('products', 'hide');
    productDetailDiv.classList.replace('product-detail', 'hide');
}

function goHome() {
    hideAllViews();
    homeDiv.classList.replace('hide', 'home');
}

function goProducts() {
    hideAllViews();
    getCategories();
    getProducts();
    productsDiv.classList.replace('hide', 'products');
}

async function getProductById(id) {
    try {
        const res = await axios.get(`http://localhost:3000/products/getProductById/id/${id}`)
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

async function goProductDetail(product_id) {
    const product = await getProductById(product_id);
    hideAllViews();
    productDetailDiv.classList.replace('hide', 'product-detail');
    productDetailDiv.innerHTML = 
    `
        <div class="product-info">
            <div class="product-info-img"><img src="../product_images/${product.img_product}"></div>
            <div class="product-info-description">
                <span class="detail-name">${product.name}</span>
                <span class="detail-price">${product.price}$</span>
                <span class="detail-description">${product.description}</span>
                <button class="btn btn-primary">Add to the cart</button>
            </div>
        </div>
    `;
}

async function getCategories() {
    try {
        const res = await axios.get(`http://localhost:3000/categories/getCategories`)
        categories = res.data;
        printCategories(categories);
    } catch (error) {
        console.error(error);
    }
}

function printCategories(categories) {
    sidebarFilters.innerHTML = `<span class="header-sidebar">Categories</span>`;
    const ul = document.createElement('ul');
    ul.className = "categories-list"

    for (const category of categories) {
        const li = document.createElement('li');
        li.innerHTML = category.name;
        ul.appendChild(li)
    }
    sidebarFilters.appendChild(ul);
}

async function getProducts() {
    try {
        const res = await axios.get(`http://localhost:3000/products/getProducts`)
        products = res.data;
        printProducts(products);
    } catch (error) {
        console.error(error);
    }
}

function printProducts(products) {
    productsContainer.innerHTML = "";

    for (const product of products) {
        productsContainer.innerHTML += 
        `
            <div class="card" onclick="goProductDetail( ${ product.id })">
                <div class="product-img"><img class="card-img" src="../product_images/${product.img_product}"></div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}$</div>
            </div>
        `;
    }
}