import { auth } from "./auth.js"
import { cart } from "./cart.js"

class UI {
  static displayHeader() {
    const header = document.getElementById("main-header")
    header.innerHTML = `
            <nav class="container">
                <a href="index.html" class="logo">HostPro</a>
                <ul id="nav-menu">
                    <li><a href="productos.html">Productos</a></li>
                    <li><a href="soporte.html">Soporte</a></li>
                    ${
                      auth.isLoggedIn()
                        ? `<li><a href="panel-usuario.html">${auth.user.name}</a></li>
                           <li><a href="#" id="logout-btn">Cerrar Sesión</a></li>`
                        : `<li><a href="login.html">Iniciar Sesión</a></li>
                           <li><a href="registro.html">Crear Cuenta</a></li>`
                    }
                </ul>
                <button id="cart-btn" class="btn btn-outline">Carrito (${cart.items.length})</button>
                <button id="menu-toggle" class="btn btn-outline">Menu</button>
            </nav>
        `

    document.getElementById("logout-btn")?.addEventListener("click", (e) => {
      e.preventDefault()
      auth.logout()
      window.location.href = "index.html"
    })

    document.getElementById("cart-btn").addEventListener("click", () => {
      UI.toggleCartDrawer()
    })

    document.getElementById("menu-toggle").addEventListener("click", () => {
      document.getElementById("nav-menu").classList.toggle("open")
    })
  }

  static displayFooter() {
    const footer = document.getElementById("main-footer")
    footer.innerHTML = `
            <div class="container">
                <p>&copy; 2024 HostPro. Todos los derechos reservados.</p>
            </div>
        `
  }

  static displayCartDrawer() {
    const drawer = document.getElementById("cart-drawer")
    drawer.innerHTML = `
            <h2>Tu Carrito</h2>
            <ul>
                ${cart.items
                  .map(
                    (item) => `
                    <li>
                        ${item.name} - $${item.price} x ${item.quantity}
                        <button class="remove-item" data-id="${item.id}">Eliminar</button>
                    </li>
                `,
                  )
                  .join("")}
            </ul>
            <p class="total">Total: $${cart.getTotal().toFixed(2)}</p>
            <a href="checkout.html" class="btn">Proceder al Pago</a>
        `

    drawer.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id")
        cart.removeItem(id)
        UI.displayCartDrawer()
        UI.displayHeader()
      })
    })
  }

  static toggleCartDrawer() {
    const drawer = document.getElementById("cart-drawer")
    drawer.classList.toggle("open")
    if (drawer.classList.contains("open")) {
      UI.displayCartDrawer()
    }
  }

  static showMessage(message, type = "info") {
    const messageDiv = document.createElement("div")
    messageDiv.textContent = message
    messageDiv.className = `message ${type}`
    document.body.appendChild(messageDiv)
    setTimeout(() => {
      messageDiv.remove()
    }, 3000)
  }
}

