document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const menu = document.querySelector(".menu")

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active")
    })
  }

  // Testimonials Slider
  const testimonialsSlider = document.querySelector(".testimonials-slider")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (testimonialsSlider && prevBtn && nextBtn) {
    let slideIndex = 0
    const slides = testimonialsSlider.querySelectorAll(".testimonial")

    if (slides.length > 0) {
      prevBtn.addEventListener("click", () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length
        updateSlider()
      })

      nextBtn.addEventListener("click", () => {
        slideIndex = (slideIndex + 1) % slides.length
        updateSlider()
      })

      function updateSlider() {
        testimonialsSlider.scrollTo({
          left: slides[slideIndex].offsetLeft,
          behavior: "smooth",
        })
      }

      // Auto slide
      setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length
        updateSlider()
      }, 5000)
    }
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")

      question.addEventListener("click", () => {
        item.classList.toggle("active")
      })
    })
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (menu && menu.classList.contains("active")) {
          menu.classList.remove("active")
        }
      }
    })
  })

  // Products Tabs
  const productsTabs = document.querySelectorAll(".products-tabs li")

  if (productsTabs.length > 0) {
    productsTabs.forEach((tab) => {
      tab.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove active class from all tabs
        productsTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Get target section id
        const targetId = this.querySelector("a").getAttribute("href")

        // Scroll to target section
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 150,
            behavior: "smooth",
          })
        }
      })
    })
  }
})

