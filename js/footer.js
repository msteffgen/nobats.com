/**
 * No Bats Baseball Club - Footer Component
 * This script injects the shared footer into all pages.
 */

document.addEventListener('DOMContentLoaded', function() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;
  
  footerContainer.innerHTML = `
  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-logo-text">
          <img src="img/nbbclogo.png" alt="No Bats Baseball Club Logo" class="footer-logo">
          <p>Founded in 1991, the No Bats Baseball Club is a non-profit group dedicated to promoting charity and goodwill through baseball.</p>
        </div>
        <a href="https://www.instagram.com/nobatsbaseballclub/" class="social-icon" aria-label="Instagram" target="_blank" rel="noopener">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
      
      <div class="footer-nav">
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="about-us.html">About Us</a>
          <a href="donations.html">Donations</a>
          <a href="testimonials.html">Testimonials</a>
          <a href="events.html">Events</a>
          <a href="media.html">Media</a>
          <a href="members.html">Members</a>
        </div>
      </div>
      
      <div class="copyright">
        &copy; 2025 No Bats Baseball Club. All Rights Reserved.
      </div>
    </div>
  </footer>
  `;
}); 