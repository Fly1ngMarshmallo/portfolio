let currentProject = 0;
let currentSlide = 0;
let carouselInterval;

function showProject(index) {
    document.querySelectorAll('.project-icon')[currentProject].classList.remove('active');
    document.querySelectorAll('.project-details')[currentProject].classList.remove('active');
    
    currentProject = index;
    document.querySelectorAll('.project-icon')[index].classList.add('active');
    document.querySelectorAll('.project-details')[index].classList.add('active');
    
    currentSlide = 0;
    updateCarousel();
    
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % 
        document.querySelectorAll(`.project-details.active .slide`).length;
        updateCarousel();
    }, 5000);
}

function updateCarousel() {
    const activeProject = document.querySelector('.project-details.active');
    activeProject.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;
    activeProject.querySelectorAll('.slide').forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
}

document.querySelectorAll('.carousel-nav').forEach(button => {
    button.addEventListener('click', (e) => {
        const isNext = e.target.classList.contains('next');
        currentSlide = isNext ? 
            (currentSlide + 1) % document.querySelectorAll(`.project-details.active .slide`).length :
            (currentSlide - 1 + document.querySelectorAll(`.project-details.active .slide`).length) % 
            document.querySelectorAll(`.project-details.active .slide`).length;
        updateCarousel();
        clearInterval(carouselInterval);
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % 
            document.querySelectorAll(`.project-details.active .slide`).length;
            updateCarousel();
        }, 5000);
    });
});

carouselInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % 
    document.querySelectorAll(`.project-details.active .slide`).length;
    updateCarousel();
}, 5000);

        // Global Scrolling
const rightContainer = document.querySelector('.right-container');
document.addEventListener('wheel', function(e) {
    if (!(rightContainer.scrollTop === 0 && e.deltaY < 0) && 
        !(rightContainer.scrollHeight - rightContainer.clientHeight <= rightContainer.scrollTop + 1 && e.deltaY > 0)) {
            e.preventDefault();
        }
        rightContainer.scrollTop += e.deltaY;
    }, { passive: false });