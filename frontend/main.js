const homeDiv = document.getElementById("home");
const productsDiv = document.getElementById("products");
const sidebarFilters = document.getElementById("sidebar-filters");
const productsContainer = document.getElementById("products-container");
const inputSearch = document.getElementById("search");
const productModal = document.getElementById("productModal");

let categories = [];
let products = [];
let cart = [];
let category_active = 0;
let min_price = "1";
let max_price = "9999";
let priceOrder = "";
let stars_review = 1;

let modalSignUp, modalLogIn, modalProductDetail, cartModal;

function hideAllViews() {
  homeDiv.classList.replace("home", "hide");
  productsDiv.classList.replace("products", "hide");
}

function loadUserInfo() {
  cart = [];
  const user_session = JSON.parse(localStorage.getItem('user_session'));
  const div = document.getElementById('user-nav');

  if(!user_session || user_session === "") {
    div.innerHTML = 
    `
      <button class="btn btn-primary" onclick="showSignUpModal(event)">Sign Up</button>
      <button class="btn btn-secondary" onclick="showLogInModal(event)">Log In</button>
    `;
  }
  else { 
    div.innerHTML = 
    `
      <div class="user-navArea">
        <div class="user-data">
          <div class="user-info" id="user-info" onclick="displayUserOptions(this)">
            <img src="./assets/user-icon.png" class="user-info-icon">
            <span class="user-info-name">${user_session.user.name}</span>
            <img src="./assets/arrow-down.png" class="arrow-options" id="arrow-options">
          </div>
          <div class="user-options">
            <span onclick="showOrdersUser()">My orders</span>
            <span onclick="logOut()">Log Out</span>
          </div>
        </div>
        <div class="cart-area" onclick="showCartModal()">
          <span class="num-products" id="num-products">${cart.length}</span>
          <img src="./assets/cart-icon.png" class="cart-img">
        </div>
      </div>
    `;
  }
}

function showCartModal() {
  loadBodyCartModal();
  cartModal = new bootstrap.Modal(document.getElementById("cartModal"), {});
  cartModal.show();
}

function loadBodyCartModal() {
  const cartBodyModal = document.getElementById("cartModalBody");
  let cart_innerHtml = ``;
  if(cart.length === 0)
    cart_innerHtml = `No products in your cart. Add some!"`;
  else {
    for (const item of cart) {
      cart_innerHtml += 
      `
      <div class="cart-product">
        <div class="cart-product-remove"><button onclick="removeCartProduct(${item.product.id})" class="btn btn-danger"><img class="cart-remove-img" src="./assets/remove-icon.png"<button></div>
        <div class="cart-product-image"><img class="cart-product-img" src="../product_images/${item.product.img_product}"></div>
        <div class="cart-product-name">${item.product.name}</div>
        <div class="cart-product-amount">${item.amount} ${item.amount > 1 ? "units" : "unit"}</div>
        <div class="cart-product-price">${item.product.price}$</div>
        </div>
      `;
    }
    cart_innerHtml += 
    `     
          <div class="total-price"><span class="total-price-label">Total price:</span> <span class="total-price-value">${getCartTotalPrice().toFixed(2)}$</span></div> 
          <div class="cart-buy"><button onclick="buy()" class="btn btn-primary buy">Buy</div> 
    `
  }
  cartBodyModal.innerHTML = cart_innerHtml;
}

async function buy() {
  const user_session = JSON.parse(localStorage.getItem('user_session'));
  const body = {
    "date": new Date(),
    "user_id": user_session.user.id,
    "products": []
  }
  for (const item of cart) {
    body["products"].push({"id": item.product.id, "amount": item.amount});
  }
  try {
    const res = await axios.post(`http://localhost:3000/orders/createOrder`, body);
    cart = [];
    document.getElementById('num-products').innerHTML = `${getCartNumItems()}`;
    cartModal.hide();
  } catch (error) {
    console.error(error);
  }
}

function removeCartProduct(product_id) {
  for (let i = 0; i < cart.length; i++) {
    if(cart[i].product.id === product_id) {
      cart.splice(i, 1);
      document.getElementById('num-products').innerHTML = `${getCartNumItems()}`;
      loadBodyCartModal();
      return;
    }
  }
}

function displayUserOptions(div) {
  const content = div.nextElementSibling;
  const img = document.getElementById('arrow-options');

  if (content.style.maxHeight) {
    img.src = "./assets/arrow-down.png";
    content.style.maxHeight = null;
  } else {
    img.src = "./assets/arrow-up.png";
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function goHome() {
  hideAllViews();
  homeDiv.classList.replace("hide", "home");
}

function goProducts() {
  hideAllViews();
  categories = [];
  products = [];
  category_active = 0;
  inputSearch.value = "";
  min_price = "1";
  max_price = "9999";
  priceOrder = "";
  getCategories();
  getProductsQuery();
  productsDiv.classList.replace("hide", "products");
}

async function getProductById(id) {
  try {
    const res = await axios.get(`http://localhost:3000/products/getProductById/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

function searchProductsByName(event) {
  event.preventDefault();

  getProductsQuery();
}

async function getProductsQuery() {
  const query = inputSearch.value.trim();

  try {
      const res = await axios.get(`http://localhost:3000/products/getProductsQuery?name=${query}&category=${category_active}&minPrice=${min_price}&maxPrice=${max_price}&priceOrder=${priceOrder}`);
      products = res.data.results;
      printProducts(products);
  } catch (error) {
      console.error(error);
  }
    
}

function switchCategory(id) {
  category_active = id;
  const li_categories = document.querySelectorAll('.sidebar-filters li');

  if(id === 0)
    li_categories[0].className = "category-active";
  else
    li_categories[0].className = "";
  for (let i = 1; i < li_categories.length; i++) {
    if(categories[i-1].id === id) 
      li_categories[i].className = "category-active";
    else
      li_categories[i].className = "";
  }

  getProductsQuery();
}

function showLogInModal(e) {
  e.preventDefault();
  document.getElementById('login-email').value = "";
  document.getElementById('login-password').value = "";
  modalLogIn = new bootstrap.Modal(document.getElementById("logInModal"), {});
  modalLogIn.show();
}

async function logIn(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const alerts_div = document.getElementById('logIn-alerts');

  try {
    const res = await axios.post(`http://localhost:3000/users/login`, {email, password});
    if(!res.data.ok) {
      createValidationAlert(alerts_div, res.data.message, 3000);
      return;
    }
    const user = res.data.user;
    const btn_logIn = document.getElementById("btn-logIn");
    btn_logIn.disabled = true;
    while (alerts_div.firstChild) {
      alerts_div.removeChild(alerts_div.firstChild);
    }
    const pop_alert = document.createElement('div');
    pop_alert.className = "alert alert-success";
    pop_alert.role = "alert";
    pop_alert.innerHTML = `Welcome ${user.name}!`;
    alerts_div.appendChild(pop_alert);
    localStorage.setItem('user_session', JSON.stringify( {user: {id: user.id, name: user.name}, token: res.data.token} ));
    
    setTimeout(() => pop_alert.remove(), 1000);

    setTimeout(() => {
      loadUserInfo();
      modalLogIn.hide();
      btn_logIn.disabled = false;
    }, 1000);

  } catch(err) {
    console.error(err);
  }
}

async function logOut() {
  const user_session = JSON.parse(localStorage.getItem('user_session'));
  const headers = {
    'Authorization': user_session.token
  };

  try {
    const res = await axios.delete(`http://localhost:3000/users/logout`, { headers })
    localStorage.removeItem('user_session');
    loadUserInfo();
  } catch(error) {
    console.error(error);
  }
}

function showSignUpModal(e) {
  e.preventDefault();
  document.getElementById('signup-name').value = "";
  document.getElementById('signup-email').value = "";
  document.getElementById('signup-password').value = "";
  document.getElementById('signup-password2').value = "";
  modalSignUp = new bootstrap.Modal(document.getElementById("signUpModal"), {});
  modalSignUp.show();
}

async function signUp(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const password2 = document.getElementById('signup-password2').value;
  const alerts_div = document.getElementById('signUp-alerts');

  if(name === "" || email === "" || password === "" || password2 === "") {
    createValidationAlert(alerts_div, "It is necessary to fill in all the fields", 3000);
    return;
  }
  if( ! /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gm.test(email) ) {
    createValidationAlert(alerts_div, "The email format is not valid", 3000);
    return;
  }
  if(password !== password2) {
    createValidationAlert(alerts_div, "Passwords don't match", 3000);
    return;
  }
  try {
    const res = await axios.post(`http://localhost:3000/users/createUser`, {name, email, password})
    if(!res.data.ok) {
      createValidationAlert(alerts_div, res.data.msg, 3000);
      return;
    }
    const user = res.data.user;
    const btn_signUp = document.getElementById("btn-signUp");
    btn_signUp.disabled = true;
    while (alerts_div.firstChild) {
      alerts_div.removeChild(alerts_div.firstChild);
    }
    const pop_alert = document.createElement('div');
    pop_alert.className = "alert alert-success";
    pop_alert.role = "alert";
    pop_alert.innerHTML = `Welcome to our page ${user.name}! You can now log in.`;
    alerts_div.appendChild(pop_alert);
    
    setTimeout(() => pop_alert.remove(), 2000);

    setTimeout(() => {
      modalSignUp.hide();
      btn_signUp.disabled = false;
    }, 2000);

  } catch(err) {
    console.error(err);
  }
}

function createValidationAlert(alerts_div, message, time) {

  while (alerts_div.firstChild) {
      alerts_div.removeChild(alerts_div.firstChild);
  }

  const pop_alert = document.createElement('div');
  pop_alert.className = "alert alert-danger";
  pop_alert.role = "alert";
  pop_alert.innerHTML = message;
  alerts_div.appendChild(pop_alert);
  
  setTimeout(() => pop_alert.remove(), time);
}

async function showOrdersUser() {
  displayUserOptions(document.getElementById('user-info'));
  const bodyOrdersModal = document.getElementById("ordersModalBody");
  const user_session = JSON.parse(localStorage.getItem('user_session'));
  const headers = {
    'Authorization': user_session.token
  };

  try {
    const res = await axios.post(`http://localhost:3000/users/getUserWithOrderById`, {}, { headers })
    const user = res.data;
    let orders_innerHtml = ``;
    if(user.Orders.length === 0) {
      orders_innerHtml += `<span>You have no orders yet.</span>`
    }
    else {
      for (const order of user.Orders) {
        const total_price = order.Products.map((product => product.price*product.Order_detail.amount)).reduce((a,b) => a+b)
        orders_innerHtml += 
        `
        <div class="order">
          <div class="order-header">
            <span><b>Date:</b> ${order.date.substring(0, 10)}</span> 
            <span><b>Total cost of the order:</b> ${total_price.toFixed(2)}$</span>
            <span>${order.Products.length} ${order.Products.length > 1 ? "articles" : "article"}</span>
          </div>
        `;
        for (const product of order.Products) {
          orders_innerHtml += 
          `
            <div class="order-product">
              <div class="order-product-image"><img class="order-product-img" src="../product_images/${product.img_product}"></div>
              <div class="order-product-name">${product.name}</div>
              <div class="order-product-price">${product.price}$</div>
              <div class="order-product-amount">${product.Order_detail.amount} ${product.Order_detail.amount > 1 ? "units" : "unit"}</div>
            </div>
          `
        }
        orders_innerHtml += 
        `
        </div>
        `;
      }
    }
    
    bodyOrdersModal.innerHTML = orders_innerHtml;
    let myModal = new bootstrap.Modal(document.getElementById("ordersModal"), {});
    myModal.show();
  } catch(error) {
    console.error(error);
  }
}

function showWriteReview(product_id) {
  stars_review = 1;
  const div = document.getElementById('write-review');
  div.innerHTML = 
  `
    <form class="form-writeReview" onsubmit="sendReview()">
      <div>
        <div class="rating-review">
          <b>Rating:</b>
          <div id="review-stars">
            <span onclick="setRating(1)" class="fa fa-star checked"></span>
            <span onclick="setRating(2)" class="fa fa-star"></span>
            <span onclick="setRating(3)" class="fa fa-star"></span>
            <span onclick="setRating(4)" class="fa fa-star"></span>
            <span onclick="setRating(5)" class="fa fa-star"></span>
          </div>
        </div>
      </div>
      <textarea id="textarea-review" class="form-control textarea-review" rows="3" placeholder="Write your review here..."></textarea>
      <div class="buttons-review">
        <button class="btn btn-secondary" onclick="closeReview()">Close</button>
        <button class="btn btn-primary" onclick="sendReview(event, ${product_id})">Send</button>
      </div>
    <form>
  `;
}

async function sendReview(e, product_id) {
  e.preventDefault();

  const user_session = JSON.parse(localStorage.getItem('user_session'));
  const headers = {
    'Authorization': user_session.token
  };
  const body = {
    "content": document.getElementById('textarea-review').value,
    "rating": stars_review,
    "product_id": product_id
  }
  
  try {
    const res = await axios.post(`http://localhost:3000/reviews/createReview`, body, { headers });
    getProductsQuery();
    goProductDetail(product_id, false);
  } catch (error) {
    console.error(error);
  }
}

function setRating(num) {
  let active_stars = num;
  stars_review = num;
  const div_stars = document.getElementById('review-stars');

  for(let star of div_stars.children) {
    if(active_stars > 0) {
      star.className = "fa fa-star checked";
      active_stars--;
    } else {
      star.className = "fa fa-star";
    }
  }
}

function closeReview() {
  const div = document.getElementById('write-review');
  div.innerHTML = 
  `
    <button onclick="showWriteReview()" class="btn btn-primary btn-review">Write a review</button>
  `;
}

async function goProductDetail(product_id, showModal) {
  
  const product = await getProductById(product_id);
  document.getElementById('productModalTitle').innerHTML = `${product.name}`
  if(showModal) {
    modalProductDetail = new bootstrap.Modal(productModal, {});
    modalProductDetail.show();
  }

  let product_innerHTML = `
        <div class="product-info">
            <div class="product-info-img"><img src="../product_images/${product.img_product}"></div>
            <div class="product-info-description">
                <span class="detail-name">${product.name}</span>`;
  if(product.Reviews.length > 0) {
    const info_rating = getInfoRating(product);
    product_innerHTML += `
    <div>`;
    for (let i = 0; i < info_rating[0]; i++) {
      product_innerHTML += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = 0; i < 5 - info_rating[0]; i++) {
      product_innerHTML += `<span class="fa fa-star"></span>`;
    }
    product_innerHTML += `
      <span>(${info_rating[1]})</span>
    </div>`;
  }
  
  product_innerHTML += ` 
                <span class="detail-price">${product.price}$</span>
                <span class="detail-description">${product.description}</span>
                <button onclick="addProductToCart(${product.id})" class="btn btn-primary addCart">Add to the cart <img src="./assets/cart-icon.png" class="cart-img"> </button>
            </div>
        </div>
        <hr class="mt-5">
        <div class="reviews-title">Reviews</div>
        <hr>
  `;

  const user_session = JSON.parse(localStorage.getItem('user_session'));
  if(user_session) {
    product_innerHTML += 
    `
      <div class="d-flex justify-content-center">
        <div id="write-review" class="d-flex justify-content-center"><button onclick="showWriteReview(${product.id})" class="btn btn-primary btn-review">Write a review</button></div>
      </div>
    `
  }


  if(product.Reviews.length > 0) {
    product_innerHTML += `
    <div class="reviews-container">`;
    for (const review of product.Reviews) {
      product_innerHTML += 
      `
        <div class="review">
          <div class="review-header">
            <span class="review-author">${review.User.name}</span>
            <div class="review-header-separator">-</div>
            <div class="review-stars">
      `;
      for (let i = 0; i < Math.round(review.rating); i++) {
        product_innerHTML += `<span class="fa fa-star checked"></span>`;
      }
      for (let i = 0; i < 5 - Math.round(review.rating); i++) {
        product_innerHTML += `<span class="fa fa-star"></span>`;
      }
      product_innerHTML += 
      `     </div>
          </div> 
          <div class="review-content">${review.content}</div>
        </div>   
      `
    }
    product_innerHTML += `
    </div>
    `;
  } else {
    product_innerHTML += `
      <div class="reviews-none">There are no reviews for this product yet.</div>
    `;
  }

  document.getElementById('productModalBody').innerHTML = product_innerHTML;
}

async function getCategories() {
  try {
    const res = await axios.get(`http://localhost:3000/categories/getCategories`);
    categories = res.data;
    printCategories(categories);
  } catch (error) {
    console.error(error);
  }
}

function getCartTotalPrice() {
  return cart.map(item => item.amount*item.product.price).reduce((a, b) => a + b);
}

function getCartNumItems() {
  return cart.length > 0 ? cart.map(item => item.amount).reduce((a, b) => a + b) : 0;
}

async function addProductToCart(product_id) {
  const product = await getProductById(product_id);
  let found = false;
  cart.forEach(item => {
    if(product.id === item.product.id) {
      item.amount++;
      found = true;
    }
  });
  if(!found) {
    cart.push({product, amount: 1});
  }
  document.getElementById('num-products').innerHTML = `${getCartNumItems()}`;
  modalProductDetail.hide();
}

function printCategories(categories) {
  sidebarFilters.innerHTML = `<span class="header-sidebar">Categories</span>`;
  const ul = document.createElement("ul");
  ul.className = "categories-list";
  ul.innerHTML = `<li onclick="switchCategory(0)" class="category-active">All categories</li>`

  for (const category of categories) {
    ul.innerHTML += `<li onclick="switchCategory(${category.id})">${category.name}</li>`;
  }
  sidebarFilters.appendChild(ul);
  printPriceFilter();
}

function printPriceFilter() {
  sidebarFilters.innerHTML += `
    <span class="header-sidebar">Price</span>
    <div class="inputs-price">
      <div class="price-limit">
        <label  class="price-label"> Min: </label> 
        <input  class="form-control price-input" 
                onfocus="eraseCurrency(this)"
                onblur="addCurrency(this)"
                onkeypress="validateInput(event)"
                onchange="validateMinPrice(event, this)"
                value="1$"> 
      </div>
      <div class="price-limit">
        <label  class="price-label"> Max: </label> 
        <input  class="form-control price-input" 
                onfocus="eraseCurrency(this)"
                onblur="addCurrency(this)"
                onkeypress="validateInput(event)"
                onchange="validateMaxPrice(event, this)"
                value="9999$">
      </div>
      <div class="price-order">
        <label class="label-order">Order:</label>
        <select class="form-select order-select" onchange="changeOrder(this)">
          <option value="">None</option>
          <option value="ASC">Lower to higher</option>
          <option value="DESC">Higher to lower</option>
        </select>
      </div>
    </div>
  `;
}

function changeOrder(select) {
  priceOrder = select.value;
  getProductsQuery();
}

function validateMinPrice(e, input) {
  e.preventDefault();
  if(input.value === "" || parseInt(input.value) < 0)
    input.value = "1";
  if(parseInt(input.value) > parseInt(max_price))
    input.value = max_price
  min_price = input.value;
  getProductsQuery();
}

function validateMaxPrice(e, input) {
  e.preventDefault();
  if(input.value === "" || parseInt(input.value) > 9999)
    input.value = "9999";
  if(parseInt(input.value) < parseInt(min_price))
    input.value = min_price
  max_price = input.value;
  getProductsQuery();
}


function validateInput(event) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}

function eraseCurrency(input) {
  input.value = input.value.slice(0, -1);
}

function addCurrency(input) {
  input.value = input.value + '$'
}

function printProducts(products) {
    productsContainer.innerHTML = "";

    if(products.length === 0) {
        productsContainer.innerHTML = "No product...";
    } else {
        for (const product of products) {
          let card_innerHtml = `
          <div class="card" onclick="goProductDetail( ${product.id}, true)">
            <div class="product-img"><img class="card-img" src="../product_images/${product.img_product}"></div>
            <div class="product-name">${product.name}</div>`;
          if(product.Reviews.length > 0) {
            const info_rating = getInfoRating(product);
            card_innerHtml += `
            <div>`;
            for (let i = 0; i < info_rating[0]; i++) {
              card_innerHtml += `<span class="fa fa-star checked"></span>`;
            }
            for (let i = 0; i < 5 - info_rating[0]; i++) {
              card_innerHtml += `<span class="fa fa-star"></span>`;
            }
            card_innerHtml += `
              <span>(${info_rating[1]})</span>
            </div>`;
          }
          card_innerHtml += `
            <div class="product-price">${product.price}$</div>
          </div>`;
          productsContainer.innerHTML += card_innerHtml;
        }
  }

}

function getInfoRating(product) {
  const number_reviews = product.Reviews.length;
  const sum_rating = product.Reviews.map((review) => review.rating).reduce((a, b) => a + b);
  const average_rating = sum_rating/number_reviews;

  return [Math.round(average_rating), number_reviews]
}

function debounce(callback, wait) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

inputSearch.addEventListener('keyup', getProductsQuery)