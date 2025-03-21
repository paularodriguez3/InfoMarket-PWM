import {createDocOnCollection, readCollection, readDoc, filterEqualsByFieldOnCollection, deleteDocOnCollection, updateDocOnCollection } from "../scripts/firebase/firebase.js";

async function cargarComponenteProducto() {
    const response = await fetch("../templates/product-component/product-component.html");
    const text = await response.text();

    const contenedor = document.createElement("div");
    contenedor.innerHTML = text;

    document.body.appendChild(contenedor);
}

export async function obtenerProductos(categoria) {
    await cargarComponenteProducto();
    const productosGrid = document.getElementById("product-grid");
    const template = document.getElementById("product-template").content;

    const productos = await readCollection(categoria);

    Object.entries(productos).forEach( async ([id, productoData]) => {

        const productoElemento = document.importNode(template, true);
        //const urlImagen = await obtenerURLImagen(productoData.Imagen);

        //console.log(productoData.Imagen);


        //productoElemento.querySelector("#image").src = urlImagen;
        productoElemento.querySelector("#product-name").textContent = productoData.Nombre;
       // productoElemento.querySelector("#product-desc").textContent = productoData.Desc;
        productoElemento.querySelector("#price").textContent = productoData.Precio;

        productosGrid.appendChild(productoElemento);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await obtenerProductos("productos/Informática/Ordenadores");
});