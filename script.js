document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CUENTA REGRESIVA (9 Enero 2026)
    const targetDate = new Date("January 9, 2026 00:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    }, 1000);

    // 2. MÚSICA
    let isPlaying = false;
    const audio = document.getElementById("audioPlayer");
    const musicContainer = document.querySelector(".music-float");

    window.toggleMusic = function() {
        if (isPlaying) {
            audio.pause();
            musicContainer.classList.remove("playing");
        } else {
            audio.play();
            musicContainer.classList.add("playing");
        }
        isPlaying = !isPlaying;
    };

    // 3. ANIMACIONES AL SCROLL (Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.court-card, .loc-item, .gift-block, .rsvp-block');
    
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Efecto Ease-Out suave
        observer.observe(el);
    });
});