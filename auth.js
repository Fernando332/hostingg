document.addEventListener("DOMContentLoaded", () => {
  // Toggle Password Visibility
  const togglePasswordButtons = document.querySelectorAll(".toggle-password")

  if (togglePasswordButtons.length > 0) {
    togglePasswordButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling
        const icon = this.querySelector("i")

        if (passwordInput.type === "password") {
          passwordInput.type = "text"
          icon.classList.remove("fa-eye")
          icon.classList.add("fa-eye-slash")
        } else {
          passwordInput.type = "password"
          icon.classList.remove("fa-eye-slash")
          icon.classList.add("fa-eye")
        }
      })
    })
  }

  // Registration Form Validation
  const registrationForm = document.getElementById("registro-form")

  if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const nombre = document.getElementById("nombre").value.trim()
      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const terms = document.getElementById("terms").checked

      // Simple validation
      if (nombre === "") {
        showError("Por favor, ingresa tu nombre completo.")
        return
      }

      if (email === "") {
        showError("Por favor, ingresa tu correo electrónico.")
        return
      }

      if (!isValidEmail(email)) {
        showError("Por favor, ingresa un correo electrónico válido.")
        return
      }

      if (password === "") {
        showError("Por favor, ingresa una contraseña.")
        return
      }

      if (password.length < 8) {
        showError("La contraseña debe tener al menos 8 caracteres.")
        return
      }

      if (password !== confirmPassword) {
        showError("Las contraseñas no coinciden.")
        return
      }

      if (!terms) {
        showError("Debes aceptar los términos y condiciones.")
        return
      }

      // If all validations pass, simulate registration
      showSuccess("¡Registro exitoso! Redirigiendo al panel de usuario...")

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = "panel.html"
      }, 2000)
    })
  }

  // Login Form Validation
  const loginForm = document.getElementById("login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("login-email").value.trim()
      const password = document.getElementById("login-password").value

      // Simple validation
      if (email === "") {
        showError("Por favor, ingresa tu correo electrónico.")
        return
      }

      if (!isValidEmail(email)) {
        showError("Por favor, ingresa un correo electrónico válido.")
        return
      }

      if (password === "") {
        showError("Por favor, ingresa tu contraseña.")
        return
      }

      // If all validations pass, simulate login
      showSuccess("¡Inicio de sesión exitoso! Redirigiendo al panel de usuario...")

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = "panel.html"
      }, 2000)
    })
  }

  // Helper Functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function showError(message) {
    // Create error message element
    const errorDiv = document.createElement("div")
    errorDiv.className = "alert alert-error"
    errorDiv.textContent = message

    // Add to page
    const form = document.querySelector(".auth-form")
    form.parentNode.insertBefore(errorDiv, form)

    // Remove after 3 seconds
    setTimeout(() => {
      errorDiv.remove()
    }, 3000)
  }

  function showSuccess(message) {
    // Create success message element
    const successDiv = document.createElement("div")
    successDiv.className = "alert alert-success"
    successDiv.textContent = message

    // Add to page
    const form = document.querySelector(".auth-form")
    form.parentNode.insertBefore(successDiv, form)
  }
})

