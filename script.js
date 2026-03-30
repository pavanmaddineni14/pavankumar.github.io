// Scroll Progress
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById('progress-bar').style.width = (scrollTop / height * 100) + '%';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Typing effect
const typing = document.getElementById('typing');
const words = ["iOS Engineer", "Swift Expert", "Mobile Architect"];
let i = 0, j = 0, current = '', isDeleting = false;

function type(){
  current = words[i];
  typing.textContent = isDeleting ? current.substring(0,j--) : current.substring(0,j++);
  if(!isDeleting && j===current.length){ isDeleting=true; setTimeout(type,1000); return; }
  if(isDeleting && j===0){ isDeleting=false; i=(i+1)%words.length; }
  setTimeout(type,100);
}
type();

// Fade in sections
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('show'); }
  });
});
sections.forEach(s=>observer.observe(s));

// Load GitHub repos
const grid = document.getElementById('projects-grid');
grid.innerHTML = `<div class="skeleton"></div><div class="skeleton"></div>`;
async function loadRepos(){
  try{
    const res = await fetch("https://api.github.com/users/pavanmaddineni14/repos");
    const data = await res.json();
    grid.innerHTML = '';
    data.filter(r=>!r.fork).sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,6).forEach(repo=>{
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `<h3>${repo.name}</h3><p>${repo.description || 'No description'}</p><p>⭐ ${repo.stargazers_count}</p><a href="${repo.html_url}" target="_blank">View</a>`;
      grid.appendChild(card);
    });
  } catch { grid.innerHTML = "Failed to load projects"; }
}
loadRepos();