<script>
// sidebar.js
(() => {
  const toc = document.querySelector('.toc');
  const links = Array.from(document.querySelectorAll('.toc a[href^="#"]'));
  if (!toc || !links.length) return;

  // Create native tooltips from text (handy when collapsed)
  links.forEach(a => { if (!a.title) a.title = a.textContent.trim(); });

  // Expand when tabbing into the TOC; collapse when leaving
  toc.addEventListener('focusin', () => toc.classList.add('is-hover'));
  toc.addEventListener('focusout', (e) => {
    // Collapse when focus leaves the TOC entirely
    if (!toc.contains(document.activeElement)) toc.classList.remove('is-hover');
  });

  // Scroll-spy: mark active link by observing sections
  const sectionById = new Map();
  links.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) sectionById.set(id, sec);
  });

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: '0px 0px -65% 0px', threshold: 0.1 });

  sectionById.forEach(sec => io.observe(sec));

  // Scroll progress for the rail (sets --scroll = 0..100)
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? Math.min(100, Math.max(0, (scrollTop / docH) * 100)) : 0;
    toc.style.setProperty('--scroll', pct.toFixed(2));
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  // Mobile toggle: inject a button and toggle 'sidebar-open' on body
  const mkBtn = () => {
    if (document.querySelector('.toc-toggle')) return;
    const btn = document.createElement('button');
    btn.className = 'toc-toggle';
    btn.type = 'button';
    btn.textContent = 'Menu';
    btn.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
    });
    document.body.appendChild(btn);
  };
  // Only show toggle on small screens
  const mq = window.matchMedia('(max-width: 900px)');
  const handleMQ = () => {
    if (mq.matches) mkBtn();
    else document.body.classList.remove('sidebar-open');
  };
  handleMQ();
  mq.addEventListener('change', handleMQ);
})();
</script>
