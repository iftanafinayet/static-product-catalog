// Product detail: load product JSON by id and render gallery + info
(function(){
  const dataUrl = '/assets/data/products.json';
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || 'flat-bottom';

  // DOM hooks
  const main = document.getElementById('mainImage');
  const thumbsContainer = document.querySelector('.thumbnails');
  const titleEl = document.getElementById('product-title');
  const priceEl = document.querySelector('.price');
  const shortDesc = document.querySelector('.short-desc');
  const specsList = document.querySelector('.specs');

  function buildSpecs(specs){
    specsList.innerHTML = '';
    for(const key in specs){
      const li = document.createElement('li');
      li.innerHTML = `<strong>${key}:</strong> ${specs[key]}`;
      specsList.appendChild(li);
    }
  }

  function buildGallery(images){
    thumbsContainer.innerHTML = '';
    images.forEach((src, idx)=>{
      const btn = document.createElement('button');
      btn.className = 'thumb';
      btn.type = 'button';
      btn.dataset.src = src;
      btn.setAttribute('aria-label', `Image ${idx+1}`);
      btn.setAttribute('role','tab');
      const img = document.createElement('img');
      img.src = src;
      img.alt = `thumbnail ${idx+1}`;
      btn.appendChild(img);
      thumbsContainer.appendChild(btn);
    });
  }

  function initGalleryBehavior(){
    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    if(!main || thumbs.length===0) return;
    let current = 0;
    function goTo(index){
      current = (index + thumbs.length) % thumbs.length;
      const src = thumbs[current].dataset.src;
      main.src = src;
      thumbs.forEach((t,i)=>{
        t.classList.toggle('active', i===current);
        t.setAttribute('aria-selected', i===current? 'true' : 'false');
        t.tabIndex = i===current ? 0 : -1;
      });
      if(thumbs[current] && typeof thumbs[current].scrollIntoView === 'function'){
        thumbs[current].scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
      }
    }

    thumbs.forEach((t,i)=>{
      t.addEventListener('click', ()=> goTo(i));
      t.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); goTo(i); }});
    });

    const gallery = document.querySelector('.gallery');
    if(gallery){
      gallery.tabIndex = 0;
      gallery.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowRight') goTo(current+1);
        if(e.key === 'ArrowLeft') goTo(current-1);
      });
    }

    goTo(0);
  }

  // fetch data and render
  fetch(dataUrl).then(r=>r.json()).then(json=>{
    const products = json.products || [];
    const product = products.find(p=>p.id === productId) || products[0];
    if(!product) return;

    // populate
    titleEl.textContent = product.title;
    priceEl.innerHTML = `${product.price_note} <small style="display:block;color:var(--muted);font-weight:600">${product.price_sub}</small>`;
    shortDesc.textContent = product.short_desc;
    buildSpecs(product.specs || {});
    buildGallery(product.images || []);
    if(product.images && product.images.length) main.src = product.images[0];

    // init interactions
    initGalleryBehavior();
  }).catch(err=>{
    console.error('Failed to load product data', err);
  });

})();
