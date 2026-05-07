// ─── Sidebar nav active-state click handler ───
function setActive(el) {
  document.querySelectorAll('.sidebar-nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

// ─── Intersection observer for scroll-spy ───
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.sidebar-nav-item[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === '#' + entry.target.id) {
            item.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));
})();
