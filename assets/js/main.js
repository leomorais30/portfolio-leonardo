const root = document.documentElement;
const toggle = document.querySelector('#themeToggle');
const saved = localStorage.getItem('theme');
if (saved) root.dataset.theme = saved;
else if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';

function syncIcon(){ toggle.textContent = root.dataset.theme === 'dark' ? '☾' : '☼'; }
syncIcon();
toggle.addEventListener('click',()=>{
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', root.dataset.theme);
  syncIcon();
});

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const selected = btn.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card=>{
      card.classList.toggle('hide', selected !== 'all' && card.dataset.category !== selected);
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
