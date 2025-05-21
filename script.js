  
  
  const API_URL = "https://fakestoreapi.com";
    let products = [];
    let carrito = [];


    document.addEventListener('DOMContentLoaded', () => {
      fetchProducts();
    });

    async function fetchProducts() {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
          console.error("Error al cargar los productos");
          return;
        }

        products = await response.json();
        const productsContainer = document.getElementById("productsContainer");
        productsContainer.innerHTML = "";

        products.forEach(product => {
          const productCard = document.createElement("div");
          productCard.className = "product-card";
          productCard.innerHTML = `
            <div class="product-image">
              <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
              <h3 class="product-title" title="${product.title}">${product.title}</h3>
              <p class="product-category">${product.category}</p>
              <div class="product-price">$${product.price}</div>
              <div class="product-description">${product.description}</div>
              <button class="btnVerMas" onclick="verDetalles(${product.id})">Ver más</button>
              <button class="btnAgregar" onclick="agregarAlCarrito(${product.id})">Añadir al carrito</button>
            </div>
          `;

          productsContainer.appendChild(productCard);
        });

      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    function verDetalles(id) {
      const producto = products.find(p => p.id === id);
      const modal = document.getElementById("modal");
      const modalContent = document.getElementById("modalContent");

      modalContent.innerHTML = `
        <span class="close-modal" onclick="cerrarModal()">×</span>
        <h2>${producto.title}</h2>
        <img src="${producto.image}" alt="${producto.title}">
        <p><strong>Categoría:</strong> ${producto.category}</p>
        <p><strong>Precio:</strong> $${producto.price}</p>
        <p>${producto.description}</p>
        <button class="btnAgregar" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>

      `;

      modal.style.display = "flex";
    }

    function cerrarModal() {
      document.getElementById("modal").style.display = "none";
    }

   
    window.onclick = function(event) {
      const modal = document.getElementById("modal");
      if (event.target === modal) {
        cerrarModal();
      }
    }
    function agregarAlCarrito(id) {
  const producto = products.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  alert(`"${producto.title}" añadido al carrito.`);
  actualizarContadorCarrito();
  cerrarModal();
}
function verCarrito() {
  const lista = document.getElementById("listaCarrito");
  const total = document.getElementById("totalCarrito");
  const modal = document.getElementById("modalCarrito");

  lista.innerHTML = "";

  let totalPrecio = 0;

  if (carrito.length === 0) {
    lista.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    carrito.forEach(producto => {
      totalPrecio += producto.price * producto.cantidad;

      lista.innerHTML += `
        <div style="border-bottom:1px solid #ccc; padding:10px;">
          <strong>${producto.title}</strong><br>
          Cantidad: ${producto.cantidad}<br>
          Precio unitario: $${producto.price}<br>
          Subtotal: $${(producto.price * producto.cantidad).toFixed(2)}<br>
          <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        </div>
      `;
    });
  }

  total.textContent = totalPrecio.toFixed(2);
  modal.style.display = "flex";
}

function cerrarCarrito() {
  document.getElementById("modalCarrito").style.display = "none";
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  verCarrito();
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  document.getElementById("contadorCarrito").textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

