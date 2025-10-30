// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = mobileMenu.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = mobileMenu.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

window.addEventListener("scroll", () => {
  const links = document.querySelectorAll(".nav-links a");
  const icon = mobileMenu.querySelector("i");

  if (window.scrollY > 100) {
    // Скрол більше 100px — всі лінки чорні
    links.forEach((link) => (link.style.color = "var(--text-dark)"));
    icon.style.color = "var(--text-dark)";
  } else {
    // Верх сторінки
    if (window.innerWidth <= 768) {
      // Мобільна версія — лінки чорні
      links.forEach((link) => (link.style.color = "var(--text-dark)"));
    } else {
      // ПК версія — лінки білі
      links.forEach((link) => (link.style.color = "var(--white)"));
    }
    // Іконка гамбургера завжди біла на початку
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Testimonial Carousel functionality
const testimonialTrack = document.getElementById("testimonialTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("carouselDots");
const testimonials = document.querySelectorAll(".testimonial-item");

let currentSlide = 0;
const totalSlides = testimonials.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
  testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetAutoPlay();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoPlay();
});

// Auto-play with slower interval (8 seconds)
let autoPlayInterval = setInterval(nextSlide, 3000);

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, 3000);
}

// Pause on hover
const carousel = document.querySelector(".testimonial-carousel");
carousel.addEventListener("mouseenter", () => {
  clearInterval(autoPlayInterval);
});

carousel.addEventListener("mouseleave", () => {
  autoPlayInterval = setInterval(nextSlide, 3000);
});

// Form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  contactForm.reset();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Stagger animations
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

const featureItems = document.querySelectorAll(".feature-item");
featureItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
});

const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
  });
  item.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// Service locations animation
const locationItems = document.querySelectorAll(".location-item");
locationItems.forEach((item, index) => {
  item.style.opacity = "0";
  item.style.transform = "translateX(-20px)";
  item.style.transition = "all 0.5s ease";

  setTimeout(() => {
    item.style.opacity = "1";
    item.style.transform = "translateX(0)";
  }, index * 100);
});
