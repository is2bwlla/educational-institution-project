const carousel = document.querySelector('.carousel-inner');
const carouselItems = [...document.querySelectorAll('.card-carousel')];

// Clonar o primeiro e o último item
const firstClone = carouselItems[0].cloneNode(true);
const lastClone = carouselItems[carouselItems.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

// Adicionar os clones ao carrossel
carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, carouselItems[0]);

let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0, animationID = 0;
let currentIndex = 1; // Começa no segundo item (primeiro real), por causa do clone
const totalItems = carouselItems.length + 2; // Inclui os dois clones

const itemWidth = carouselItems[0].offsetWidth;
carousel.style.transform = `translateX(${-itemWidth}px)`; // Posição inicial

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('mouseleave', endDrag);
carousel.addEventListener('touchstart', startDrag);
carousel.addEventListener('touchmove', dragging);
carousel.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    startPos = getPosition(e);
    animationID = requestAnimationFrame(animation);
    carousel.style.transition = 'none'; // Remover transição durante o arraste
}

function dragging(e) {
    if (isDragging) {
        const currentPosition = getPosition(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    // Condição para mover para o próximo ou anterior
    if (movedBy < -100) {
        currentIndex += 1;
    }

    if (movedBy > 100) {
        currentIndex -= 1;
    }

    setPositionByIndex();
    carousel.style.transition = 'transform 0.3s ease'; // Volta a transição suave
}

function getPosition(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -itemWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();

    // Se o índice for o clone do primeiro, saltar para o primeiro real
    if (currentIndex === totalItems - 1) {
        setTimeout(() => {
            carousel.style.transition = 'none'; // Remove a transição
            currentIndex = 1; // Vai para o primeiro item real
            currentTranslate = -itemWidth;
            prevTranslate = currentTranslate;
            setSliderPosition();
        }, 300); // Tempo da transição
    }

    // Se o índice for o clone do último, saltar para o último real
    if (currentIndex === 0) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = totalItems - 2; // Vai para o último item real
            currentTranslate = -(itemWidth * currentIndex);
            prevTranslate = currentTranslate;
            setSliderPosition();
        }, 300);
    }
}
