// ==================== GAMIFIED LOADING SYSTEM ====================
class GameLoadingSystem {
  constructor() {
    this.progress = 0;
    this.totalAssets = 15;
    this.loadedAssets = 0;
    this.init();
  }

  init() {
    this.createLoadingScreen();
    this.loadAssets();
    this.createProgressBar();
    this.createGameWorld();
  }

  createLoadingScreen() {
    // Create cosmic loading container
    this.loadingContainer = document.createElement("div");
    this.loadingContainer.className = "cosmic-loading-screen";
    this.loadingContainer.innerHTML = `
            <div class="cosmic-background"></div>
            <div class="loading-content">
                <div class="loading-title">
                    <span class="title-text">INITIALIZING DIGITAL UNIVERSE</span>
                    <div class="title-sparkles"></div>
                </div>
                <div class="loading-game-ui">
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                            <div class="progress-glow"></div>
                        </div>
                        <div class="progress-stats">
                            <span class="stat">SYSTEMS: <span id="system-stat">0%</span></span>
                            <span class="stat">ASSETS: <span id="asset-stat">0/15</span></span>
                            <span class="stat">RENDERING: <span id="render-stat">0%</span></span>
                        </div>
                    </div>
                    <div class="loading-minigame">
                        <canvas id="loading-minigame-canvas"></canvas>
                        <div class="minigame-instruction">Collect the data particles!</div>
                    </div>
                </div>
                <div class="loading-hints">
                    <div class="hint">Tip: This portfolio responds to your mouse and device motion</div>
                    <div class="hint">Tip: Some secrets are hidden in plain sight</div>
                </div>
            </div>
        `;
    document.body.prepend(this.loadingContainer);

    // Create audio context for loading sounds
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.createLoadingSounds();
  }

  createLoadingSounds() {
    // Create loading completion sound
    this.loadCompleteSound = this.createSound(523.25, 0.2, 0.3);

    // Create progress sound
    this.progressSound = this.createSound(392, 0.1, 0.1);
  }

  createSound(frequency, duration, volume) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume,
      this.audioContext.currentTime + 0.01
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  createProgressBar() {
    this.progressFill = document.querySelector(".progress-fill");
    this.progressGlow = document.querySelector(".progress-glow");
    this.systemStat = document.getElementById("system-stat");
    this.assetStat = document.getElementById("asset-stat");
    this.renderStat = document.getElementById("render-stat");

    // Animate progress bar
    const animateProgress = () => {
      if (this.progress < 100) {
        const increment = 0.5 + Math.random() * 0.5;
        this.progress = Math.min(this.progress + increment, 100);

        this.progressFill.style.width = `${this.progress}%`;
        this.progressGlow.style.width = `${this.progress}%`;
        this.systemStat.textContent = `${Math.floor(this.progress)}%`;

        // Play progress sound occasionally
        if (Math.random() > 0.7) {
          this.progressSound = this.createSound(
            392 + Math.random() * 200,
            0.05,
            0.05
          );
        }

        requestAnimationFrame(animateProgress);
      } else {
        this.onLoadingComplete();
      }
    };

    animateProgress();
  }

  createGameWorld() {
    this.canvas = document.getElementById("loading-minigame-canvas");
    this.ctx = this.canvas.getContext("2d");

    // Set canvas size
    this.canvas.width = 400;
    this.canvas.height = 200;

    // Game elements
    this.particles = [];
    this.player = {
      x: this.canvas.width / 2,
      y: this.canvas.height - 20,
      size: 15,
      collected: 0,
    };
    this.createParticles();

    // Mouse tracking for minigame
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.player.x = e.clientX - rect.left;
    });

    // Touch support
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.player.x = e.touches[0].clientX - rect.left;
    });

    // Start game loop
    this.gameLoop();
  }

  createParticles() {
    // Create colorful data particles
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -100,
        size: 5 + Math.random() * 10,
        speed: 1 + Math.random() * 2,
        color: this.getRandomColor(),
        collected: false,
      });
    }
  }

  getRandomColor() {
    const colors = [
      "#FF3366",
      "#33FFCC",
      "#FFCC00",
      "#9966FF",
      "#FF6699",
      "#66FF33",
      "#FF9900",
      "#33CCFF",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  gameLoop() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw particles
    this.particles.forEach((particle) => {
      if (!particle.collected) {
        particle.y += particle.speed;

        // Reset if out of bounds
        if (particle.y > this.canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * this.canvas.width;
        }

        // Check collision with player
        const dx = this.player.x - particle.x;
        const dy = this.player.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.player.size + particle.size) {
          particle.collected = true;
          this.player.collected++;
          this.assetStat.textContent = `${this.player.collected}/15`;

          // Play collection sound
          this.createSound(659.25, 0.1, 0.2);

          // Create particle explosion effect
          this.createExplosion(particle.x, particle.y, particle.color);
        }

        // Draw particle
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();

        // Add glow
        this.ctx.shadowColor = particle.color;
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }
    });

    // Draw player
    this.ctx.fillStyle = "#FF3366";
    this.ctx.beginPath();
    this.ctx.arc(
      this.player.x,
      this.player.y,
      this.player.size,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // Draw player glow
    this.ctx.shadowColor = "#FF3366";
    this.ctx.shadowBlur = 20;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Draw player trail
    this.ctx.strokeStyle = "#FF3366";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.player.x, this.player.y);
    this.ctx.lineTo(this.player.x, this.player.y + 30);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    requestAnimationFrame(() => this.gameLoop());
  }

  createExplosion(x, y, color) {
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const particle = {
        x,
        y,
        vx: Math.cos(angle) * (2 + Math.random() * 3),
        vy: Math.sin(angle) * (2 + Math.random() * 3),
        size: 2 + Math.random() * 4,
        color,
        life: 1,
      };

      // Add explosion particle
      setTimeout(() => {
        // Animate explosion
        const animate = () => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.size *= 0.95;
          particle.life *= 0.9;

          this.ctx.globalAlpha = particle.life;
          this.ctx.fillStyle = particle.color;
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.globalAlpha = 1;

          if (particle.life > 0.1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      }, 50);
    }
  }

  loadAssets() {
    // Simulate asset loading
    const assets = [
      "graphics",
      "animations",
      "audio",
      "fonts",
      "particles",
      "models",
      "textures",
      "shaders",
      "api",
      "database",
      "cache",
      "memory",
      "gpu",
      "network",
      "security",
    ];

    assets.forEach((asset, index) => {
      setTimeout(() => {
        this.loadedAssets++;
        this.assetStat.textContent = `${
          this.player.collected || this.loadedAssets
        }/15`;

        // Update render stat
        const renderProgress = Math.min(
          (this.loadedAssets / assets.length) * 100,
          100
        );
        this.renderStat.textContent = `${Math.floor(renderProgress)}%`;
      }, 300 * index);
    });
  }

  onLoadingComplete() {
    // Play completion sound
    this.createSound(1046.5, 0.5, 0.3);

    // Animate completion
    setTimeout(() => {
      this.loadingContainer.style.opacity = "0";
      setTimeout(() => {
        this.loadingContainer.style.display = "none";
        this.initiateMainExperience();
      }, 1000);
    }, 500);
  }

  initiateMainExperience() {
    // Start main website animations
    document.body.classList.add("loaded");

    // Initialize interactive background
    this.initInteractiveBackground();

    // Start particle system
    this.startMainParticleSystem();

    // Begin entrance animation
    this.entranceAnimation();
  }

  initInteractiveBackground() {
    // Create interactive canvas background
    this.mainCanvas = document.createElement("canvas");
    this.mainCanvas.className = "interactive-background";
    document.body.prepend(this.mainCanvas);

    const resize = () => {
      this.mainCanvas.width = window.innerWidth;
      this.mainCanvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Start background animation
    this.animateBackground();
  }

  animateBackground() {
    // This will be expanded with interactive particles
    const ctx = this.mainCanvas.getContext("2d");
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

      // Draw animated gradient background
      const gradient = ctx.createRadialGradient(
        this.mainCanvas.width / 2,
        this.mainCanvas.height / 2,
        0,
        this.mainCanvas.width / 2,
        this.mainCanvas.height / 2,
        Math.max(this.mainCanvas.width, this.mainCanvas.height) / 2
      );

      gradient.addColorStop(0, "rgba(255, 51, 102, 0.1)");
      gradient.addColorStop(0.5, "rgba(51, 204, 255, 0.05)");
      gradient.addColorStop(1, "rgba(153, 102, 255, 0.02)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

      time += 0.01;
      requestAnimationFrame(animate);
    };

    animate();
  }

  startMainParticleSystem() {
    // Create floating particles for main background
    this.floatingParticles = [];

    for (let i = 0; i < 50; i++) {
      this.floatingParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 1 + Math.random() * 3,
        speed: 0.2 + Math.random() * 0.3,
        color: this.getRandomColor(),
        offset: Math.random() * Math.PI * 2,
      });
    }

    this.animateFloatingParticles();
  }

  animateFloatingParticles() {
    const ctx = this.mainCanvas.getContext("2d");

    setInterval(() => {
      ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

      this.floatingParticles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += Math.sin(Date.now() * 0.001 + particle.offset) * 0.3;

        if (particle.y < -10) {
          particle.y = window.innerHeight + 10;
          particle.x = Math.random() * window.innerWidth;
        }

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }, 1000 / 60);
  }

  entranceAnimation() {
    // Animate entrance of main content
    const sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(50px)";

      setTimeout(() => {
        section.style.transition = "all 1s cubic-bezier(0.22, 1, 0.36, 1)";
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }, 300 * index + 500);
    });

    // Animate navbar
    const navbar = document.querySelector(".navbar");
    navbar.style.opacity = "0";
    navbar.style.transform = "translateY(-50px)";

    setTimeout(() => {
      navbar.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
      navbar.style.opacity = "1";
      navbar.style.transform = "translateY(0)";
    }, 800);
  }
}

// ==================== MAIN GAME ENGINE ====================
class GameEngine {
  constructor() {
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.createCanvas();
    this.bindEvents();
    this.createInitialParticles();
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "game-engine-canvas";
    this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.createMouseTrail();
    });

    document.addEventListener("click", (e) => {
      this.createClickEffect(e.clientX, e.clientY);
    });

    // Device motion for mobile
    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", (e) => {
        if (e.accelerationIncludingGravity) {
          this.createMotionParticles(e.accelerationIncludingGravity);
        }
      });
    }
  }

  createInitialParticles() {
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: this.getRandomColor(),
        alpha: Math.random() * 0.5 + 0.1,
        connection: [],
      });
    }
  }

  getRandomColor() {
    const colors = [
      "#FF3366",
      "#33FFCC",
      "#FFCC00",
      "#9966FF",
      "#FF6699",
      "#66FF33",
      "#FF9900",
      "#33CCFF",
      "#FF6633",
      "#CC33FF",
      "#33FF66",
      "#FF33CC",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createMouseTrail() {
    // Add particles to mouse trail
    for (let i = 0; i < 2; i++) {
      this.particles.push({
        x: this.mouse.x + (Math.random() - 0.5) * 20,
        y: this.mouse.y + (Math.random() - 0.5) * 20,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: this.getRandomColor(),
        alpha: 0.7,
        life: 1,
        decay: 0.02,
      });
    }
  }

  createClickEffect(x, y) {
    // Create explosion effect on click
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const speed = 2 + Math.random() * 4;

      this.particles.push({
        x,
        y,
        size: Math.random() * 4 + 2,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        color: this.getRandomColor(),
        alpha: 1,
        life: 1,
        decay: 0.02 + Math.random() * 0.03,
      });
    }
  }

  createMotionParticles(acceleration) {
    if (!acceleration) return;

    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: acceleration.x * 0.1 || 0,
        speedY: acceleration.y * 0.1 || 0,
        color: this.getRandomColor(),
        alpha: 0.3,
        life: 1,
        decay: 0.01,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Apply decay if exists
      if (particle.life) {
        particle.life -= particle.decay;
        particle.alpha = particle.life;

        if (particle.life <= 0) {
          this.particles.splice(index, 1);
          return;
        }
      }

      // Bounce off walls
      if (particle.x < 0 || particle.x > this.canvas.width)
        particle.speedX *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height)
        particle.speedY *= -1;

      // Draw particle
      this.ctx.globalAlpha = particle.alpha;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Add glow
      this.ctx.shadowColor = particle.color;
      this.ctx.shadowBlur = particle.size * 3;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
      this.ctx.globalAlpha = 1;
    });

    // Draw connections between particles
    this.drawConnections();

    // Draw mouse attraction effect
    this.drawMouseAttraction();

    requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    const maxDistance = 150;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }

  drawMouseAttraction() {
    // Create attractive force around mouse
    this.particles.forEach((particle) => {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        particle.speedX += (dx / distance) * force * 0.1;
        particle.speedY += (dy / distance) * force * 0.1;
      }
    });
  }
}

// ==================== INTERACTIVE UI COMPONENTS ====================
class InteractiveUI {
  constructor() {
    this.init();
  }

  init() {
    this.createFloatingElements();
    this.createHoverEffects();
    this.createScrollEffects();
    this.createInteractiveCards();
    this.createAchievementSystem();
  }

  createFloatingElements() {
    // Create floating UI elements
    const floatingContainer = document.createElement("div");
    floatingContainer.className = "floating-ui-elements";
    floatingContainer.innerHTML = `
            <div class="floating-element data-cube" data-speed="0.1">
                <div class="cube-face"></div>
                <div class="cube-face"></div>
                <div class="cube-face"></div>
                <div class="cube-face"></div>
                <div class="cube-face"></div>
                <div class="cube-face"></div>
            </div>
            <div class="floating-element binary-string" data-speed="0.2">
                01100100 01100001 01110100 01100001 00100000 01100101 01101110 01100111 01101001 01101110 01100101 01100101 01110010
            </div>
            <div class="floating-element code-window" data-speed="0.15">
                <div class="code-line"></div>
                <div class="code-line"></div>
                <div class="code-line"></div>
                <div class="code-cursor"></div>
            </div>
        `;

    document.body.appendChild(floatingContainer);
    this.animateFloatingElements();
  }

  animateFloatingElements() {
    const elements = document.querySelectorAll(".floating-element");
    let scrollY = 0;

    document.addEventListener("scroll", () => {
      scrollY = window.scrollY;

      elements.forEach((element) => {
        const speed = element.dataset.speed || 0.1;
        const yPos = scrollY * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  createHoverEffects() {
    // Add special hover effects to all interactive elements
    const hoverElements = document.querySelectorAll(
      "a, button, .project-card, .skill-item"
    );

    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", (e) => {
        this.createRippleEffect(e);
        this.playHoverSound();
      });

      element.addEventListener("click", (e) => {
        this.createClickRipple(e);
        this.playClickSound();
      });
    });
  }

  createRippleEffect(event) {
    const ripple = document.createElement("div");
    ripple.className = "ripple-effect";

    const rect = event.currentTarget.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    event.currentTarget.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  createClickRipple(event) {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.createRippleEffect(event);
      }, i * 100);
    }
  }

  playHoverSound() {
    // Create subtle hover sound
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 523.25;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.05,
      audioContext.currentTime + 0.01
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  playClickSound() {
    // Create click sound
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 659.25;
    oscillator.type = "square";

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.05
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  }

  createScrollEffects() {
    // Parallax and scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          this.triggerSectionAnimation(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });
  }

  triggerSectionAnimation(section) {
    // Add special animations for each section
    const animations = {
      hero: this.animateHeroSection.bind(this),
      projects: this.animateProjectsSection.bind(this),
      achievements: this.animateAchievementsSection.bind(this),
    };

    const sectionId = section.id;
    if (animations[sectionId]) {
      animations[sectionId](section);
    }
  }

  animateHeroSection(section) {
    const title = section.querySelector(".hero-title");
    const letters = title.textContent.split("");

    title.textContent = "";
    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${index * 0.05}s`;
      span.className = "letter-animate";
      title.appendChild(span);
    });
  }

  createInteractiveCards() {
    // Make project cards interactive
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;

        card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    scale3d(1.05, 1.05, 1.05)
                `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      });
    });
  }

  createAchievementSystem() {
    // Gamified achievement system
    this.achievements = [
      {
        id: "first_visit",
        name: "First Contact",
        desc: "Visited the portfolio",
        earned: false,
      },
      {
        id: "scroll_explorer",
        name: "Scroll Explorer",
        desc: "Scrolled through entire site",
        earned: false,
      },
      {
        id: "project_viewer",
        name: "Project Inspector",
        desc: "Viewed all projects",
        earned: false,
      },
      {
        id: "click_master",
        name: "Click Master",
        desc: "Clicked 50+ elements",
        earned: false,
      },
      {
        id: "time_traveler",
        name: "Time Traveler",
        desc: "Spent 5+ minutes exploring",
        earned: false,
      },
    ];

    this.setupAchievementTracking();
  }

  setupAchievementTracking() {
    let clickCount = 0;
    let startTime = Date.now();
    let projectsViewed = new Set();

    // Track clicks
    document.addEventListener("click", () => {
      clickCount++;
      if (clickCount >= 50) {
        this.unlockAchievement("click_master");
      }
    });

    // Track scroll
    let hasScrolledToBottom = false;
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (!hasScrolledToBottom) {
          hasScrolledToBottom = true;
          this.unlockAchievement("scroll_explorer");
        }
      }
    });

    // Track time
    setInterval(() => {
      const timeSpent = (Date.now() - startTime) / 1000 / 60;
      if (timeSpent >= 5) {
        this.unlockAchievement("time_traveler");
      }
    }, 60000);

    // Unlock first visit
    this.unlockAchievement("first_visit");
  }

  unlockAchievement(achievementId) {
    const achievement = this.achievements.find((a) => a.id === achievementId);

    if (achievement && !achievement.earned) {
      achievement.earned = true;
      this.showAchievementNotification(achievement);
    }
  }

  showAchievementNotification(achievement) {
    const notification = document.createElement("div");
    notification.className = "achievement-notification";
    notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-title">Achievement Unlocked!</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            </div>
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add("show"), 100);

    // Remove after delay
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }
}

// ==================== MAIN INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize loading system
  const loadingSystem = new GameLoadingSystem();

  // Initialize game engine when loading is complete
  setTimeout(() => {
    const gameEngine = new GameEngine();
    const interactiveUI = new InteractiveUI();
  }, 100);

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Secret commands
    switch (e.key) {
      case "p":
        // Toggle particle density
        gameEngine.particles = [];
        break;
      case "d":
        // Toggle debug mode
        document.body.classList.toggle("debug-mode");
        break;
      case " ":
        // Create explosion at center
        gameEngine.createClickEffect(
          window.innerWidth / 2,
          window.innerHeight / 2
        );
        break;
    }
  });
});
