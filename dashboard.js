document.addEventListener("DOMContentLoaded", () => {
  // Dashboard Navigation
  const navLinks = document.querySelectorAll(".sidebar-nav a")
  const dashboardSections = document.querySelectorAll(".dashboard-section")

  if (navLinks.length > 0 && dashboardSections.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        // Get target section
        const targetSection = this.getAttribute("data-section")

        // Remove active class from all links and sections
        navLinks.forEach((link) => {
          link.parentElement.classList.remove("active")
        })

        dashboardSections.forEach((section) => {
          section.classList.remove("active")
        })

        // Add active class to clicked link and target section
        this.parentElement.classList.add("active")
        document.getElementById(targetSection).classList.add("active")
      })
    })
  }

  // Card Actions
  const cardActions = document.querySelectorAll(".card-action")

  if (cardActions.length > 0) {
    cardActions.forEach((action) => {
      action.addEventListener("click", function (e) {
        e.preventDefault()

        // Get target section
        const targetSection = this.getAttribute("data-section")

        // Remove active class from all links and sections
        navLinks.forEach((link) => {
          link.parentElement.classList.remove("active")
        })

        dashboardSections.forEach((section) => {
          section.classList.remove("active")
        })

        // Add active class to corresponding nav link and target section
        document.querySelector(`.sidebar-nav a[data-section="${targetSection}"]`).parentElement.classList.add("active")
        document.getElementById(targetSection).classList.add("active")
      })
    })
  }

  // Mobile Sidebar Toggle
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebarClose = document.getElementById("sidebar-close")
  const sidebar = document.querySelector(".dashboard-sidebar")

  if (sidebarToggle && sidebarClose && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.add("active")
    })

    sidebarClose.addEventListener("click", () => {
      sidebar.classList.remove("active")
    })
  }

  // User Dropdown
  const userDropdown = document.querySelector(".user-dropdown")

  if (userDropdown) {
    userDropdown.addEventListener("click", () => {
      // Toggle dropdown menu (to be implemented)
      console.log("User dropdown clicked")
    })
  }

  // Notification Bell
  const notificationBell = document.querySelector(".notification-bell")

  if (notificationBell) {
    notificationBell.addEventListener("click", () => {
      // Toggle notifications panel (to be implemented)
      console.log("Notification bell clicked")
    })
  }

  // Simulate Resource Usage Updates
  function updateResourceUsage() {
    const cpuBar = document.querySelector(".resource-item:nth-child(1) .progress-bar")
    const ramBar = document.querySelector(".resource-item:nth-child(2) .progress-bar")
    const storageBar = document.querySelector(".resource-item:nth-child(3) .progress-bar")
    const bandwidthBar = document.querySelector(".resource-item:nth-child(4) .progress-bar")

    if (cpuBar && ramBar && storageBar && bandwidthBar) {
      setInterval(() => {
        cpuBar.style.width = `${Math.floor(Math.random() * 100)}%`
        ramBar.style.width = `${Math.floor(Math.random() * 100)}%`
        storageBar.style.width = `${Math.floor(Math.random() * 100)}%`
        bandwidthBar.style.width = `${Math.floor(Math.random() * 100)}%`
      }, 5000)
    }
  }

  updateResourceUsage()

  // Simulate Service Status Updates
  function updateServiceStatus() {
    const serviceItems = document.querySelectorAll(".service-item")

    if (serviceItems.length > 0) {
      setInterval(() => {
        serviceItems.forEach((item) => {
          const statusBadge = item.querySelector(".status-badge")
          const random = Math.random()

          if (random < 0.9) {
            statusBadge.textContent = "Activo"
            statusBadge.className = "status-badge status-active"
          } else {
            statusBadge.textContent = "Inactivo"
            statusBadge.className = "status-badge status-inactive"
          }
        })
      }, 10000)
    }
  }

  updateServiceStatus()

  // Services Filter
  const servicesFilter = document.querySelector(".services-filter select")

  if (servicesFilter) {
    servicesFilter.addEventListener("change", function () {
      const selectedValue = this.value
      const serviceCards = document.querySelectorAll(".service-card")

      serviceCards.forEach((card) => {
        if (selectedValue === "all" || card.getAttribute("data-type") === selectedValue) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  }
})

