// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',e=>{
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Dark / Light toggle
const toggle = document.querySelector('.theme-toggle');
toggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode');
  toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️':'🌙';
});

// Typing animation
const typing = document.getElementById('typing');
const skills = ["Swift Developer","iOS Engineer","SwiftUI Expert","Clean Architecture Advocate"];
let i=0,j=0,skill='',isDeleting=false;
function type(){ 
  skill = skills[i];
  typing.textContent = isDeleting ? skill.substring(0,j--) : skill.substring(0,j++);
  if(!isDeleting && j===skill.length){ isDeleting=true; setTimeout(type,1000); return; }
  if(isDeleting && j===0){ isDeleting=false; i=(i+1)%skills.length; setTimeout(type,500); return; }
  setTimeout(type,150);
}
type();

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('show'); }
  });
},{threshold:0.3});
faders.forEach(fader=>observer.observe(fader));

// Lottie Animation (example)
lottie.loadAnimation({
  container: document.getElementById('lottie-header'),
  renderer:'svg',
  loop:true,
  autoplay:true,
  path:'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json'
});

// Realtime GitHub Projects
const githubUser = 'pavanmaddineni14';
fetch(`https://api.github.com/users/${githubUser}/repos`)
  .then(res=>res.json())
  .then(data=>{
    const grid = document.getElementById('projects-grid');
    data.sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,6).forEach(repo=>{
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `<h3>${repo.name}</h3>
        <p>${repo.description||'No description available'}</p>
        <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
        <a href="${repo.html_url}" target="_blank" class="btn">View Repo</a>`;
      grid.appendChild(card);
    });
  });