(function(){
  // Simple slider: autoplay, prev/next, dots, pause on hover
  const slider = document.querySelector('.slider');
  if(!slider) return;
  const slidesEl = slider.querySelector('.slides');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');
  const dotsContainer = slider.querySelector('.slider-dots');
  const slideCount = slides.length;
  let current = 0;
  let interval = null;
  const AUTO_MS = 4000;

  function goTo(index){
    current = (index + slideCount) % slideCount;
    slidesEl.style.transform = `translateX(${ -current * 100 }%)`;
    updateDots();
  }
  function next(){ goTo(current + 1) }
  function prev(){ goTo(current - 1) }

  function createDots(){
    for(let i=0;i<slideCount;i++){
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Go to slide ${i+1}`);
      b.dataset.index = i;
      b.addEventListener('click', ()=>{ goTo(i); restart(); });
      dotsContainer.appendChild(b);
    }
  }
  function updateDots(){
    const buttons = Array.from(dotsContainer.children);
    buttons.forEach((b, i)=>{
      b.classList.toggle('active', i===current);
      b.setAttribute('aria-selected', i===current ? 'true' : 'false');
      b.setAttribute('role','tab');
      b.tabIndex = i===current ? 0 : -1;
    });
  }

  function start(){
    stop();
    interval = setInterval(next, AUTO_MS);
  }
  function stop(){ if(interval) { clearInterval(interval); interval = null } }
  function restart(){ start() }

  // Initialize
  createDots();
  updateDots();
  goTo(0);
  start();

  // Events
  nextBtn.addEventListener('click', ()=>{ next(); restart(); });
  prevBtn.addEventListener('click', ()=>{ prev(); restart(); });

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  // Keyboard nav
  slider.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') { prev(); restart(); }
    if(e.key === 'ArrowRight') { next(); restart(); }
  });

  // Make slider focusable for keyboard
  slider.tabIndex = 0;
})();
