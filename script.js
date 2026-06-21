const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const particles = [];

for(let i=0;i<120;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2+1,
vx:(Math.random()-.5)*0.5,
vy:(Math.random()-.5)*0.5
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0||p.x>canvas.width)p.vx*=-1;
if(p.y<0||p.y>canvas.height)p.vy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fillStyle="rgba(0,229,255,.8)";
ctx.fill();
});

for(let a=0;a<particles.length;a++){
for(let b=a;b<particles.length;b++){

let dx=particles[a].x-particles[b].x;
let dy=particles[a].y-particles[b].y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){
ctx.strokeStyle=`rgba(124,58,237,${1-dist/120})`;
ctx.lineWidth=.5;
ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();
}
}
}

requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize",()=>{
canvas.width=innerWidth;
canvas.height=innerHeight;
});

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{threshold:.15});

document.querySelectorAll("section").forEach(section=>{
section.classList.add("hidden");
observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
link.addEventListener("click",e=>{
e.preventDefault();
document.querySelector(link.getAttribute("href"))
.scrollIntoView({
behavior:"smooth"
});
});
});

const title=document.querySelector("#inicio h1");
const text=title.textContent;

title.textContent="";

let i=0;

function type(){
if(i<text.length){
title.textContent+=text.charAt(i);
i++;
setTimeout(type,40);
}
}

window.onload=type;