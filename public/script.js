// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

/* -------------------- Text Scramble -------------------- */
// Lightweight scramble inspired technique (no libs)
class Scrambler {
  constructor(el, fps = 60){
    this.el = el;
    this.fps = fps;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.frame = 0; this.queue = []; this.frameReq = null;
    this.text = el.textContent;
  }
  setText(newText){
    const old = this.el.textContent;
    const length = Math.max(old.length, newText.length);
    this.queue = [];
    for(let i=0;i<length;i++){
      const from = old[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random()*20);
      const end = start + Math.floor(Math.random()*20);
      this.queue.push({from, to, start, end, char:null});
    }
    cancelAnimationFrame(this.frameReq);
    this.frame = 0;
    this.update();
  }
  update = () => {
    let output = "";
    let complete = 0;
    for(const q of this.queue){
      if(this.frame >= q.end){ complete++; output += q.to; }
      else if(this.frame >= q.start){
        if(!q.char || Math.random() < 0.28) q.char = this.randomChar();
        output += `<span class="dv">${q.char}</span>`;
      } else { output += q.from; }
    }
    this.el.innerHTML = output;
    if(complete === this.queue.length) return;
    this.frame++;
    this.frameReq = requestAnimationFrame(this.update);
  }
  randomChar(){ return this.chars[Math.floor(Math.random()*this.chars.length)] }
}

const scr = new Scrambler(document.querySelector('.scramble'));
setTimeout(() => scr.setText(document.querySelector('.scramble').dataset.text), 300);
// Re-scramble on hover for fun
document.querySelector('.scramble').addEventListener('mouseenter', () => scr.setText(scr.text));

/* -------------------- GPU-friendly particles -------------------- */
const c = document.getElementById('bg-particles');
const ctx = c.getContext('2d');
let w, h, dpr, particles;

function resize(){
  dpr = window.devicePixelRatio || 1;
  w = c.width = innerWidth * dpr;
  h = c.height = innerHeight * dpr;
  c.style.width = innerWidth + 'px';
  c.style.height = innerHeight + 'px';
  ctx.setTransform(1,0,0,1,0,0);
  ctx.scale(dpr, dpr);
  init();
}
function init(){
  const count = Math.round((innerWidth * innerHeight) / 26000); // scales with screen
  particles = Array.from({length: count}, () => ({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    r: Math.random()*1.8 + 0.6,
    vx: (Math.random()-0.5)*0.25,
    vy: (Math.random()-0.5)*0.25,
    hue: [180, 300, 265][Math.floor(Math.random()*3)] // cyan/magenta/purple
  }));
}
function tick(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x < -50) p.x = innerWidth+50; if(p.x > innerWidth+50) p.x = -50;
    if(p.y < -50) p.y = innerHeight+50; if(p.y > innerHeight+50) p.y = -50;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, .45)`;
    ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, .55)`;
    ctx.shadowBlur = 12;
    ctx.fill();
  }
  requestAnimationFrame(tick);
}
addEventListener('resize', resize, {passive:true});
resize(); tick();
