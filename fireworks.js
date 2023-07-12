

let auto = false;
const m = {x:0, y:0},
  stage = document.querySelector('.stage'),
  toggle = document.querySelector('.toggle');

window.onpointerdown = window.onpointermove = (e)=>{
  m.x = Math.round(e.clientX);
  m.y = Math.round(e.clientY);
};

stage.onpointerup = (e)=>{
  gsap.killTweensOf(autoPlay);
  gsap.killTweensOf(fire);
  auto = true;
  toggleAuto();
  fire(m);
  setTimeout(() => {
    auto = false;
    toggleAuto();
  }, 10000); // 10 segundos
};

function fire(m){
  const firework = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
        trail = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
        ring = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
        hsl = 'hsl('+gsap.utils.random(0,360,1)+',100%,50%)';

  stage.appendChild(firework);
  firework.appendChild(trail);
  firework.appendChild(ring);

  for (let i=1; i<5; i++){
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    gsap.set(t, {x:m.x, y:innerHeight, opacity:0.25, attr:{'stroke-width':i, d:'M0,0 0,'+innerHeight}});
    gsap.to(t, {y:m.y, ease:'expo'});
    trail.appendChild(t);    
  }

  for (let i=1; i<gsap.utils.random(6,13,1); i++){ 
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    gsap.set(c, {x:m.x, y:m.y, attr:{class:'core', r:()=>(i/1.5)*18, fill:'none', stroke:hsl, 'stroke-width':()=>0.25+(9-i), 'stroke-dasharray':'1 '+i/2*gsap.utils.random(i+3,i+6)}});
    ring.appendChild(c);
  }

  gsap.timeline({onComplete:()=>stage.removeChild(firework)})
    .to(trail.children, {duration:0.2, attr:{d:'M0,0 0,0'}, stagger:-0.08, ease:'expo.inOut'}, 0)
    .to(trail.children, {duration:0.4, scale:()=>gsap.utils.random(40,80,1), attr:{stroke:hsl}, stagger:-0.15, ease:'expo'}, 0.4)
    .to(trail.children, {duration:0.3, opacity:0, ease:'power2.inOut', stagger:-0.1}, 0.5)
    .from(ring.children, {duration:1, rotate:()=>gsap.utils.random(-90,90,1), scale:0, stagger:0.05, ease:'expo'}, 0.4)
    .to(ring.children, {opacity:0, stagger:0.1, ease:'sine.inOut'}, 0.7)
    .to(ring.children, {duration:1, y:'+=30', ease:'power2.in'}, 0.7);
}

function toggleAuto(){
  auto = !auto;
  gsap.timeline({defaults:{duration:0.3, ease:'power2.inOut'}})
    .to('.knob', {x:()=>(auto)?18:0}, 0)
    .to('.txt1', {opacity:(i)=>(auto)?0.3:1}, 0)
    .to('.txt2', {opacity:(i)=>(auto)?1:0.3}, 0);
  if (auto) autoPlay();
  else {
    gsap.killTweensOf(autoPlay);
    gsap.killTweensOf(fire);
  }
}

function autoPlay(){
  for (let i=0; i<gsap.utils.random(3,9,1); i++){
    gsap.delayedCall(i/2, fire, [{x:gsap.utils.random(99, innerWidth-99, 1), y:gsap.utils.random(99, innerHeight-99, 1)}]);
  }
  if (auto) gsap.delayedCall(3.5,autoPlay);
  else gsap.killTweensOf(autoPlay);
}

toggleAuto();