async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    const createFallingPaw = () => {
        for (let i = 0; i < 50; i++) {
            const paw = document.createElement('div');
            paw.classList.add('falling-paw');
            paw.innerHTML = '💲';
            document.body.appendChild(paw);
            paw.style.left = Math.random() * 100 + 'vw';
            
            paw.style.animationDelay = Math.random() * 3 + 's'; 
        
            paw.style.animationDuration = Math.random() * 2 + 3 + 's';

            paw.addEventListener('animationend', () => {
                paw.remove();
            });
        }
    };

    document.getElementById("main-btn").addEventListener("click", createFallingPaw);

    const track = document.getElementById('reviews-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 320, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }

});

