const homeDiv = document.getElementById('home');
const productsDiv = document.getElementById('products');
const sidebarFilters = document.getElementById("sidebar-filters");
const productsContainer = document.getElementById("products-container");

let categories = [];
let products = [];

function hideAllViews() {
    homeDiv.classList.replace('home', 'hide');
    productsDiv.classList.replace('products', 'hide');
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
    sidebarFilters.innerHTML = "<span>Categories</span>"
    const ul = document.createElement('ul');

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
    while(productsContainer.firstChild) {
        productsContainer.replaceChild(productsContainer.firstChild);
    }

    for (const product of products) {
        productsContainer.innerHTML += 
        `
            <div class="card">
                <div class"card-header">${product.name}</div>
                <div class="card-img"><img src="../product_images/${product.img_product}"></div>
            </div>
        `;
    }
}