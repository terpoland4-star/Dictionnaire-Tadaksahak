let startX = 0;
let endX = 0;

const SEUIL = 50;

export function initSwipe(element, onSwipeLeft, onSwipeRight) {
  element.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  element.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;

    handleSwipe(element, onSwipeLeft, onSwipeRight);
  });
}

function handleSwipe(element, onSwipeLeft, onSwipeRight) {
  const distance = endX - startX;

  if (Math.abs(distance) < SEUIL) return;

  element.style.transform = `translateX(${distance}px)`;

  setTimeout(() => {
    element.style.transform = "translateX(0)";
  }, 200);

  if (distance < 0) {
    onSwipeLeft(); // suivant
  } else {
    onSwipeRight(); // précédent
  }
}
