class MysticAudioContext {
  constructor() {
    this.ctx = null;
    this.humOscillator = null;
    this.humGain = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    this.isInitialized = true;
  }

  // Deep sine wave hum for Sling Ring
  playPortalOpen() {
    if (!this.isInitialized) this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(40, this.ctx.currentTime); // Low rumble
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.8);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2.0);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 2.0);
  }

  // High-pitch short release for shatter
  playShatter() {
    if (!this.isInitialized) this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Continuous organic hum that changes pitch based on velocity
  startHoverHum() {
    if (!this.isInitialized) this.init();
    if (this.humOscillator) return;

    this.humOscillator = this.ctx.createOscillator();
    this.humGain = this.ctx.createGain();

    this.humOscillator.type = 'sine';
    this.humOscillator.frequency.value = 150;

    this.humGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.humGain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.1);

    this.humOscillator.connect(this.humGain);
    this.humGain.connect(this.ctx.destination);
    
    this.humOscillator.start();
  }

  updateHoverHum(velocity) {
    if (!this.humOscillator || !this.humGain) return;
    // Map velocity (0-50) to pitch (150Hz - 400Hz)
    const targetFreq = Math.min(150 + velocity * 5, 400);
    this.humOscillator.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
  }

  stopHoverHum() {
    if (!this.humGain || !this.humOscillator) return;
    this.humGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);
    setTimeout(() => {
      if (this.humOscillator) {
        this.humOscillator.stop();
        this.humOscillator.disconnect();
        this.humOscillator = null;
      }
      if (this.humGain) {
        this.humGain.disconnect();
        this.humGain = null;
      }
    }, 250);
  }
}

export const mysticAudio = new MysticAudioContext();
