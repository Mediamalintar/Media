// Animasi Scroll (Intersection Observer)
const animateBoxes = document.querySelectorAll(".box-animate");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.1
});

animateBoxes.forEach(box => observer.observe(box));

// Animasi FAQ Accordion
document.querySelectorAll(".faq-item").forEach(item => {
  const summary = item.querySelector("summary");

  summary.addEventListener("click", (e) => {
    e.preventDefault();

    if (item.open) {
      item.style.height = item.offsetHeight + "px";
      requestAnimationFrame(() => {
        item.style.transition = "height .3s ease";
        item.style.height = summary.offsetHeight + "px";
      });

      item.addEventListener("transitionend", function handler() {
        item.open = false;
        item.style.height = "";
        item.style.transition = "";
        item.removeEventListener("transitionend", handler);
      });
    } else {
      item.open = true;
      const fullHeight = item.scrollHeight;
      item.style.height = summary.offsetHeight + "px";

      requestAnimationFrame(() => {
        item.style.transition = "height .3s ease";
        item.style.height = fullHeight + "px";
      });

      item.addEventListener("transitionend", function handler() {
        item.style.height = "";
        item.style.transition = "";
        item.removeEventListener("transitionend", handler);
      });
    }
  });
});

// Loader Logic
const loader = document.getElementById("loader");
const bar = document.querySelector(".progress-bar");
const percent = document.getElementById("percent");

if (sessionStorage.getItem("hasVisited")) {
  if (loader) loader.remove();
  // Paksa elemen langsung muncul jika loader di skip
  animateBoxes.forEach(box => box.classList.add("show")); 
} else {
  let value = 0;
  const loading = setInterval(() => {
    value += 2; // Dipercepat sedikit
    if (bar) bar.style.width = value + "%";
    if (percent) percent.innerHTML = value + "%";

    if (value >= 100) {
      clearInterval(loading);
      sessionStorage.setItem("hasVisited", "true");
      
      loader.style.transition = ".6s ease";
      loader.style.opacity = "0";
      
      setTimeout(() => {
        loader.remove();
        // Trigger animasi awal setelah loader selesai
        animateBoxes.forEach(box => {
          if(box.getBoundingClientRect().top < window.innerHeight) {
            box.classList.add("show");
          }
        });
      }, 600);
    }
  }, 20);
}

// Fitur Salin Email
function handleEmailContact() {
  const email = "multimediamankotablitar@gmail.com";
  const btnText = document.getElementById("email-btn-text");
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = "mailto:" + email;
  } else {
    navigator.clipboard.writeText(email).then(() => {
      btnText.innerText = "Email Tersalin!";
      setTimeout(() => {
        btnText.innerText = "Email Kami";
      }, 2000);
    }).catch(() => {
      prompt("Salin alamat email berikut:", email);
    });
  }
}

// Logika Menu Hamburger
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Auto-play video portofolio saat terlihat di layar
const portfolioVideos = document.querySelectorAll(".portfolio-video");

if (portfolioVideos.length > 0) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      
      if (entry.isIntersecting) {
        // Putar video saat elemen masuk ke dalam layar
        video.play().catch(error => {
          console.log("Autoplay dicegah browser: ", error);
        });
      } else {
        // Pause video saat di-scroll keluar dari layar
        video.pause();
      }
    });
  }, {
    threshold: 0.4 // Video diputar saat 40% bagian video terlihat di layar
  });

  portfolioVideos.forEach(video => videoObserver.observe(video));
}

// Animasi Menghitung Angka (Counter)
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function startCounting() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1500; // Durasi animasi (1.5 detik)
    const stepTime = 30;   
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.innerText = target; // Berhenti di angka target
        clearInterval(timer);
      } else {
        counter.innerText = Math.ceil(current); // Menampilkan angka yang terus naik
      }
    }, stepTime);
  });
}

// Menjalankan animasi angka HANYA saat bagian tersebut terlihat di layar
const statsSection = document.querySelector('.stats-grid');

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterStarted) {
        counterStarted = true; 
        startCounting(); // Jalankan angka
        
        // Pemicu animasi garis bergerak ke kanan
        const lines = document.querySelectorAll('.stat-line');
        lines.forEach(line => line.classList.add('active'));
      }
    });
  }, { threshold: 0.5 }); 

  statsObserver.observe(statsSection);
}