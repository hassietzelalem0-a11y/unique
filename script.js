/* =========================================================================
   🌌 CONFIGURED FOR UNIQUE
   ========================================================================= */
const COSMIC_CONFIG = {
  nickname: "Unique",
  authorName: "Hassiet",
  originDate: "august 9, 2026",
  birthdayDate: "september 11",
  locationName: "Addis Ababa, Ethiopia",

  // Audio track configured for "Sure Thing - Miguel" in audio/song.mp3
  audioTitle: "Sure Thing",
  audioArtist: "Miguel",
  audioSrc: "audio/song.mp3",

  // Fragment 03: Things I like about you
  reasons: [
    { label: "Your kindness ✦", secret: "You have an unusually genuine, humble heart." },
    { label: "Your sweetness ✦", secret: "Sometimes you make it practically impossible not to smile. 😭" },
    { label: "Your humor & ease ✦", secret: "Conversations with you feel as natural as breathing." },
    { label: "Your uniqueness ✦", secret: "There really is nobody built quite like you." },
    { label: "And… 👀 ✦", secret: "I just genuinely really love having you in my everyday life." }
  ],

  // 5 Funny Progressive dialogue lines for the evasive "NO" button
  evasiveBanter: [
    "Round 1: Unique, nice try... but that button is strictly for decoration 😭",
    "Round 2: You really thought I’d let you click that after building a whole galaxy? 👀",
    "Round 3: Button trajectory recalculating... good luck catching it on mobile! 😂",
    "Round 4: Even Doctor Strange couldn't find a universe where you click NO 🦸‍♂️",
    "Final Round: Look at that, the button ran away entirely. Only one choice left 😌🤍"
  ]
};

/* =========================================================================
   INITIALIZATION
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initAddisAbabaSky();
  buildReasons();
  initEvasiveNo();
  initAudioPlayer();
  initStargazeMode();
});

/* =========================================================================
   PURE STARGAZING MODE (VIEW THE SKY ALONE WITHOUT TEXT)
   ========================================================================= */
let isStargazing = false;

function toggleStargazeMode() {
  isStargazing = !isStargazing;
  if (isStargazing) {
    document.body.classList.add("stargaze-active");
  } else {
    document.body.classList.remove("stargaze-active");
  }
}

function initStargazeMode() {
  const canvas = document.getElementById("universeCanvas");
  // Tapping the canvas while in pure mode returns to the app
  canvas.addEventListener("pointerdown", () => {
    if (isStargazing) {
      toggleStargazeMode();
    }
  });
}

/* =========================================================================
   CHAPTER NAVIGATION
   ========================================================================= */
function goToChapter(chapterNum) {
  triggerShootingStar();

  const current = document.querySelector(".chapter.active");
  const next = document.getElementById(`chapter-${chapterNum}`);

  if (current) {
    current.style.opacity = "0";
    setTimeout(() => {
      current.classList.remove("active");
      if (next) {
        next.classList.add("active");
        setTimeout(() => {
          next.style.opacity = "1";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 30);
      }
    }, 450);
  }
}

/* =========================================================================
   MARVEL DOSSIER DECRYPT (CHAPTER 3)
   ========================================================================= */
function unlockDossier() {
  const front = document.getElementById("capsuleFront");
  const back = document.getElementById("capsuleBack");
  front.classList.add("hidden");
  back.classList.remove("hidden");
  triggerShootingStar();
}

/* =========================================================================
   SHATTER RELIC & VAULT LIGHTBOX (CHAPTER 4)
   ========================================================================= */
function shatterRelic() {
  const closed = document.getElementById("relicClosed");
  const opened = document.getElementById("relicOpened");

  triggerStardustBurst(window.innerWidth / 2, window.innerHeight / 2);

  closed.style.opacity = "0";
  setTimeout(() => {
    closed.classList.add("hidden");
    opened.classList.remove("hidden");
    opened.style.opacity = "1";
  }, 400);
}

function displayFragment(fragIndex) {
  const box = document.getElementById("cosmosLightbox");
  document.querySelectorAll(".frag-content").forEach(el => el.classList.add("hidden"));
  
  const target = document.getElementById(`frag-${fragIndex}`);
  if (target) {
    target.classList.remove("hidden");
    box.classList.add("active");
  }
}

function closeLightbox(e) {
  if (!e || e.target.id === "cosmosLightbox" || e.target.classList.contains("dismiss-btn")) {
    document.getElementById("cosmosLightbox").classList.remove("active");
  }
}

// Build Fragment 3: Tap to Reveal Stardust Cards
function buildReasons() {
  const holder = document.getElementById("revealCardsHolder");
  if (!holder) return;
  holder.innerHTML = "";

  COSMIC_CONFIG.reasons.forEach(r => {
    const card = document.createElement("div");
    card.className = "stardust-reveal-card";
    card.innerHTML = `
      <div class="stardust-cover">${r.label}</div>
      <div class="stardust-secret">${r.secret}</div>
    `;
    card.addEventListener("click", () => {
      card.classList.toggle("revealed");
      triggerShootingStar();
    });
    holder.appendChild(card);
  });
}

/* =========================================================================
   AUDIO PLAYER SYSTEM (DIRECT TO audio/song.mp3)
   ========================================================================= */
let isAudioPlaying = false;
let audioInstance = null;

function initAudioPlayer() {
  audioInstance = document.getElementById("cosmicAudio");
  if (audioInstance && COSMIC_CONFIG.audioSrc) {
    audioInstance.src = COSMIC_CONFIG.audioSrc;
  }
  const widget = document.getElementById("musicWidget");
  if (widget) {
    widget.addEventListener("click", toggleAudioPlayback);
  }
}

function toggleAudioPlayback() {
  if (!audioInstance) return;
  const widget = document.getElementById("musicWidget");
  const vinyl = document.getElementById("vinylCore");
  const triggerBtn = document.getElementById("playTrigger");
  const caption = document.getElementById("audioCaption");

  if (!isAudioPlaying) {
    audioInstance.play().then(() => {
      isAudioPlaying = true;
      widget.classList.add("playing");
      if (caption) caption.textContent = "Sure Thing";
      if (vinyl) vinyl.classList.add("spinning");
      if (triggerBtn) triggerBtn.textContent = "Pause Song";
    }).catch(err => console.log("Audio waiting for user gesture.", err));
  } else {
    audioInstance.pause();
    isAudioPlaying = false;
    widget.classList.remove("playing");
    if (caption) caption.textContent = "Play Song";
    if (vinyl) vinyl.classList.remove("spinning");
    if (triggerBtn) triggerBtn.textContent = "Play Song";
  }
}

/* =========================================================================
   CHAPTER 5: 5-STAGE EVASIVE "NO" BUTTON & REWARDS
   ========================================================================= */
let evasionStage = 0;

function initEvasiveNo() {
  const noBtn = document.getElementById("evasiveNoBtn");
  const dialogue = document.getElementById("evasionDialogue");
  if (!noBtn) return;

  function dodge(e) {
    if (e) e.preventDefault();
    evasionStage++;

    const pad = 24;
    const maxX = window.innerWidth - noBtn.offsetWidth - pad;
    const maxY = window.innerHeight - noBtn.offsetHeight - pad;

    const targetX = Math.max(pad, Math.floor(Math.random() * maxX));
    const targetY = Math.max(pad, Math.floor(Math.random() * maxY));

    noBtn.style.position = "fixed";
    noBtn.style.left = `${targetX}px`;
    noBtn.style.top = `${targetY}px`;
    noBtn.style.zIndex = "99";

    // Progressive Banter
    if (evasionStage <= COSMIC_CONFIG.evasiveBanter.length) {
      dialogue.textContent = COSMIC_CONFIG.evasiveBanter[evasionStage - 1];
    }

    if (evasionStage >= 2) {
      const scaleVal = Math.max(0.65, 1 - (evasionStage * 0.08));
      noBtn.style.transform = `scale(${scaleVal})`;
    }

    if (evasionStage >= 5) {
      noBtn.style.opacity = "0";
      setTimeout(() => {
        noBtn.style.display = "none";
      }, 300);
    }
  }

  noBtn.addEventListener("mouseenter", dodge);
  noBtn.addEventListener("pointerdown", dodge);
  noBtn.addEventListener("touchstart", dodge, { passive: false });
}

// Victory triggers the Digital Kiss Popup
function handleYesVictory() {
  triggerStardustBurst(window.innerWidth / 2, window.innerHeight / 2);
  const dialogue = document.getElementById("evasionDialogue");
  dialogue.textContent = "I knew it. Not even a doubt in my mind. 😌🤍";
  
  setTimeout(() => {
    document.getElementById("kissOverlay").classList.add("active");
  }, 900);
}

// Digital Kiss Tap
function plantKiss() {
  triggerStardustBurst(window.innerWidth / 2, window.innerHeight / 2);
  const mark = document.querySelector(".interactive-kiss-mark");
  mark.style.transform = "scale(1.6) rotate(-10deg)";
  setTimeout(() => {
    mark.style.transform = "scale(1)";
  }, 300);
}

// Proceed from Kiss to Hug Popup
function openHugReward() {
  document.getElementById("kissOverlay").classList.remove("active");
  document.getElementById("hugOverlay").classList.add("active");
}

// Digital Hug Tap
function triggerWarmth() {
  triggerStardustBurst(window.innerWidth / 2, window.innerHeight / 2);
  const ring = document.querySelector(".warmth-ring");
  ring.style.animation = "none";
  void ring.offsetWidth;
  ring.style.animation = "pulseWarmth 1s 2 ease-out";
}

// Proceed from Hug to Letter
function finishRewardsAndOpenLetter() {
  document.getElementById("hugOverlay").classList.remove("active");
  goToChapter(6);
}

/* =========================================================================
   CHAPTER 7: WISH LAUNCH
   ========================================================================= */
function launchShootingStar(starEl, e) {
  starEl.classList.add("shot");
  triggerStardustBurst(e.clientX, e.clientY);

  setTimeout(() => {
    const blessing = document.getElementById("blessingSection");
    blessing.classList.remove("hidden");
    blessing.style.opacity = "1";
  }, 600);
}

/* =========================================================================
   CANVAS: ADDIS ABABA (LAT 9.0° N) NIGHT SKY MAP (SEP 10)
   ========================================================================= */
function initAddisAbabaSky() {
  const canvas = document.getElementById("universeCanvas");
  const ctx = canvas.getContext("2d");

  let w, h;
  let bgStars = [];
  let touchDust = [];
  let shootingStars = [];

  const addisSkyObjects = {
    saturn: { xRatio: 0.86, yRatio: 0.62, label: "🪐 Saturn", color: "#fde68a" },
    summerTriangle: [
      { name: "Vega (Lyra)", xR: 0.42, yR: 0.22, mag: 2.8 },
      { name: "Deneb (Cygnus)", xR: 0.58, yR: 0.18, mag: 2.5 },
      { name: "Altair (Aquila)", xR: 0.52, yR: 0.44, mag: 2.6 }
    ]
  };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    bgStars = [];
    const count = Math.min(240, Math.floor((w * h) / 3600));
    for (let i = 0; i < count; i++) {
      bgStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.012 + 0.004,
        twinkle: Math.random() * Math.PI
      });
    }
  }

  // Interactive Touch Stardust
  function addDust(x, y) {
    for (let i = 0; i < 2; i++) {
      touchDust.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: 1,
        color: Math.random() > 0.5 ? "rgba(168, 85, 247," : "rgba(254, 240, 138,"
      });
    }
  }

  window.addEventListener("pointermove", (e) => addDust(e.clientX, e.clientY));
  window.addEventListener("touchmove", (e) => {
    if (e.touches[0]) addDust(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.triggerShootingStar = function() {
    shootingStars.push({
      x: Math.random() * w * 0.7,
      y: Math.random() * h * 0.3,
      len: Math.random() * 100 + 70,
      spd: Math.random() * 9 + 14,
      ang: 36 * (Math.PI / 180),
      opacity: 1
    });
  };

  setInterval(() => {
    if (Math.random() > 0.4) window.triggerShootingStar();
  }, 4800);

  function render() {
    ctx.clearRect(0, 0, w, h);

    // 1. Render Background Sky Stars
    bgStars.forEach(s => {
      s.twinkle += s.speed;
      const a = s.alpha + Math.sin(s.twinkle) * 0.25;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.08, Math.min(1, a))})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Draw Subtle Summer Triangle Constellation Lines
    const triangle = addisSkyObjects.summerTriangle;
    ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(triangle[0].xR * w, triangle[0].yR * h);
    ctx.lineTo(triangle[1].xR * w, triangle[1].yR * h);
    ctx.lineTo(triangle[2].xR * w, triangle[2].yR * h);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Draw Summer Triangle Major Stars
    triangle.forEach(star => {
      const sx = star.xR * w;
      const sy = star.yR * h;

      const radial = ctx.createRadialGradient(sx, sy, 0, sx, sy, 14);
      radial.addColorStop(0, "rgba(254, 240, 138, 0.85)");
      radial.addColorStop(1, "rgba(254, 240, 138, 0)");
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(sx, sy, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(sx, sy, star.mag, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(203, 213, 225, 0.55)";
      ctx.font = "9px Outfit, sans-serif";
      ctx.fillText(star.name, sx + 8, sy + 3);
    });

    // 4. Draw Saturn
    const sat = addisSkyObjects.saturn;
    const satX = sat.xRatio * w;
    const satY = sat.yRatio * h;

    ctx.fillStyle = sat.color;
    ctx.beginPath();
    ctx.arc(satX, satY, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(253, 230, 138, 0.6)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(satX, satY, 7, 2.2, Math.PI / 5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "rgba(253, 230, 138, 0.7)";
    ctx.font = "9px Outfit, sans-serif";
    ctx.fillText(sat.label, satX + 10, satY + 4);

    // 5. Render Touch Stardust Trail
    for (let i = touchDust.length - 1; i >= 0; i--) {
      const p = touchDust[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.025;

      if (p.life <= 0) {
        touchDust.splice(i, 1);
        continue;
      }

      ctx.fillStyle = `${p.color} ${p.life})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 6. Render Shooting Stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      const tailX = ss.x - Math.cos(ss.ang) * ss.len;
      const tailY = ss.y - Math.sin(ss.ang) * ss.len;

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      grad.addColorStop(0, "rgba(255, 255, 255, 0)");
      grad.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.stroke();

      ss.x += Math.cos(ss.ang) * ss.spd;
      ss.y += Math.sin(ss.ang) * ss.spd;
      ss.opacity -= 0.02;

      if (ss.opacity <= 0 || ss.x > w || ss.y > h) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize);
  resize();
  render();
}

/* =========================================================================
   CELESTIAL BURST PARTICLES
   ========================================================================= */
function triggerStardustBurst(x, y) {
  const count = 35;
  const colors = ["#fef08a", "#a855f7", "#f43f5e", "#60a5fa", "#ffffff"];

  for (let i = 0; i < count; i++) {
    const flake = document.createElement("div");
    flake.style.position = "fixed";
    flake.style.left = `${x || window.innerWidth / 2}px`;
    flake.style.top = `${y || window.innerHeight / 2}px`;
    flake.style.width = "6px";
    flake.style.height = "6px";
    flake.style.borderRadius = "50%";
    flake.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    flake.style.pointerEvents = "none";
    flake.style.zIndex = "400";

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 200 + 40;
    const destX = Math.cos(angle) * dist;
    const destY = Math.sin(angle) * dist;

    flake.animate([
      { transform: "translate(0, 0) scale(1.4)", opacity: 1 },
      { transform: `translate(${destX}px, ${destY}px) scale(0.2)`, opacity: 0 }
    ], {
      duration: Math.random() * 1000 + 700,
      easing: "cubic-bezier(0.12, 0.8, 0.3, 1)"
    });

    document.body.appendChild(flake);
    setTimeout(() => flake.remove(), 1600);
  }
}