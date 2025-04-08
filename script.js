
// Main JavaScript code for the portfolio website

// Wait for the DOM content to load before executing
document.addEventListener('DOMContentLoaded', function() {
  // Initialize typing effect
  initTypingEffect();
  
  // Initialize theme toggler
  initThemeToggle();
  
  // Initialize mobile navigation
  initMobileNav();
  
  // Initialize scroll effects
  initScrollEffects();
  
  // Initialize contact form
  initContactForm();
});

// Function to initialize typing effect
function initTypingEffect() {
  const options = {
      strings: ['Web Developer', 'Programmer','Tech Enthusaist'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
  };
  
  if(document.querySelector('.typing')) {
      new Typed('.typing', options);
  }
}

// Function to initialize theme toggle
// function initThemeToggle() {
//     const toggleBtn = document.getElementById("theme-toggle-btn");
//     const body = document.body;
  
//     // Load saved theme or default to dark
//     const savedTheme = localStorage.getItem("theme") || "dark";
//     body.classList.add(savedTheme === "dark" ? "dark-mode" : "light-mode");
  
//     // Set initial toggle icon
//     if (toggleBtn) {
//       toggleBtn.innerHTML =
//         savedTheme === "dark"
//           ? `<i class="fas fa-sun"></i>`
//           : `<i class="fas fa-moon"></i>`;
  
//       // Toggle theme on click
//       toggleBtn.addEventListener("click", () => {
//         body.classList.toggle("dark-mode");
//         body.classList.toggle("light-mode");
  
//         const isDark = body.classList.contains("dark-mode");
//         localStorage.setItem("theme", isDark ? "dark" : "light");
  
//         toggleBtn.innerHTML = isDark
//           ? `<i class="fas fa-sun"></i>`
//           : `<i class="fas fa-moon"></i>`;
//       });
//     }
//   }
  
//   // Initialize on page load
//   window.addEventListener("DOMContentLoaded", initThemeToggle);
  
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    // Apply the saved theme
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
    
    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        // Save the current theme to localStorage
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });
});
// Function to initialize mobile navigation
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links li');
  
  if(hamburger) {
      hamburger.addEventListener('click', function() {
          // Toggle navigation
          navLinks.classList.toggle('open');
          hamburger.classList.toggle('active');
          
          // Animate links
          links.forEach((link, index) => {
              if(link.style.animation) {
                  link.style.animation = '';
              } else {
                  link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
              }
          });
      });
  }
  
  // Close mobile menu when clicking on a link
  links.forEach(link => {
      link.addEventListener('click', function() {
          if(navLinks.classList.contains('open')) {
              navLinks.classList.remove('open');
              hamburger.classList.remove('active');
              
              links.forEach(link => {
                  link.style.animation = '';
              });
          }
      });
  });
}

// Function to initialize scroll effects
function initScrollEffects() {
  // Smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if(targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70, // Adjust for header height
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if(window.pageYOffset >= sectionTop - 200) {
              current = section.getAttribute('id');
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove('active');
          if(link.getAttribute('href') === `#${current}`) {
              link.classList.add('active');
          }
      });
  });
  
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
      revealElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;
          
          if(elementTop < window.innerHeight - elementVisible) {
              element.classList.add('active');
          }
      });
  }
  
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Check on initial load
}

// Function to initialize contact form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if(contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const subject = document.getElementById('subject').value;
          const message = document.getElementById('message').value;
          
          // Simple validation
          if(!name || !email || !subject || !message) {
              showFormMessage('Please fill in all fields', 'error');
              return;
          }
          
          // Email validation
          if(!validateEmail(email)) {
              showFormMessage('Please enter a valid email address', 'error');
              return;
          }
          
          // Simulate form submission (in a real scenario, you'd send data to a server)
          showFormMessage('Sending message...', 'sending');
          
          // Simulate server response after 2 seconds
          setTimeout(() => {
              // Reset form
              contactForm.reset();
              showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
              
              // Clear success message after 5 seconds
              setTimeout(() => {
                  formMessage.textContent = '';
                  formMessage.className = '';
              }, 5000);
          }, 2000);
      });
  }
  
  function showFormMessage(message, type) {
      if(formMessage) {
          formMessage.textContent = message;
          formMessage.className = `form-message ${type}`;
      }
  }
  
  function validateEmail(email) {
    const re = /^.{5,}@.{4,}((\[[0-9]{1,3}(\.[0-9]{1,3}){3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function sendMail(){
    let parms={
      name : document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject : document.getElementById("subject").value,
      message :document.getElementById("message").value,
    }
    emailjs.send("service_ietlw43","template_yhzp9th",parms).then(alert("Email sent!!"))
  }
}