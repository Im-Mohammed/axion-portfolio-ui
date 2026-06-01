// public/warmup.js
(function () {
  fetch('https://moportfolio-backend.onrender.com/health', {
    cache: 'no-store'
  }).catch(function () {});
})();