// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Active navigation link
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Contact form handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const name = this.querySelector('input[type="text"]').value
    const email = this.querySelector('input[type="email"]').value
    const subject = this.querySelectorAll('input[type="text"]')[1].value
    const message = this.querySelector("textarea").value

    // Simple validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error")
      return
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    setTimeout(() => {
      showNotification("Message sent successfully! I'll get back to you soon.", "success")
      this.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroSubtitle = document.querySelector(".hero-subtitle")
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent
    setTimeout(() => {
      typeWriter(heroSubtitle, originalText, 80)
    }, 1000)
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Initialize counter animation when stats come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statItems = entry.target.querySelectorAll(".stat-item h4")
      statItems.forEach((item) => {
        const target = item.textContent.includes(".")
          ? Number.parseFloat(item.textContent)
          : Number.parseInt(item.textContent.replace("+", ""))

        if (!isNaN(target)) {
          animateCounter(item, target)
        }
      })
      statsObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

const aboutStats = document.querySelector(".about-stats")
if (aboutStats) {
  statsObserver.observe(aboutStats)
}

// Add loading animation to elements
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".project-card, .skill-category, .timeline-item")
  elements.forEach((el, index) => {
    el.classList.add("loading")
    setTimeout(() => {
      el.classList.add("loaded")
    }, index * 100)
  })
})

// Mobile menu close on link click
const navbarToggler = document.querySelector(".navbar-toggler")
const navbarCollapse = document.querySelector(".navbar-collapse")

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarCollapse.classList.contains("show")) {
      navbarToggler.click()
    }
  })
})

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Floating animation for hero cards
function floatingAnimation() {
  const cards = document.querySelectorAll(".floating-card")
  cards.forEach((card, index) => {
    const delay = index * 1000
    const duration = 4000 + index * 500

    setInterval(() => {
      card.style.transform = `translateY(${Math.sin(Date.now() / duration) * 10}px)`
    }, 50)
  })
}

// Initialize floating animation
setTimeout(floatingAnimation, 2000)

// Scroll to top functionality
const scrollToTopBtn = document.createElement("button")
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollToTopBtn.className = "scroll-to-top"
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`

document.body.appendChild(scrollToTopBtn)

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = "1"
    scrollToTopBtn.style.visibility = "visible"
  } else {
    scrollToTopBtn.style.opacity = "0"
    scrollToTopBtn.style.visibility = "hidden"
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener("mouseenter", function () {
  this.style.transform = "translateY(-3px) scale(1.1)"
})

scrollToTopBtn.addEventListener("mouseleave", function () {
  this.style.transform = "translateY(0) scale(1)"
})

// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

// Add dynamic year to footer
const currentYear = new Date().getFullYear()
const footerText = document.querySelector(".footer-text")
if (footerText) {
  footerText.innerHTML = footerText.innerHTML.replace("2025", currentYear)
}

console.log("Portfolio loaded successfully! 🎉")

// Initialize AOS (Animate On Scroll) - simplified version
document.addEventListener("DOMContentLoaded", () => {
  // Simple fade-in animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Add animation to elements
  const animatedElements = document.querySelectorAll(
    ".hero-content, .hero-image, .project-card, .skill-category, .timeline-item",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
    observer.observe(el)
  })

  // Show hero content immediately
  const heroContent = document.querySelector(".hero-content")
  const heroImage = document.querySelector(".hero-image")
  if (heroContent) {
    heroContent.style.opacity = "1"
    heroContent.style.transform = "translateY(0)"
  }
  if (heroImage) {
    heroImage.style.opacity = "1"
    heroImage.style.transform = "translateY(0)"
  }
})

// Enhanced mobile responsiveness
function handleMobileLayout() {
  const isMobile = window.innerWidth <= 768
  const floatingCards = document.querySelectorAll(".floating-card")

  if (isMobile) {
    // On mobile, show cards in a row below the avatar
    floatingCards.forEach((card, index) => {
      card.style.position = "relative"
      card.style.display = "inline-block"
      card.style.margin = "5px"
      card.style.animation = "none"
      card.style.transform = "none"
    })
  } else {
    // On desktop, restore floating animation
    floatingCards.forEach((card, index) => {
      card.style.position = "absolute"
      card.style.animation = "float 4s ease-in-out infinite"
    })
  }
}

// Call on load and resize
window.addEventListener("load", handleMobileLayout)
window.addEventListener("resize", handleMobileLayout)

// Improved mobile menu handling
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")
  const navLinks = document.querySelectorAll(".nav-link")

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navbarCollapse.classList.contains("show")) {
        navbarToggler.click()
      }
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      !navbarCollapse.contains(e.target) &&
      !navbarToggler.contains(e.target) &&
      navbarCollapse.classList.contains("show")
    ) {
      navbarToggler.click()
    }
  })
})

// Touch-friendly hover effects for mobile
if ("ontouchstart" in window) {
  const cards = document.querySelectorAll(".project-card, .skill-category, .certificate-card")
  cards.forEach((card) => {
    card.addEventListener("touchstart", function () {
      this.style.transform = "translateY(-5px) scale(1.02)"
    })

    card.addEventListener("touchend", function () {
      setTimeout(() => {
        this.style.transform = "translateY(0) scale(1)"
      }, 150)
    })
  })
}
