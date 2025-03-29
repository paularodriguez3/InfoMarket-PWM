import {getImageUrl, readCollection} from "./firebase/firebase.js";

document.addEventListener("DOMContentLoaded", async () => {
    await showShoppingCart();
});

async function showShoppingCart() {
    await loadProductInfoComponent();
    const template = document.getElementById("product-info-template").content;

    const shoppingCartList = document.getElementById("shopping-cart-list");

    const shoppingCart = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalPrice = 0;
    for (const item of shoppingCart) {
        const itemComponent = document.importNode(template, true);

        itemComponent.querySelector("#image").src = await getImageUrl(item.data.Imagen);
        itemComponent.querySelector("#product-name-component").textContent = item.data.Nombre;
        itemComponent.querySelector("#product-desc-component").textContent = item.data.Descripcion;
        itemComponent.querySelector("#product-quantity-component").textContent = "Qty: " + item.Cantidad;
        let price= parseFloat(item.data.Precio) * parseFloat(item.Cantidad);
        itemComponent.querySelector("#product-price-component").textContent = Math.round(price * 100)/100 + "€";
        totalPrice += price;

        const plus = itemComponent.getElementById("button-plus");
        plus.addEventListener("click", () => {
            addToCart(item, 1);
            window.location.reload();
            showShoppingCart();
        });

        const minus = itemComponent.getElementById("button-minus");
        minus.addEventListener("click", () => {
            removeFromCart(item, 1);
            window.location.reload();
            showShoppingCart();
        });

        plus.classList.remove("hidden-button");
        minus.classList.remove("hidden-button");

        shoppingCartList.appendChild(itemComponent);
    }
    document.getElementById("total-price").innerText = Math.round(totalPrice*100)/100 + "€";
    console.log(shoppingCart);
}

export function addToCart(item, quantity) {
    const shoppingCart = JSON.parse(localStorage.getItem("carrito")) || [];
    const cartItem = shoppingCart.find(e => e.id === item.id);
    if (!cartItem) {
        item.Cantidad = quantity;
        shoppingCart.push(item);
    } else {
        cartItem.Cantidad += quantity;
    }
    localStorage.setItem("carrito", JSON.stringify(shoppingCart));
}

function removeFromCart(item) {
    const shoppingCart = JSON.parse(localStorage.getItem("carrito")) || [];
    const cartItem = shoppingCart.find(e => e.id === item.id);
    if (!cartItem) {
        console.log("Objeto no encontrado.");
        return;
    }
    cartItem.Cantidad--;
    if (cartItem.Cantidad === 0) {
        shoppingCart.splice(shoppingCart.indexOf(cartItem), 1);
    }
    localStorage.setItem("carrito", JSON.stringify(shoppingCart));
}

async function loadProductInfoComponent() {
    const productInfoComponent = await fetch("../../templates/shopping-info-component/product-info-component.html");
    const text = await productInfoComponent.text();
    const productInfoDiv = document.createElement("div");
    productInfoDiv.innerHTML = text;
    document.body.appendChild(productInfoDiv);
}