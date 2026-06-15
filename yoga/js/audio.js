// PranaDaily Ambient Audio & Meditation Sound Synthesizer using Web Audio API

class SoundStudio {
  constructor() {
    this.ctx = null;
    this.ambientGain = null;
    this.ambientOscillators = [];
    this.isPlayingAmbient = false;
    this.ambientType = 'singing_bowl'; // singing_bowl, binaural_om, gentle_rain
    this.noiseNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a gorgeous realistic Tibetan Singing Bowl Strike
  playChime() {
    this.init();
    const now = this.ctx.currentTime;

    // We create 3 elegant frequencies that ring together
    const freqs = [216, 432, 864]; // Fundamental, octave, double octave
    
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle frequency detune for authentic metallic wobble
      if (idx === 1) osc.detune.setValueAtTime(1.5, now);
      if (idx === 2) osc.detune.setValueAtTime(-2, now);

      // Flawless exponential decay
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25 / (idx + 1), now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 4.6);
    });
  }

  // Toggle Continuous Ambient Relaxing Sound
  toggleAmbient(type = null) {
    this.init();
    if (type) {
      this.ambientType = type;
    }

    if (this.isPlayingAmbient) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  startAmbient() {
    this.stopAmbient();
    this.init();
    this.isPlayingAmbient = true;

    const now = this.ctx.currentTime;
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, now);
    this.ambientGain.gain.linearRampToValueAtTime(0.12, now + 2); // Soft fade in
    this.ambientGain.connect(this.ctx.destination);

    if (this.ambientType === 'singing_bowl') {
      // Create a gorgeous harmonic resonant drone
      const baseFreq = 144;
      const harmonics = [1, 1.5, 2, 3];
      
      harmonics.forEach(h => {
        const osc = this.ctx.createOscillator();
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * h, now);
        
        if (panner) {
          panner.pan.setValueAtTime((Math.random() - 0.5) * 0.8, now);
          osc.connect(panner);
          panner.connect(this.ambientGain);
        } else {
          osc.connect(this.ambientGain);
        }
        
        osc.start(now);
        this.ambientOscillators.push(osc);
      });
    } else if (this.ambientType === 'binaural_om') {
      // 136.1 Hz is the classic OM / Anahata frequency. We play 136.1 in Left, 140.1 in Right (4Hz Theta binaural beat)
      const leftOsc = this.ctx.createOscillator();
      const rightOsc = this.ctx.createOscillator();
      
      leftOsc.type = 'sine';
      rightOsc.type = 'sine';
      
      leftOsc.frequency.setValueAtTime(136.1, now);
      rightOsc.frequency.setValueAtTime(140.1, now);

      if (this.ctx.createStereoPanner) {
        const leftPanner = this.ctx.createStereoPanner();
        const rightPanner = this.ctx.createStereoPanner();
        
        leftPanner.pan.setValueAtTime(-1, now);
        rightPanner.pan.setValueAtTime(1, now);

        leftOsc.connect(leftPanner);
        rightOsc.connect(rightPanner);

        leftPanner.connect(this.ambientGain);
        rightPanner.connect(this.ambientGain);
      } else {
        leftOsc.connect(this.ambientGain);
        rightOsc.connect(this.ambientGain);
      }

      leftOsc.start(now);
      rightOsc.start(now);
      this.ambientOscillators.push(leftOsc, rightOsc);
    } else if (this.ambientType === 'gentle_rain') {
      // Generate soothing Pink Noise Rain with a lowpass filter
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // Scale down
        b6 = white * 0.115926;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Filter for soft distant ocean/rain sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      this.noiseNode.connect(filter);
      filter.connect(this.ambientGain);
      this.noiseNode.start(now);
    }
  }

  stopAmbient() {
    if (!this.isPlayingAmbient || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    
    // Smooth fade out
    this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
    this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 1.5);

    setTimeout(() => {
      this.ambientOscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      this.ambientOscillators = [];
      if (this.noiseNode) {
        try { this.noiseNode.stop(); this.noiseNode.disconnect(); } catch (e) {}
        this.noiseNode = null;
      }
      this.isPlayingAmbient = false;
    }, 1500);
  }
}

const audioStudio = new SoundStudio();
