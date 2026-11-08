
/* =========================================
   A LITTLE LIGHT, A NEW BEGINNING
   Interactive JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // ELEMENTS
  // =====================================

  const openingScreen = document.getElementById("openingScreen");
  const mainSite = document.getElementById("mainSite");

  const diyaButton = document.getElementById("diyaButton");
  const diyaInstruction = document.getElementById("diyaInstruction");

  const progressBar = document.getElementById("progressBar");
  const backToTop = document.getElementById("backToTop");

  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const openLetterButton = document.getElementById("openLetterButton");
  const envelopeButtonText = document.getElementById("envelopeButtonText");
  const envelopeHint = document.getElementById("envelopeHint");
  const fullLetter = document.getElementById("fullLetter");

  const photoButton = document.getElementById("photoButton");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const memoryPhoto = document.getElementById("memoryPhoto");

  const soundToggle = document.getElementById("soundToggle");
  const soundIcon = document.getElementById("soundIcon");
  const soundLabel = document.getElementById("soundLabel");

  const petalContainer = document.getElementById("petalContainer");


  // =====================================
  // 1. LIGHT THE DIYA
  // =====================================

  let websiteStarted = false;

  diyaButton.addEventListener("click", () => {

    if (websiteStarted) return;

    websiteStarted = true;

    diyaButton.classList.add("lit");

    diyaInstruction.textContent =
      "A little light, a little hope...";

    // Give the flame a moment to glow
    setTimeout(() => {

      openingScreen.classList.add("leaving");

      mainSite.inert = false;
      mainSite.setAttribute("aria-hidden", "false");
      mainSite.classList.add("visible");

      // Start observing reveal elements
      initializeReveal();

      // Begin decorative petals
      startPetals();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 1100);

  });


  // =====================================
  // 2. SCROLL REVEAL
  // =====================================

  function initializeReveal() {

    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observerInstance.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  }


  // =====================================
  // 3. ENVELOPE OPENING
  // =====================================

  let letterOpened = false;

  openLetterButton.addEventListener("click", () => {

    if (!letterOpened) {

      letterOpened = true;

      envelopeWrapper.classList.add("open");

      envelopeButtonText.textContent = "Close your letter";

      envelopeHint.textContent =
        "A few sincere words, just for you.";

      openLetterButton.setAttribute("aria-expanded", "true");

      // Allow the envelope animation to begin
      setTimeout(() => {

        fullLetter.hidden = false;

        fullLetter.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 650);

    } else {

      letterOpened = false;

      fullLetter.hidden = true;

      envelopeWrapper.classList.remove("open");

      envelopeButtonText.textContent = "Open your letter";

      envelopeHint.textContent =
        "A little note, waiting to be opened.";

      openLetterButton.setAttribute("aria-expanded", "false");

      envelopeWrapper.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }

  });


  // =====================================
  // 4. PHOTO LIGHTBOX
  // =====================================

  let previousFocus = null;

  function openLightbox() {

    if (!memoryPhoto.complete || !memoryPhoto.naturalWidth) {
      return;
    }

    previousFocus = document.activeElement;

    lightboxImage.src = memoryPhoto.src;

    lightbox.hidden = false;

    document.body.classList.add("no-scroll");

    lightboxClose.focus();

  }

  function closeLightbox() {

    lightbox.hidden = true;

    lightboxImage.src = "";

    document.body.classList.remove("no-scroll");

    if (previousFocus) {
      previousFocus.focus();
    }

  }

  photoButton.addEventListener("click", openLightbox);

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  // =====================================
  // 5. KEYBOARD ACCESSIBILITY
  // =====================================

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }

  });


  // =====================================
  // 6. READING PROGRESS
  // =====================================

  function updateProgress() {

    const scrollableHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (scrollableHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }

    const scrollPosition = window.scrollY;

    const percentage =
      (scrollPosition / scrollableHeight) * 100;

    progressBar.style.width =
      Math.min(100, Math.max(0, percentage)) + "%";

  }

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });


  // =====================================
  // 7. BACK TO TOP
  // =====================================

  function updateBackToTop() {

    if (window.scrollY > 450) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  // =====================================
  // 8. DECORATIVE FALLING PETALS
  // =====================================

  let petalTimer = null;

  function createPetal() {

    const petal = document.createElement("span");

    petal.classList.add("petal");

    petal.style.left =
      Math.random() * 100 + "vw";

    const duration = 8 + Math.random() * 7;

    petal.style.animationDuration = duration + "s";

    petal.style.opacity =
      (0.2 + Math.random() * 0.35).toString();

    petal.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    petalContainer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, duration * 1000);

  }

  function startPetals() {

    if (window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches) {
      return;
    }

    if (petalTimer) return;

    petalTimer = setInterval(createPetal, 1800);

  }


  // =====================================
  // 9. OPTIONAL ORIGINAL AMBIENT TONE
  // =====================================

  let audioContext = null;
  let soundTimer = null;
  let soundEnabled = false;

  function playSoftChime(frequency, startTime) {

    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      frequency,
      startTime
    );

    gain.gain.setValueAtTime(0.0001, startTime);

    gain.gain.exponentialRampToValueAtTime(
      0.025,
      startTime + 0.08
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + 2
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 2.1);

  }

  function playChimeSequence() {

    if (!audioContext || !soundEnabled) return;

    const now = audioContext.currentTime;

    // A gentle, original two-note chime
    playSoftChime(659.25, now);
    playSoftChime(783.99, now + 0.55);

  }

  soundToggle.addEventListener("click", async () => {

    if (!soundEnabled) {

      try {

        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
          soundLabel.textContent = "NOT SUPPORTED";
          return;
        }

        if (!audioContext) {
          audioContext = new AudioContextClass();
        }

        await audioContext.resume();

        soundEnabled = true;

        soundToggle.setAttribute("aria-pressed", "true");
        soundToggle.setAttribute("aria-label", "Disable ambient sound");

        soundIcon.textContent = "♫";
        soundLabel.textContent = "SOUND ON";

        playChimeSequence();

        soundTimer = setInterval(
          playChimeSequence,
          6500
        );

      } catch (error) {

        soundLabel.textContent = "SOUND UNAVAILABLE";

      }

    } else {

      soundEnabled = false;

      clearInterval(soundTimer);
      soundTimer = null;

      if (audioContext) {
        await audioContext.suspend();
      }

      soundToggle.setAttribute("aria-pressed", "false");
      soundToggle.setAttribute("aria-label", "Enable ambient sound");

      soundIcon.textContent = "♫";
      soundLabel.textContent = "SOUND OFF";

    }

  });


  // =====================================
  // 10. SMOOTH INTERNAL NAVIGATION
  // =====================================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const destination =
        document.querySelector(link.getAttribute("href"));

      if (!destination) return;

      event.preventDefault();

      destination.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


});
