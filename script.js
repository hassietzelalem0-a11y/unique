/* =========================================================================
   🌌 CONFIGURED FOR UNIQUE
   ========================================================================= */
const COSMIC_CONFIG = {
  nickname: "Unique",
  authorName: "Hassiet",
  originDate: "August 8, 2026 12:00:00",
  birthdayDate: "September 11",
  locationName: "Addis Ababa, Ethiopia",

  reasons: [
    { label: "Your kindness ✦", secret: "You have an unusually genuine, humble heart." },
    { label: "Your sweetness ✦", secret: "Sometimes you make it practically impossible not to smile. 😭" },
    { label: "Your humor & ease ✦", secret: "Conversations with you feel as natural as breathing." },
    { label: "Your uniqueness ✦", secret: "There really is nobody built quite like you." },
    { label: "And… 👀 ✦", secret: "I just genuinely really love having you in my everyday life." }
  ],

  evasiveBanter: [
    "Round 1: Unique, nice try... but that button is strictly for decoration 😭",
    "Round 2: You really thought I’d let you click that after building a whole galaxy? 👀",
    "Round 3: Button trajectory recalculating... good luck catching it on mobile! 😂",
    "Round 4: Even Thanos couldn't snap away your only real choice 🦸‍♂️",
    "Final Round: Look at that, the button ran away entirely. Only one choice left 😌🤍"
  ]
};

/* Chapter History Stack for Back Navigation */
let navigationHistory = [1];

/* =========================================================================
   INITIALIZATION
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initEntranceExperience();
  initAddisAbabaSky();
  buildReasons();
  initEvasiveNo();
  initAudioPlayer();
  initDedicatedVoiceNotePlayer();
  initHeartbeatSensor();
  initTimeElapsedCounter();
  initAdeyPetals();
  updateBackButton();
});

/* =========================================================================
   ENTRANCE OVERLAY & MIDNIGHT TOAST
   ========================================================================= */
function initEntranceExperience() {
  const splash = document.getElementById("entranceSplash");
  const toast = document.getElementById("midnightToast");

  // Automatically fade out ambient splash after 2.8 seconds
  setTimeout(() => {
    if (splash) splash.classList.add("fade-out");

    // Display midnight broadcast toast shortly after
    setTimeout(() => {
      if (toast) {
        toast.classList.add("active");
        setTimeout(() => toast.classList.remove("active"), 5000);
      }
    }, 600);
  }, 4000);
}




// Failsafe copy method for older mobile WebViews
function execCommandFallback(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  tempInput.style.position = "fixed";
  tempInput.style.opacity = "0";
  document.body.appendChild(tempInput);
  tempInput.focus();
  tempInput.select();

  try {
    document.execCommand("copy");
    showActionToast("Saved to your orbit. Happy Birthday, Unique! 🤍");
  } catch (e) {
    showActionToast("Link: " + window.location.href);
  }

  document.body.removeChild(tempInput);
}

/* =========================================================================
   UNIVERSAL CHAPTER NAVIGATION & BACK BUTTON LOGIC
   ========================================================================= */
function goToChapter(chapterId) {
  triggerShootingStar();

  const current = document.querySelector(".chapter.active");
  const nextTargetId = typeof chapterId === 'number' ? `chapter-${chapterId}` : `chapter-${chapterId}`;
  const next = document.getElementById(nextTargetId);

  if (current && next) {
    current.style.opacity = "0";
    setTimeout(() => {
      current.classList.remove("active");
      next.classList.add("active");
      
      navigationHistory.push(chapterId);
      updateBackButton();

      setTimeout(() => {
        next.style.opacity = "1";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 30);
    }, 450);
  }
}

function goBackChapter() {
  if (navigationHistory.length <= 1) return;

  navigationHistory.pop();
  const prevChapterId = navigationHistory[navigationHistory.length - 1];

  const current = document.querySelector(".chapter.active");
  const prevTargetId = typeof prevChapterId === 'number' ? `chapter-${prevChapterId}` : `chapter-${prevChapterId}`;
  const prev = document.getElementById(prevTargetId);

  if (current && prev) {
    current.style.opacity = "0";
    setTimeout(() => {
      current.classList.remove("active");
      prev.classList.add("active");
      updateBackButton();

      setTimeout(() => {
        prev.style.opacity = "1";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 30);
    }, 400);
  }
}

function updateBackButton() {
  const backBtn = document.getElementById("universalBackBtn");
  if (!backBtn) return;
  if (navigationHistory.length > 1) {
    backBtn.classList.remove("hidden");
  } else {
    backBtn.classList.add("hidden");
  }
}

/* =========================================================================
   ZOOMABLE & PANNABLE STARGAZE SKY MODE (MOBILE 2-FINGER PINCH + PC WHEEL)
   ========================================================================= */
let isStargazing = false;
let skyScale = 1;
let skyPanX = 0;
let skyPanY = 0;
let isDragging = false;
let startX, startY;
let lastTap = 0;
let initialPinchDistance = null;
let startScale = 1;

function toggleStargazeMode() {
  isStargazing = !isStargazing;
  if (isStargazing) {
    document.body.classList.add("stargaze-active");
    skyScale = 1.15;
  } else {
    document.body.classList.remove("stargaze-active");
    skyScale = 1;
    skyPanX = 0;
    skyPanY = 0;
  }
}

const canvasEl = document.getElementById("universeCanvas");

canvasEl.addEventListener("wheel", (e) => {
  if (!isStargazing) return;
  e.preventDefault();
  const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
  skyScale = Math.min(Math.max(0.8, skyScale * zoomFactor), 3.5);
}, { passive: false });

canvasEl.addEventListener("touchstart", (e) => {
  if (!isStargazing) return;

  if (e.touches.length === 1) {
    const now = new Date().getTime();
    const timesince = now - lastTap;
    if (timesince < 300 && timesince > 0) {
      toggleStargazeMode();
      return;
    }
    lastTap = now;

    isDragging = true;
    startX = e.touches[0].clientX - skyPanX;
    startY = e.touches[0].clientY - skyPanY;
  } else if (e.touches.length === 2) {
    isDragging = false;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    initialPinchDistance = Math.hypot(dx, dy);
    startScale = skyScale;
  }
}, { passive: false });

canvasEl.addEventListener("touchmove", (e) => {
  if (!isStargazing) return;
  e.preventDefault();

  if (e.touches.length === 1 && isDragging) {
    skyPanX = e.touches[0].clientX - startX;
    skyPanY = e.touches[0].clientY - startY;
  } else if (e.touches.length === 2 && initialPinchDistance) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const currentDistance = Math.hypot(dx, dy);
    const pinchFactor = currentDistance / initialPinchDistance;
    skyScale = Math.min(Math.max(0.8, startScale * pinchFactor), 3.5);
  }
}, { passive: false });

canvasEl.addEventListener("touchend", (e) => {
  if (e.touches.length < 2) {
    initialPinchDistance = null;
  }
  if (e.touches.length === 0) {
    isDragging = false;
  }
});

/* =========================================================================
   TOUCH HEARTBEAT HOLD (CHAPTER 2)
   ========================================================================= */
function initHeartbeatSensor() {
  const sensor = document.getElementById("heartbeatBtn");
  const label = document.getElementById("hbLabel");
  const secret = document.getElementById("hbSecret");
  if (!sensor) return;

  let holdTimer = null;
  let vibrateInterval = null;

  function startHold(e) {
    if (e) e.preventDefault();
    sensor.classList.add("holding");
    label.textContent = "Keep holding… feeling the cosmos… 🫀";

    if ("vibrate" in navigator) {
      navigator.vibrate([40, 80, 40]);
      vibrateInterval = setInterval(() => {
        navigator.vibrate([40, 70, 40]);
      }, 700);
    }

    holdTimer = setTimeout(() => {
      sensor.classList.remove("holding");
      clearInterval(vibrateInterval);
      label.classList.add("hidden");
      secret.classList.remove("hidden");
      triggerStardustBurst(window.innerWidth / 2, window.innerHeight / 2);
    }, 2800);
  }

  function cancelHold() {
    clearTimeout(holdTimer);
    clearInterval(vibrateInterval);
    sensor.classList.remove("holding");
    if (secret.classList.contains("hidden")) {
      label.textContent = "Hold thumb here for 3 seconds";
    }
  }

  sensor.addEventListener("pointerdown", startHold);
  sensor.addEventListener("pointerup", cancelHold);
  sensor.addEventListener("pointerleave", cancelHold);
}

/* =========================================================================
   LIVE TIME COUNTER SINCE AUGUST 8 (CHAPTER 3)
   ========================================================================= */
function initTimeElapsedCounter() {
  const counterEl = document.getElementById("liveElapsedCounter");
  if (!counterEl) return;

  const originTime = new Date(COSMIC_CONFIG.originDate).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = now - originTime;

    if (diff <= 0) {
      counterEl.textContent = "August 8 • The moment it all began";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    counterEl.textContent = `${days}d • ${hours}h • ${minutes}m • ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}

/* =========================================================================
   MARVEL CONFESSION PROOF (CHAPTER 3)
   ========================================================================= */
function unlockDossier() {
  const front = document.getElementById("capsuleFront");
  const back = document.getElementById("capsuleBack");
  front.classList.add("hidden");
  back.classList.remove("hidden");
  triggerShootingStar();
}

/* =========================================================================
   DRIFTING ADEY ABEBA PETALS (ENKUTATASH)
   ========================================================================= */
function initAdeyPetals() {
  const holder = document.getElementById("petalsHolder");
  if (!holder) return;

  setInterval(() => {
    const activeCh = document.querySelector(".chapter.active");
    if (!activeCh || (activeCh.id !== "chapter-6" && activeCh.id !== "chapter-voice" && activeCh.id !== "chapter-7")) return;

    const petal = document.createElement("div");
    petal.className = "adey-petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${Math.random() * 4 + 6}s`;
    petal.style.transform = `scale(${Math.random() * 0.6 + 0.7})`;
    holder.appendChild(petal);

    setTimeout(() => petal.remove(), 9000);
  }, 900);
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
   BACKGROUND AUDIO SYSTEM ("Sure Thing" - song.mp3)
   ========================================================================= */
let isAudioPlaying = false;
let audioInstance = null;

function initAudioPlayer() {
  audioInstance = document.getElementById("cosmicAudio");
  const widget = document.getElementById("musicWidget");
  if (widget) {
    widget.addEventListener("click", toggleAudioPlayback);
  }
}

function toggleAudioPlayback() {
  if (!audioInstance) audioInstance = document.getElementById("cosmicAudio");
  if (!audioInstance) return;

  const widget = document.getElementById("musicWidget");
  const vinyl = document.getElementById("vinylCore");
  const triggerBtn = document.getElementById("playTrigger");
  const caption = document.getElementById("audioCaption");

  if (!isAudioPlaying) {
    if (audioInstance.readyState === 0) {
      audioInstance.load();
    }
    
    audioInstance.play().then(() => {
      isAudioPlaying = true;
      if (widget) widget.classList.add("playing");
      if (caption) caption.textContent = "Sure Thing";
      if (vinyl) vinyl.classList.add("spinning");
      if (triggerBtn) triggerBtn.textContent = "Pause Song";
    }).catch(err => {
      console.error("Audio playback error:", err);
    });
  } else {
    audioInstance.pause();
    isAudioPlaying = false;
    if (widget) widget.classList.remove("playing");
    if (caption) caption.textContent = "Play Song";
    if (vinyl) vinyl.classList.remove("spinning");
    if (triggerBtn) triggerBtn.textContent = "Play Song";
  }
}

/* =========================================================================
   DEDICATED VOICE NOTE SYSTEM (voicenote.mp3)
   ========================================================================= */
let isDedicatedVoicePlaying = false;
let dedicatedVoice = null;

function initDedicatedVoiceNotePlayer() {
  dedicatedVoice = document.getElementById("voiceNoteAudio");
  if (!dedicatedVoice) return;

  dedicatedVoice.addEventListener("timeupdate", () => {
    const cur = Math.floor(dedicatedVoice.currentTime);
    const total = Math.floor(dedicatedVoice.duration) || 0;
    const progressEl = document.getElementById("voiceProgress");
    if (progressEl) {
      const min = Math.floor(cur / 60);
      const sec = (cur % 60).toString().padStart(2, "0");
      progressEl.textContent = `${min}:${sec} / Playing Hassiet's voice...`;
    }
  });

  dedicatedVoice.addEventListener("ended", () => {
    isDedicatedVoicePlaying = false;
    const card = document.querySelector(".voice-card-standout");
    const btn = document.getElementById("standaloneVoiceBtn");
    const proceed = document.getElementById("proceedToWishBtn");

    if (card) card.classList.remove("playing");
    if (btn) btn.textContent = "Replay Voice Note";
    if (proceed) proceed.classList.remove("hidden");

    if (audioInstance && isAudioPlaying) {
      audioInstance.volume = 1.0;
    }
  });
}

function toggleDedicatedVoiceNote() {
  if (!dedicatedVoice) dedicatedVoice = document.getElementById("voiceNoteAudio");
  if (!dedicatedVoice) return;

  const card = document.querySelector(".voice-card-standout");
  const btn = document.getElementById("standaloneVoiceBtn");
  const proceed = document.getElementById("proceedToWishBtn");

  if (!isDedicatedVoicePlaying) {
    if (dedicatedVoice.readyState === 0) {
      dedicatedVoice.load();
    }

    if (audioInstance && isAudioPlaying) {
      audioInstance.volume = 0.2;
    }

    dedicatedVoice.play().then(() => {
      isDedicatedVoicePlaying = true;
      if (card) card.classList.add("playing");
      if (btn) btn.textContent = "Pause";
      if (proceed) proceed.classList.remove("hidden");
    }).catch(err => {
      console.error("Voice note error:", err);
    });
  } else {
    dedicatedVoice.pause();
    isDedicatedVoicePlaying = false;
    if (card) card.classList.remove("playing");
    if (btn) btn.textContent = "Resume Voice Note";

    if (audioInstance && isAudioPlaying) {
      audioInstance.volume = 1.0;
    }
  }
}

/* =========================================================================
   CHAPTER 5: 5-STAGE EVASIVE "NO" BUTTON
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

function handleYesVictory() {
  triggerStardustBurst(window.innerWidth / 2, window.innerHeight / 2);
  const dialogue = document.getElementById("evasionDialogue");
  dialogue.textContent = "I knew it. Not even a doubt in my mind. 😌🤍";
  
  setTimeout(() => {
    document.getElementById("kissOverlay").classList.add("active");
  }, 900);
}

/* =========================================================================
   FULL-SCREEN DIGITAL KISS BURST
   ========================================================================= */
function plantFullscreenKisses() {
  if ("vibrate" in navigator) navigator.vibrate([50, 40, 50, 40, 80]);

  for (let i = 0; i < 18; i++) {
    const kiss = document.createElement("div");
    kiss.className = "screen-kiss-stamp";
    kiss.textContent = "💋";
    kiss.style.left = `${Math.random() * 85 + 5}vw`;
    kiss.style.top = `${Math.random() * 80 + 10}vh`;
    kiss.style.setProperty("--rot", `${(Math.random() - 0.5) * 60}deg`);
    document.body.appendChild(kiss);

    setTimeout(() => kiss.remove(), 1900);
  }

  const mark = document.querySelector(".interactive-kiss-mark");
  mark.style.transform = "scale(1.8) rotate(-12deg)";
  setTimeout(() => { mark.style.transform = "scale(1)"; }, 300);
}

function finishKissAndOpenLetter() {
  document.getElementById("kissOverlay").classList.remove("active");
  goToChapter(6);
}

/* =========================================================================
   CHAPTER 7: INTERACTIVE WISH INPUT & LAUNCH
   ========================================================================= */
function launchCustomWish() {
  const input = document.getElementById("userWishInput");
  const wishText = input.value.trim();
  
  triggerShootingStar();
  triggerStardustBurst(window.innerWidth / 2, window.innerHeight / 2);

  const container = document.getElementById("wishInputContainer");
  container.style.opacity = "0";
  setTimeout(() => { container.classList.add("hidden"); }, 400);

  const blessing = document.getElementById("blessingSection");
  const ack = document.getElementById("wishAcknowledgment");
  
  if (wishText.length > 0) {
    ack.innerHTML = `Your wish: <em>"${wishText}"</em> has been recorded somewhere out there in the cosmos.<br>I hope it includes me. 👀🤍`;
  }
  
  blessing.classList.remove("hidden");
  blessing.style.opacity = "1";
}

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
   CANVAS: ADDIS ABABA (LAT 9.0° N) NIGHT SKY WITH ZOOM & PAN
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
      len: Math.random() * 110 + 70,
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

    ctx.save();
    ctx.translate(w / 2 + skyPanX, h / 2 + skyPanY);
    ctx.scale(skyScale, skyScale);
    ctx.translate(-w / 2, -h / 2);

    bgStars.forEach(s => {
      s.twinkle += s.speed;
      const a = s.alpha + Math.sin(s.twinkle) * 0.25;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.08, Math.min(1, a))})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

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

    ctx.restore();

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