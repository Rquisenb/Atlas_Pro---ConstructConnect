(function () {
  const CARD_CLASS = '.kl-cards-slider__card';
  const ACTIVE_CLASS = 'kl-cards-slider__card--active';
  const ACTIVE_CARD = '.' + ACTIVE_CLASS;

  const PREV_ARROW = '.kl-cards-slider__arrow--prev';
  const NEXT_ARROW = '.kl-cards-slider__arrow--next';

  const prev = document.querySelector(PREV_ARROW);
  const next = document.querySelector(NEXT_ARROW);

  function activeCardIndex(cards) {
    const activeCard = document.querySelector(ACTIVE_CARD);
    return Array.from(cards).indexOf(activeCard);
  }

  function changeCard(cards, index, newIndex) {
    if (index !== -1) {
      cards[index].classList.remove(ACTIVE_CLASS);
      cards[newIndex].classList.add(ACTIVE_CLASS);
    }
  }

  prev.addEventListener('click', function () {
    const cards = document.querySelectorAll(CARD_CLASS);
    const index = activeCardIndex(cards);
    const newIndex = index === 0 ? cards.length - 1 : index - 1;

    changeCard(cards, index, newIndex);
  });

  next.addEventListener('click', function () {
    const cards = document.querySelectorAll(CARD_CLASS);
    const index = activeCardIndex(cards);
    const newIndex = (index + 1) % cards.length;

    changeCard(cards, index, newIndex);
  });
})();
