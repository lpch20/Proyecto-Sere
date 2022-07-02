//Obtenemos datos del cliente//

let edadCliente = localStorage.getItem('Edad')
let telCliente = localStorage.getItem('Telefono')
let nameCliente = localStorage.getItem('Cliente')


//Creamos la clase para los objetos//

class Vehiculo{
    constructor(modelo, precio, anio, km, img) {
    this.modelo = modelo;
    this.precio = precio;
    this.anio = anio;
    this.km = km;
    this.img = img;
    }
}

// Llamado al fetch para transferir los objetos en JSON y asi crear el listado de vehiculos//

const cantidadDeVehiculos = []

fetch('/js/vehiculos.json')
    .then( (resp) => resp.json() )
    .then( (data) => {
        data.forEach((vehiculos) => {
            cantidadDeVehiculos.push(new Vehiculo(vehiculos.modelo, vehiculos.precio, vehiculos.anio, vehiculos.km, vehiculos.img))})

    for (const vehiculos of cantidadDeVehiculos ) {
    
        const ul = document.createElement("ul");
    
        const br = document.createElement("br")
    
        const li1 = document.createElement("h4");
        li1.innerText = vehiculos.modelo;
    
        const li2 = document.createElement("li");
        li2.innerText = 'Precio(sin Iva): U$S ' + vehiculos.precio
    
        const li3 = document.createElement('li');
        li3.innerText = 'Año: ' + vehiculos.anio;
    
        const li4 = document.createElement('li');
        li4.innerText = 'KM: ' + vehiculos.km
    
        function display_image(src, width, height, alt) {
            var a = document.createElement("img");
            a.src = src;
            a.width = width;
            a.height = height;
            a.alt = alt;
            ul.append(a);
        }
        display_image(vehiculos.img, 
                            340, 
                            180, 
                            vehiculos.modelo);
        
    
        const comprar = document.createElement("button");
        
        comprar.innerHTML = `Comprar ${vehiculos.modelo}`
    
        comprar.onclick = () => {
            if(edadCliente<18) {
                alert('No vendemos vehiculos a menores, pero puede permanecer en la pagina')
            } 
            else if(edadCliente >= 18){
                const enJSON = JSON.stringify(vehiculos)
                localStorage.setItem("Eleccion", enJSON)
                window.location.href = "/html/pago.html"
            }
        }
        ul.append(li1, li2, li3, li4, comprar, br);
        contenedor.appendChild(ul)
    }
})

console.log(cantidadDeVehiculos)


// FILTRO // NO FUNCIONA :(
const mas_precio = document.getElementById("mas_precio")
const menor_precio = document.getElementById("menor_precio")
const mas_km = document.getElementById("mas_km")
const menos_km = document.getElementById("menos_km")
const mas_nuevo = document.getElementById("mas_nuevo")
const mas_viejo = document.getElementById("mas_viejo")

const {precio} = cantidadDeVehiculos


mas_precio.addEventListener("click", cantidadDeVehiculos.sort(function(a, b) {
        if (a.precio > b.precio) {
          return 1;
        }
        if (a.precio < b.precio) {
          return -1;
        }
        return 0;
}));
/*




mas_km.onclick = () => {
    cantidadDeVehiculos.sort(function compare(a, b)  {
        if (a.km > b.km) {
            return 1;
        }
        if (a.km < b.km) {
            return -1;
        }
        return 0;
    })
}
menos_km.onclick = () => {
    cantidadDeVehiculos.sort(function(a, b) {
        return a - b;
    })
}
mas_nuevo.onclick = () => {
    cantidadDeVehiculos.sort((a, b) => {
        if (a.anio > b.anio) {
            return 1;
        }
        if (a.aniom < b.anio) {
            return -1;
        }
        return 0;
    })
}
mas_viejo.onclick = () => {
    cantidadDeVehiculos.sort((a, b) => {
        if (a.anio > b.anio) {
            return -1;
        }
        if (a.aniom < b.anio) {
            return 1;
        }
        return 0;
    })
}*/

