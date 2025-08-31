/**
 * No Bats Baseball Club - Header Component for Event Pages
 * This script injects the shared header into event detail pages.
 */

document.addEventListener('DOMContentLoaded', function() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;

  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  // Define menu items with correct relative paths
  const menuItems = [
    { name: 'Home', href: '../index.html' },
    { name: 'About Us', href: '../about-us.html' },
    { name: 'Donations', href: '../donations.html' },
    { name: 'Testimonials', href: '../testimonials.html' },
    { name: 'Events', href: '../events.html' },
    { name: 'Media', href: '../media.html' },
    { name: 'Members', href: '../members.html' }
  ];

  headerContainer.innerHTML = `
    <header class="header">
      <div class="container">
        <!-- Logo -->
        <div class="logo">
          <a href="../index.html">
            <img src="../img/nbbclogo.png" alt="No Bats Baseball Club Logo">
          </a>
        </div>

        <!-- Desktop & Mobile Navigation -->
        <nav class="nav">
          <!-- Desktop Menu -->
          <ul class="nav-menu">
            ${menuItems.map(item => `
              <li class="nav-item">
                <a href="${item.href}" class="nav-link ${pageName === item.href ? 'active' : ''}">${item.name}</a>
              </li>`).join('')}
          </ul>
          
          <!-- Mobile Menu (for Overlay) -->
          <ul class="nav-menu-mobile">
            ${menuItems.map(item => `
              <li class="nav-item">
                <a href="${item.href}" class="nav-link ${pageName === item.href ? 'active' : ''}">${item.name}</a>
              </li>`).join('')}
          </ul>
        </nav>

        <!-- Mobile Toggle Button -->
        <button class="nav-toggle" aria-label="Toggle Navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `;

  // --- Event Listeners ---
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('active');
      navToggle.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}); 