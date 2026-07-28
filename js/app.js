/**
 * Convite de Aniversário - Júlia 17 Anos
 * Lógica do site: Contagem regressiva, Scroll Reveal e Ícones
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa os ícones do Lucide
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
  
  setupCountdown();
  setupScrollReveal();
  setupSmoothScroll();
});

/**
 * Contagem Regressiva para 07 de Agosto de 2026 às 15:00 (America/Sao_Paulo / UTC-3)
 */
function setupCountdown() {
  // Data alvo com offset de fuso horário de Brasília (UTC-3)
  const targetDate = new Date("2026-08-07T15:00:00-03:00").getTime();
  
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  
  const updateTimer = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    if (difference <= 0) {
      clearInterval(timerInterval);
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      
      // Opcional: Alterar o título da contagem regressiva quando o evento começar
      const countdownTitle = document.querySelector(".countdown-title");
      if (countdownTitle) {
        countdownTitle.textContent = "O passeio de barco começou! 🛥️💙";
      }
      return;
    }
    
    // Cálculos de tempo
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Atualiza a tela com preenchimento de zeros à esquerda (01, 02, etc)
    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  };
  
  // Executa uma vez imediatamente para evitar atraso de 1s na tela
  updateTimer();
  
  // Executa a cada segundo
  const timerInterval = setInterval(updateTimer, 1000);
}

/**
 * Cria a animação de revelação ao rolar a página (Scroll Reveal)
 */
function setupScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(el => el.classList.add("active"));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Lida com o scroll suave ao clicar em links âncoras locais
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}
