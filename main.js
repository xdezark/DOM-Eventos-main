const prendas = [];
const carrito = [];

const catalogo = document.querySelector("#catalogo");
const carritoDiv= document.querySelector('.carrito');

class Prenda {
    constructor(id, tipo, color, talle, precio, url) {
        this.id = id;
        this.tipo = tipo;
        this.color = color;
        this.talle = talle;
        this.precio = parseFloat(precio);
        this.url = url;
    }
    sumarIva() {
        return this.precio *= 1.21;
    }
}

function cargarPrendas() {
    prendas.push(new Prenda(1, "Buzo", "Negro", "L", 4200, "https://http2.mlstatic.com/D_NQ_NP_979127-MLA45406881553_032021-O.webp"));
    prendas.push(new Prenda(2, "Pantalon", "Negro", 38, 3500, "https://www.tradeinn.com/f/13809/138097991/only---sons-pantalones-leo-linen-mix-gw-3002.jpg"));
    prendas.push(new Prenda(3, "Remera", "Gris", "S", 3000, "https://royalpadel.com.ar/web2/wp-content/uploads/2019/10/REMERA-MADRID-1.jpg"));
    prendas.push(new Prenda(4, "Campera", "Azul", "M", 13000, "https://www.tiendalibero.com.ar/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/a/_/a_63_6.jpg"))
    prendas.push(new Prenda(5, "Conjunto", "Negro", 38, 11500, "https://images-na.ssl-images-amazon.com/images/I/61hHRlvzgPL._AC_UX522_.jpg"));
}

cargarPrendas();

console.log(prendas);

function crearCards() {
    for (const prendita of prendas) {
        prendita.sumarIva()
        let div = document.createElement('div')
        div.className = "carta"
        div.innerHTML = `<section id="container" class="containercards">
                           <h3>${prendita.tipo}</h3>
                           <p>${prendita.color}</p>
                           <p>${prendita.talle}</p>
                           <p>$${prendita.precio}</p>
                           <img class="cartaimg" src="${prendita.url}" alt="">
                           <button class="btnCarrito" id="btn-agregar${prendita.id}" >Comprar</button>
                         </section>
                         `  
        catalogo.append(div)
    }
    agregarFuncionAlBoton();
}

function agregarFuncionAlBoton(){
    prendas.forEach(prendas => {
       document.querySelector(`#btn-agregar${prendas.id}`).addEventListener("click",()=>{
        agregarAlCarrito(prendas)
       })
    });
}

function agregarAlCarrito(prendas){ 
   /* console.log(prendas.id); */
   let existe =carrito.some(pre=>pre.id === prendas.id);
   if(existe===false){
    prendas.cantidad = 1;
    carrito.push(prendas);
   }
   else{
     let prendaFind = carrito.find(pre=>pre.id === prendas.id)
     prendaFind.cantidad++;
   }
   console.log(carrito);
   renderizarCarrito();
}

function renderizarCarrito(){
     carrito.forEach(pren =>{
        carritoDiv.innerHTML += `<div id="containerCarrito" class="carrito">
                           <h3>${pren.tipo}</h3>
                           <p>${pren.color}</p>
                           <p>${pren.talle}</p>
                           <h3>CANTIDAD: ${pren.cantidad}</h3>
                           <p>$${pren.precio}</p>
                           <img class="cartaimg" src="${pren.url}" alt="">
                           <button class="btnCarrito" id="btn-borrar${pren.id}" >Borrar</button>
                         </div>
                         `  
     })
}

crearCards();




