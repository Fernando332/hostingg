class Router {
  constructor() {
    this.routes = {}
    window.addEventListener("popstate", () => this.handleRoute())
  }

  addRoute(path, callback) {
    this.routes[path] = callback
  }

  handleRoute() {
    const path = window.location.pathname
    const callback = this.routes[path] || this.routes["/404"]
    callback()
  }

  navigate(path) {
    window.history.pushState(null, "", path)
    this.handleRoute()
  }
}

const router = new Router()

// Definir rutas
router.addRoute("/", () => {
  document.getElementById("main-content").innerHTML = `
        <h1>Bienvenido a HostPro</h1>
        <p>Tu solución de hosting confiable y rápida para todos tus proyectos web</p>
        <a href="/productos" class="btn">Ver Planes</a>
    `
})

router.addRoute("/productos", () => {
  document.getElementById("main-content").innerHTML = `
        <h1>Nuestros Servicios de Hosting</h1>
        <div class="product-grid">
            <div class="card">
                <h2>Hosting Web</h2>
                <p>Soluciones de hosting web rápidas y confiables para tu sitio.</p>
                <a href="/productos/web" class="btn">Ver Planes</a>
            </div>
            <div class="card">
                <h2>Hosting Minecraft</h2>
                <p>Servidores de Minecraft de alto rendimiento para tu comunidad.</p>
                <a href="/productos/minecraft" class="btn">Ver Planes</a>
            </div>
            <div class="card">
                <h2>Bots de Discord</h2>
                <p>Hosting para bots de Discord personalizados y eficientes.</p>
                <a href="/productos/discord" class="btn">Ver Planes</a>
            </div>
        </div>
    `
})

router.addRoute("/login", () => {
  document.getElementById("main-content").innerHTML = `
        <h1>Iniciar Sesión</h1>
        <form id="login-form">
            <input type="email" id="email" placeholder="Correo Electrónico" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            <button type="submit" class="btn">Iniciar Sesión</button>
        </form>
        <p>¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a></p>
    `

  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    try {
      await auth.login(email, password)
      UI.showMessage("Inicio de sesión exitoso")
      router.navigate("/panel-usuario")
    } catch (error) {
      UI.showMessage(error.message, "error")
    }
  })
})

router.addRoute("/registro", () => {
  document.getElementById("main-content").innerHTML = `
        <h1>Crear Cuenta</h1>
        <form id="register-form">
            <input type="text" id="name" placeholder="Nombre" required>
            <input type="email" id="email" placeholder="Correo Electrónico" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            <input type="password" id="confirm-password" placeholder="Confirmar Contraseña" required>
            <button type="submit" class="btn">Crear Cuenta</button>
        </form>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
    `

  document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm-password").value

    if (password !== confirmPassword) {
      UI.showMessage("Las contraseñas no coinciden", "error")
      return
    }

    try {
      await auth.register(name, email, password)
      UI.showMessage("Registro exitoso")
      router.navigate("/panel-usuario")
    } catch (error) {
      UI.showMessage(error.message, "error")
    }
  })
})

router.addRoute("/panel-usuario", () => {
  if (!auth.isLoggedIn()) {
    router.navigate("/login")
    return
  }

  document.getElementById("main-content").innerHTML = `
        <h1>Panel de Usuario</h1>
        <div class="card">
            <h2>Información del Perfil</h2>
            <p>Nombre: ${auth.user.name}</p>
            <p>Email: ${auth.user.email}</p>
        </div>
        <div class="card">
            <h2>Mis Servicios</h2>
            <ul>
                <li>Hosting Web: Activo</li>
                <li>Servidor Minecraft: Inactivo</li>
                <li>Bot de Discord: Activo</li>
            </ul>
        </div>
    `
})

router.addRoute("/404", () => {
  document.getElementById("main-content").innerHTML = `
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <a href="/" class="btn">Volver al inicio</a>
    `
})

```javascript file="js/main.js"
document.addEventListener('DOMContentLoaded', () => {
    UI.displayHeader();
    UI.displayFooter();
    router.handleRoute();

    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            router.navigate(e.target.getAttribute('href'));
        }
    });
});

