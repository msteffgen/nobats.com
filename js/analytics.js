// Load the external Google Analytics script
var script = document.createElement('script');
script.async = true;
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DY1MP35ETY';
document.head.appendChild(script);

// Initialize the tracking
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-DY1MP35ETY');