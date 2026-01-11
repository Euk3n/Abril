document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CUENTA REGRESIVA
    // Fecha objetivo: 9 de Enero de 2026
    const targetDate = new Date("January 9, 2026 00:00:00").getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        
        if (distance < 0) {
            clearInterval(countdownFunction);
            
            const dEl = document.getElementById("days");
           
            if(dEl) {
                document.getElementById("days").innerText = "00";
                document.getElementById("hours").innerText = "00";
                document.getElementById("minutes").innerText = "00";
                document.getElementById("seconds").innerText = "00";
            }
            return; 
        }
        // -------------------------------------------------------------

        // Si NO ha pasado, calcula normal
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days");
        if(dEl) {
            dEl.innerText = d < 10 ? "0" + d : d;
            document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
            document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
            document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
        }
    }, 1000);

    // 2. PANTALLA DE BIENVENIDA Y MÚSICA
    const welcomeScreen = document.getElementById('welcome-screen');
    const enterBtn = document.getElementById('enter-btn');
    const audio = document.getElementById("audioPlayer");
    const musicContainer = document.querySelector(".music-float");
    let isPlaying = false;

    // Bloquear scroll al inicio para que no bajen antes de dar clic
    document.body.classList.add('no-scroll');

    // Al hacer clic en "ABRIR INVITACIÓN"
    if(enterBtn) {
        enterBtn.addEventListener('click', () => {
            // Desaparecer pantalla
            welcomeScreen.classList.add('hide-welcome');
            
            // Permitir scroll
            document.body.classList.remove('no-scroll');
            
            // Intentar iniciar música
            audio.play().then(() => {
                isPlaying = true;
                musicContainer.classList.add("playing");
            }).catch(error => {
                console.log("Audio autoplay bloqueado o no permitido");
            });
        });
    }

    // 3. BOTÓN DE MÚSICA (TOGGLE)
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

    // 4. ANIMACIONES AL SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.court-card, .loc-item, .gift-block, .rsvp-block, .g-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
});



