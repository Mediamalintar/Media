const boxes = document.querySelectorAll(".box");

const observer = new IntersectionObserver((entries)=> {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

boxes.forEach(box => observer.observe(box));

document.querySelectorAll(".faq-item").forEach(item => {
  const summary = item.querySelector("summary");

  summary.addEventListener("click",
    (e) => {
      e.preventDefault();

      if (item.open) {
        item.style.height = item.offsetHeight + "px";

        requestAnimationFrame(() => {
          item.style.transition = "height .35s ease";
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
          item.style.transition = "height .35s ease";
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

const loader = document.getElementById("loader");
const bar = document.querySelector(".progress-bar");
const percent = document.getElementById("percent");

// Jika sudah ada tanda pernah berkunjung, hapus elemen loader dari DOM
if (sessionStorage.getItem("hasVisited")) {
  if (loader) {
    loader.remove();
  }
} else {
  // Jika belum, jalankan animasi seperti biasa
  let value = 0;

  const loading = setInterval(() => {
    value++;

    if (bar) bar.style.width = value + "%";
    if (percent) percent.innerHTML = value + "%";

    if (value >= 100) {
      clearInterval(loading);

      // Simpan status bahwa halaman sudah pernah dibuka
      sessionStorage.setItem("hasVisited", "true");

      loader.style.transition = ".7s";
      loader.style.transform = "translateY(-100%)";
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.remove();
      }, 700);
    }
  }, 20);
}


function handleEmailContact() {
  const email = "multimediamankotablitar@gmail.com";
  const btnText = document.getElementById("email-btn-text");

  // Deteksi apakah pengguna membuka dari Perangkat Seluler (HP/Tablet)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Di HP: Buka aplikasi email bawaan secara langsung
    window.location.href = "mailto:" + email;
  } else {
    // Di Laptop/Desktop: Salin email ke clipboard & beri respon visual
    navigator.clipboard.writeText(email).then(() => {
      btnText.innerText = "Email Tersalin!";
      setTimeout(() => {
        btnText.innerText = "Email Kami";
      }, 2000);
    }).catch(() => {
      // Cadangan jika clipboard diblokir browser
      prompt("Salin alamat email berikut:", email);
    });
  }
}
// Animasi Menghitung Angka (Counter)
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function startCounting() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1500; // Durasi animasi dalam milidetik (1.5 detik)
    const stepTime = 30;   // Kecepatan pembaruan angka
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.innerText = target + "+";
        clearInterval(timer);
      } else {
        counter.innerText = Math.ceil(current) + "+";
      }
    }, stepTime);
  });
}

// Menjalankan animasi angka HANYA saat bagian tersebut terlihat di layar
const statsSection = document.querySelector('.counter')?.closest('.box');

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterStarted) {
        counterStarted = true; // Mencegah animasi terulang berulang kali
        startCounting();
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}

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

