
// ===== ROBOT CONTROLLER =====
const Robot = {
  moods: ['neutral','happy','excited','curious','proud','sleeping','sad'],
  current: 'neutral',

  set(mood) {
    const r = document.getElementById('robot');
    if(!r) return;
    this.moods.forEach(m => r.classList.remove(m));
    r.classList.add(mood);
    this.current = mood;
    // Dynamic accent
    const colors = {
      neutral:'#00D4FF', happy:'#FFB800', excited:'#2ECC71',
      curious:'#00D4FF', proud:'#8B5CF6', sleeping:'#444', sad:'#6B9FBF'
    };
    document.documentElement.style.setProperty('--robot-eye-color', colors[mood]||'#00D4FF');
  },

  bounce() {
    const r = document.getElementById('robot');
    if(!r) return;
    r.classList.add('bounce');
    setTimeout(()=>r.classList.remove('bounce'), 450);
  },

  celebrate() {
    const r = document.getElementById('robot');
    if(!r) return;
    r.classList.add('celebrate');
    setTimeout(()=>r.classList.remove('celebrate'), 700);
    launchConfetti();
  },

  shadow(up=false) {
    const s = document.getElementById('robot-shadow');
    if(s) s.style.width = up ? '45px' : '70px';
  }
};

function tapRobot(){
  Robot.bounce();
  const bubbles = (window.T && window.T[window.lang||'fr'] && window.T[window.lang||'fr'].bubbles) || ['🤖','⭐','☀️'];
  setBubble(bubbles[Math.floor(Math.random()*bubbles.length)]);
}
