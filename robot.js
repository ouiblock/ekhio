
/* ============================================================
   EKHIO ROBOT CONTROLLER v2 — Bouche LCD + 7 humeurs
   ============================================================ */

// Expressions de bouche SVG par mood (viewBox 0 0 38 14)
const MOUTH_PATHS = {
  neutral:    "M8,7 Q19,7 30,7",                          // ligne droite
  happy:      "M4,10 Q11,3 19,3 Q27,3 34,10",             // grand sourire
  excited:    "M3,11 Q10,2 19,2 Q28,2 35,11",             // sourire maximal + ouvert
  curious:    "M6,8 Q14,5 22,7 Q28,9 32,6",               // asymétrique curieux
  proud:      "M7,5 Q13,2 19,3 Q25,4 31,5",               // léger sourire satisfait
  sleeping:   "M10,8 Q19,9 28,8",                          // ligne légèrement courbée bas
  sad:        "M5,5 Q12,10 19,11 Q26,10 33,5",             // courbe triste inversée
  surprised:  "M14,5 Q19,12 24,5 Q21,11 19,12 Q17,11 14,5", // bouche ouverte ovale
  thinking:   "M8,7 Q14,6 20,8 Q26,7 30,9",               // irrégulier pensif
};

// Blink aléatoire
let blinkInterval = null;
function startBlink(){
  if(blinkInterval) clearInterval(blinkInterval);
  blinkInterval = setInterval(()=>{
    const el = document.getElementById('eyelid-l');
    const er = document.getElementById('eyelid-r');
    if(!el||!er) return;
    el.style.height = er.style.height = '100%';
    setTimeout(()=>{ el.style.height = er.style.height = '0'; }, 140);
  }, 3200 + Math.random()*2000);
}

const Robot = {
  current: 'neutral',
  moods: Object.keys(MOUTH_PATHS),

  set(mood) {
    if(!MOUTH_PATHS[mood]) mood = 'neutral';
    const r = document.getElementById('robot');
    if(!r) return;
    this.moods.forEach(m => r.classList.remove(m));
    r.classList.add(mood);
    this.current = mood;
    // Animate mouth path
    const mp = document.getElementById('mouth-path');
    if(mp) {
      mp.style.transition = 'd .45s cubic-bezier(.34,1.2,.64,1)';
      mp.setAttribute('d', MOUTH_PATHS[mood]);
    }
    // Shadow recalc
    const s = document.getElementById('robot-shadow');
    if(s) s.style.width = ['excited','happy'].includes(mood) ? '55px' : '72px';
  },

  bounce() {
    const r = document.getElementById('robot');
    if(!r) return;
    r.classList.remove('bounce');
    void r.offsetWidth; // reflow
    r.classList.add('bounce');
    setTimeout(()=>r.classList.remove('bounce'), 480);
  },

  celebrate() {
    const r = document.getElementById('robot');
    if(!r) return;
    r.classList.remove('celebrate');
    void r.offsetWidth;
    r.classList.add('celebrate');
    setTimeout(()=>r.classList.remove('celebrate'), 800);
    if(typeof launchConfetti === 'function') launchConfetti();
  },

  shake() {
    const r = document.getElementById('robot');
    if(!r) return;
    r.classList.remove('shake');
    void r.offsetWidth;
    r.classList.add('shake');
    setTimeout(()=>r.classList.remove('shake'), 420);
  },

  think() { this.set('thinking'); },
  sleep() { this.set('sleeping'); },
  wakeUp() { this.set('curious'); setTimeout(()=>this.set('neutral'),1200); },
};

function tapRobot(){
  Robot.bounce();
  const pool = window.T && window.T[window.lang||'fr']
    ? window.T[window.lang||'fr'].bubbles
    : ['🤖 Ekhio!','⭐','☀️'];
  if(typeof setBubble==='function') setBubble(pool[Math.floor(Math.random()*pool.length)]);
}

// Init
document.addEventListener('DOMContentLoaded', function(){
  Robot.set('curious');
  startBlink();
  setTimeout(()=>Robot.set('neutral'), 1500);
});
