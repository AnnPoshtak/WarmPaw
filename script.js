document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const bgMusic = new Audio('music.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;

    const enableMusic = () => {
        bgMusic.play().catch(() => console.log("Чекаємо взаємодії..."));
        document.removeEventListener('click', enableMusic);
        document.removeEventListener('touchstart', enableMusic);
    };
    document.addEventListener('click', enableMusic);
    document.addEventListener('touchstart', enableMusic);
    const revealOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const mainBtn = document.getElementById("main-btn");
    const createFallingPaws = () => {
        for (let i = 0; i < 30; i++) {
            const paw = document.createElement('div');
            paw.classList.add('falling-paw');
            paw.innerHTML = '💲';
            document.body.appendChild(paw);

            const startPos = Math.random() * 100;
            const duration = Math.random() * 2 + 3;
            const delay = Math.random() * 2;

            paw.style.left = `${startPos}vw`;
            paw.style.animationDuration = `${duration}s`;
            paw.style.animationDelay = `${delay}s`;

            paw.addEventListener('animationend', () => paw.remove());
        }
    };
    if (mainBtn) mainBtn.addEventListener('click', createFallingPaws);
    const track = document.getElementById('reviews-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        const cardWidth = 320;

        nextBtn.addEventListener('click', () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (track.scrollLeft >= maxScroll - 5) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        });

        prevBtn.addEventListener('click', () => {

            if (track.scrollLeft <= 5) {
                track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        });
    }
    const curtainOverlay = document.getElementById('curtain-overlay');
    const openCurtainsBtn = document.getElementById('open-curtains-btn');

    if (openCurtainsBtn && curtainOverlay) {
        openCurtainsBtn.addEventListener('click', () => {
            curtainOverlay.classList.add('opened');
            setTimeout(() => {
                curtainOverlay.classList.add('hidden');
                enableMusic();
            }, 1500);
        });
    }
});
