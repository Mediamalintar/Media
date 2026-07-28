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

let value = 0;

const loading = setInterval(() => {

  value++;

  bar.style.width = value + "%";
  percent.innerHTML = value + "%";

  if (value >= 100) {

    clearInterval(loading);

    loader.style.transition = ".7s";

    loader.style.transform = "translateY(-100%)";

    loader.style.opacity = "0";

    setTimeout(()=> {
      loader.remove();
    }, 700);

  }

}, 20);

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