// Products Data

const products = [
{
    id: 1,
    name: "Laptop",
    price: 45000,
    oldPrice: 50000,
    rating: 4.8,
    category: "Electronics",
    image: "images/laptop.png"
},
{
    id: 2,
    name: "Smartphone",
    price: 18000,
    oldPrice: 20000,
    rating: 4.7,
    category: "Electronics",
    image: "images/smartphone.png"
},
{
    id: 3,
    name: "Smart Watch",
    price: 4500,
    oldPrice: 5000,
    rating: 4.6,
    category: "Watches",
    image: "images/smartwatch.png"
},
{
    id: 4,
    name: "Headphones",
    price: 1800,
    oldPrice: 2000,
    rating: 4.5,
    category: "Accessories",
    image: "images/headphones.png"
},
{
    id: 5,
    name: "Camera",
    price: 32000,
    oldPrice: 35000,
    rating: 4.9,
    category: "Electronics",
    image: "images/camera.png"
},
{
    id: 6,
    name: "Keyboard",
    price: 1200,
    oldPrice: 1500,
    rating: 4.4,
    category: "Accessories",
    image: "images/keyboard.png"
},
{
    id: 7,
    name: "Mouse",
    price: 700,
    oldPrice: 800,
    rating: 4.3,
    category: "Accessories",
    image: "images/mouse.png"
},
{
    id: 8,
    name: "Speaker",
    price: 2500,
    oldPrice: 3000,
    rating: 4.5,
    category: "Accessories",
    image: "images/speaker.png"
}
];


// Local Storage Cart

let cart =
JSON.parse(localStorage.getItem("cart")) || [];


// Elements

const productContainer =
document.getElementById("product-container");

const searchInput =
document.getElementById("search");

const cartCount =
document.getElementById("cart-count");

const cartItems =
document.getElementById("cart-items");

const cartTotal =
document.getElementById("cart-total");

const cartSidebar =
document.getElementById("cart-sidebar");


// Display Products

function displayProducts(productList){

    productContainer.innerHTML = "";

    productList.forEach(product => {

        productContainer.innerHTML += `

        <div class="product-card">

            <img
            src="${product.image}"
            alt="${product.name}">

            <div class="product-card-content">

                <span class="category-tag">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <p class="old-price">
                    ₹${product.oldPrice}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                class="add-cart"
                onclick="addToCart(${product.id})">

                    Add To Cart

                </button>

            </div>

        </div>

        `;

    });

}


// Add To Cart

function addToCart(id){

    const product =
    products.find(
        item => item.id === id
    );

    cart.push(product);

    updateCart();

    showToast();

}


// Remove Item

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}


// Update Cart

function updateCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    cartCount.textContent =
    cart.length;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item,index) => {

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price}
                </p>

            </div>

            <button
            onclick="removeItem(${index})">

                ❌

            </button>

        </div>

        `;

    });

    cartTotal.textContent = total;

}


// Search

searchInput.addEventListener(
"keyup",
() => {

    const value =
    searchInput.value.toLowerCase();

    const filtered =
    products.filter(product =>
    product.name
    .toLowerCase()
    .includes(value));

    displayProducts(filtered);

});


// Open Cart

document
.getElementById("cart-btn")
.addEventListener(
"click",
(e) => {

    e.preventDefault();

    cartSidebar.classList.add("active");

});


// Close Cart

document
.getElementById("close-cart")
.addEventListener(
"click",
() => {

    cartSidebar.classList.remove("active");

});


// Checkout

document
.getElementById("checkout-btn")
.addEventListener(
"click",
() => {

    if(cart.length === 0){

        alert(
        "Your cart is empty!"
        );

        return;
    }

    alert(
    "Order Placed Successfully!"
    );

    cart = [];

    updateCart();

});


// Toast

function showToast(){

    const toast =
    document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },2000);

}


// Initial Load

displayProducts(products);

updateCart();