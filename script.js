// === YOUR MESSAGES & PHOTOS (EDIT THESE!) ===
const daysData = [
  null,
  { msg: "Iubirea mea… acesta e calendarul cu 25 de zile în care îți arăt cât de mult luminezi viața mea. Ziua 1 începe acum ❤️", secret: "Tu esti primul meu gand in fiecare dimineata" },
  { msg: "De fiecare dată când zâmbești, parcă vine Crăciunul mai devreme.", secret: "Inca mai am fluturi in stomac cand ma gandesc la tine, si cand te vad" },
  { msg: "Tu esti motivul pentru care ma trezesc dimineata si pentru care traiesc, Te iubesc extrem de mult.", secret: "In bratele tale este locul unde ma simt cel mai bine" },
  { msg: "Alaturi de tine ma simt cel mai puternic, tu imi dai putere si curaj. Esti cea mai frumoasa.", secret: "Te iubesc mai mult ca orice pe lumea asta" },
  { msg: "Oricat de suparat as fii, cand te vad pe tine orice suparare trece. Esti totul meu", secret: "N-am cum sa stau suparat pe cea mai frumoasa fata, pe iubita mea perfecta" },
  { msg: "Tu esti cel mai bun lucru care s-a intamplat in viata mea. Nu vreau sa te pierd!", secret: "Chiar daca iti mai gresesc, nu vreau sa te pierd" },
  { msg: "De fiecare data cand plec, abia astept sa ma intorc inapoi langa tine.", secret: "Tot timpul stau cu gandul la tine" },
  { msg: "Iti multumesc ca esti mereu langa mine si ma sustii cum stii tu mai bine.", secret: "Te iubesc extrem de mult!" },
  { msg: "Sunt cel mai norocos baiat din lumea asta pentru ca te am pe tine.", secret: "Să mă îndrăgostesc de tine a fost cea mai bună decizie" },
  { msg: "Ma indragostesc de tine putin mai mult in fiecare zi.", secret: "Ma rog mereu pentru cat mai mult timp alaturi de tine" },
  { msg: "Tu faci chiar si cele mai reci zile de iarna sa para calde", secret: "Tu ești soarele meu personal" },
  { msg: "Imi place cum ma privesti – ma face sa ma topesc. si cum zice un om de zapada „Pentru unii oameni merită să se topească.” – Olaf", secret: "Eu ma topesc pentru tine in fiecare zii" },
  { msg: "Tu esti notificarea mea preferata, mereu.", secret: "Si, astept cu nerabdare ca aceea notificare sa apara mereu pe telefonul meu." },
  { msg: "Astept cu nerabdare sa petrecem al 3-lea craciun impreuna, fiecare an fiind din ce in ce mai frumos.", secret: "Sper sa facem asta an de an pana la finalul vietii" },
  { msg: "In fiecare an de Craciun îmi doresc acelasi lucru: mai mult timp cu tine.", secret: "Tu ești dorința mea împlinită" },
  { msg: "Nu pot sa dorm fara sa-ti spun noapte buna… si ca te iubesc.", secret: "Noapte bună, iubirea mea" },
  { msg: "Îți mulțumesc că faci fiecare zi mai frumoasă decât cea dinainte.", secret: "Tu imi luminezi sufletul si viata" },
  { msg: "Tu esti tot ce mi-am dorit vreodata de Craciun… si în fiecare zi.", secret: "Tu ești tot ce-mi trebuie" },
  { msg: "Eu + Tu + Ciocolata calda + un film = craciunul perfect.", secret: "Tu esti cea mai perfecta!" },
  { msg: "Tu esti miracolul meu de craciun, te iubesc foarte mult", secret: "Miracolele incep cu tine" },
  { msg: "Pentru Totdeauna alaturi de tine nu este destul.", secret: "Pentru totdeauna nu este destul de lung" },
  { msg: "Ce vreau de craciun? Pe tine.. in fiecare zii.", secret: "Tu esti tot ce am nevoie in fiecare zii" },
  { msg: "Iubirea ta este cel mai frumos cadou pe care l-am putut primii, si pe care il primesc zilnic.", secret: "Tu esti cel mai frumos cadou primit" },
  { msg: "Ajunul Craciunului, visez deja la toate diminetile impreuna cu tine de acum încolo.", secret: "Maine este ziua noastra magica" },
  { msg: `<strong>Craciun fericit, iubirea mea!</strong><br><br>
         Acesta poate nu a fost cel mai bun an al nostru, dar amandoi am devenit mai puternici iar anul care vine o sa fie mult mai bun<br>
         Te iubesc mai mult decat pot spune cuvintele, mai mult decat orice sarbatoare, mai mult decat orice.<br><br>
         Al tau pentru totdeauna ❤️`, 
    secret: "Tu ești minunea mea de Crăciun" }
];

// === CONFETTI ===
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#e63946', '#f4a261', '#2a9d8f', '#ffd700']
  });
  if (new Date().getMonth() === 11 && new Date().getDate() === 25) {
    setTimeout(() => confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 } }), 300);
  }
}

// === MAIN ===
document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");
  const modal = document.getElementById("modal");
  const secretNote = document.getElementById("secret-note");
  const closeBtn = document.getElementById("close-modal");
  const modalDay = document.getElementById("modal-day");
  const modalMessage = document.getElementById("modal-message");
  const modalPhotos = document.getElementById("modal-photos");

  const today = new Date();
  const currentDay = today.getMonth() === 11 ? today.getDate() : 0;
  const openedDays = JSON.parse(localStorage.getItem("advent2025") || "{}");

  // Custom cursor
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  document.addEventListener("touchmove", e => {
    const t = e.touches[0];
    cursor.style.left = t.clientX + "px";
    cursor.style.top = t.clientY + "px";
  });

  // Generate gifts
  for (let d = 1; d <= 25; d++) {
    const unlocked = d <= currentDay;
    const isOpened = openedDays[d];

    const gift = document.createElement("div");
    gift.className = `gift ${unlocked ? "" : "locked"} ${isOpened ? "opened" : ""}`;
    gift.innerHTML = `
      <div class="number">${d}</div>
      ${!unlocked ? `<div class="countdown" id="cd${d}"></div>` : ""}
    `;

    // CLICK TO OPEN — works on both new and already-opened days
    if (unlocked) {
      gift.style.cursor = "pointer";
      gift.addEventListener("click", () => openModal(d));
    }

    // === LONG PRESS + NORMAL TAP (WORKS ON MOBILE & DESKTOP) ===
    if (unlocked) {
      let longPressTimer = null;
      let isLongPress = false;
      let touchMoved = false;

      const start = (e) => {
        // Do NOT use e.preventDefault() here → it breaks tapping!
        isLongPress = false;
        touchMoved = false;

        longPressTimer = setTimeout(() => {
          if (!touchMoved) {
            isLongPress = true;
            showSecret(d);
            if (navigator.vibrate) navigator.vibrate(100);
          }
        }, 800);
      };

      const move = () => {
        touchMoved = true; // if user scrolls/drags → cancel long press
      };

      const end = () => {
        clearTimeout(longPressTimer);
      };

      const clickHandler = (e) => {
        if (!isLongPress && !touchMoved) {
          e.stopPropagation(); // prevent double-trigger
          openModal(d);
        }
      };

      // Mouse
      gift.addEventListener("mousedown", start);
      gift.addEventListener("mousemove", move);
      gift.addEventListener("mouseup", end);
      gift.addEventListener("mouseleave", end);
      gift.addEventListener("click", clickHandler);

      // Touch (mobile) — NO preventDefault!
      gift.addEventListener("touchstart", start, { passive: true });
      gift.addEventListener("touchmove", move, { passive: true });
      gift.addEventListener("touchend", end);
      gift.addEventListener("click", clickHandler);
    }

    calendar.appendChild(gift);
  }

  function updateCountdown(day) {
    const now = new Date();
    const target = new Date(now.getFullYear(), 11, day);
    if (now >= target) return;
    const diff = target - now;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
    const el = document.getElementById(`cd${day}`);
    if (el) el.textContent = days > 0 ? `${days}d ${hours}h left` : `${hours}h ${mins}m left`;
  }

  function showSecret(day) {
    const secret = daysData[day]?.secret;
    if (secret) {
      secretNote.textContent = secret;
      secretNote.classList.add("show");
      setTimeout(() => secretNote.classList.remove("show"), 3000);
    }
  }

  function openModal(day) {
    triggerConfetti();

    modalDay.innerHTML = `December ${day}${day === 25 ? " • Merry Christmas!" : ""}`;
    modalMessage.innerHTML = daysData[day]?.msg || "I love you endlessly";
    
  modalPhotos.innerHTML = "";

  if (daysData[day]?.photos?.length > 0) {
    const photos = daysData[day].photos;
    const captions = daysData[day].captions || photos.map(() => "Forever with you");

    // Create carousel container
    const carousel = document.createElement("div");
    carousel.className = "carousel";

    const inner = document.createElement("div");
    inner.className = "carousel-inner";

    // Create slides
    photos.forEach((src, i) => {
      const item = document.createElement("div");
      item.className = "carousel-item";
      
      const img = document.createElement("img");
      img.src = src;
      img.alt = captions[i] || `Memory ${i + 1}`;
      
      item.appendChild(img);
      inner.appendChild(item);
    });

    // Arrows (only if >1 photo)
    if (photos.length > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.className = "carousel-btn prev";
      prevBtn.innerHTML = "‹";
      prevBtn.onclick = () => slide(-1);

      const nextBtn = document.createElement("button");
      nextBtn.className = "carousel-btn next";
      nextBtn.innerHTML = "›";
      nextBtn.onclick = () => slide(1);

      carousel.appendChild(prevBtn);
      carousel.appendChild(nextBtn);

      // Dots
      const dots = document.createElement("div");
      dots.className = "carousel-dots";
      for (let i = 0; i < photos.length; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        if (i === 0) dot.classList.add("active");
        dot.onclick = () => goToSlide(i);
        dots.appendChild(dot);
      }
      carousel.appendChild(dots);
    }

    carousel.appendChild(inner);
    modalPhotos.appendChild(carousel);

    let currentIndex = 0;
    const total = photos.length;

    function updateDots() {
      carousel.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    function slide(direction) {
      currentIndex = (currentIndex + direction + total) % total;
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    function goToSlide(index) {
      currentIndex = index;
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    // Swipe support for mobile
    let touchStartX = 0;
    carousel.addEventListener("touchstart", e => touchStartX = e.touches[0].clientX);
    carousel.addEventListener("touchend", e => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        slide(diff > 0 ? 1 : -1);
      }
    });
  }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Mark as opened (first time only)
    if (!openedDays[day]) {
      openedDays[day] = true;
      localStorage.setItem("advent2025", JSON.stringify(openedDays));
      document.querySelectorAll(".gift")[day-1].classList.add("opened");
    }
  }

  // Close modal
  closeBtn.onclick = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };
  modal.addEventListener("click", e => e.target === modal && (modal.classList.remove("active"), document.body.style.overflow = ""));
  window.addEventListener("keydown", e => e.key === "Escape" && (modal.classList.remove("active"), document.body.style.overflow = ""));

  // Snow
  const snowContainer = document.querySelector(".snow-container");
  for (let i = 0; i < 100; i++) {
    const flake = document.createElement("div");
    flake.classList.add("snowflake");
    flake.textContent = ["❄", "❅", "❆"][Math.floor(Math.random()*3)];
    flake.style.left = Math.random()*100 + "vw";
    flake.style.animationDuration = 8 + Math.random()*12 + "s";
    flake.style.animationDelay = Math.random()*10 + "s";
    flake.style.opacity = Math.random()*0.6 + 0.4;
    flake.style.fontSize = Math.random()*14 + 10 + "px";
    snowContainer.appendChild(flake);
  }
});