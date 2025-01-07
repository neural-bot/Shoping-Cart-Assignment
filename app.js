const product = [
    {
        id: 0,
        image: "./assets/img/Galaxy-A16-4G-Water-Green-2822.jpg",
        title: "Samsung Galaxy A16",
        price: 19200,
    },
    {
        id: 1,
        image: "./assets/img/Galaxy-F05-Blue-4331.jpg",
        title: "Samsung Galaxy F05",
        price: 11000,
    },
    {
        id: 2,
        image: "./assets/img/Motorola-Edge-50-Fusion-Hot-Pink-3782.jpg",
        title: "Motorola Edge 50 Fusion",
        price: 32200,
    },
    {
        id: 3,
        image: "./assets/img/Redmi-Note-13-Pro-Plus-Purple-2974.jpg",
        title: "Redmi Note 13 Pro Plus 5G",
        price: 32300,
    }
];

let i = 0;
document.getElementById("root").innerHTML = product.map((item) => {
    return `
        <div class='box'>
            <div class='img-box'>
                <img class='images' src='${item.image}' alt='${item.title}'>
            </div>
            <div class='bottom'>
                <p>${item.title}</p>
                <h2>${item.price} Tk</h2>
                <button onclick='addtocart(${i++})'>Add to Cart</button>
            </div>
        </div>
    `;
}).join('');

var cart = [];

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        displaycart();
    }
}

function addtocart(a) {
    cart.push({ ...product[a] });
    saveCartToLocalStorage();
    displaycart();
}

function displaycart() {
    let j = 0, total = 0;
    if (cart.length === 0) {
        document.getElementById("cartItem").innerHTML = "Your cart is Empty";
        document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((items) => {
            const { image, title, price } = items;
            total += price;
            document.getElementById("total").innerHTML = "$ " + total + ".00";
            return `
                <div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowing' src='${image}' alt='${title}'>
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <h2 style='font-size:12px;'>${price} Tk</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
                </div>`;
        }).join("");
    }
    document.getElementById("count").innerText = cart.length;
}

function delElement(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    displaycart();
}

window.onload = loadCartFromLocalStorage;


function continueToPurchase() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before proceeding to purchase.");
    } else {
        alert("Proceeding to purchase...");
    }
}