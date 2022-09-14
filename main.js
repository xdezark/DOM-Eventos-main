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
   
   let existe =carrito.some(pren=>pren.id === prendas.id);
   if(existe===false){
    prendas.cantidad = 1;
    carrito.push(prendas);
   }
   else{
     let prendaFind = carrito.find(pren=>pren.id === prendas.id)
     prendaFind.cantidad++;
   }
   console.log(carrito);
   renderizarCarrito();
}

function renderizarCarrito(){
    carritoDiv.innerHTML="";
     carrito.forEach(pren =>{
        carritoDiv.innerHTML += `<div id="container" class="containercards">
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
     borrarProducto()
}

function borrarProducto(){
    carrito.forEach(prendas => {
        document.querySelector(`#btn-borrar${prendas.id}`).addEventListener("click",()=>{
          let indice = carrito.findIndex(e=>e.id===prendas.id)
          carrito.splice(indice,1)
          renderizarCarrito()
        })
     });
}

function total(){
    let total = document.getElementById("total")
    let resultado = carrito.reduce((acc,el)=> acc + el.precio, 0)
    total.innerText = resultado.toFixed(2)
}
total();

crearCards();






