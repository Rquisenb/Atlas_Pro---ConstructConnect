/* eslint-disable no-use-before-define */
const KEYS = {
  SPACE: ' ',
  ENTER: 'Enter',
  TAB: 'Tab',
  ESCAPE: 'Escape',
  UP: 'Up', // IE11 & Edge 16 value for Arrow Up
  ARROW_UP: 'ArrowUp',
  DOWN: 'Down', // IE11 & Edge 16 value for Arrow Down
  ARROW_DOWN: 'ArrowDown',
};

const HsLanguageSwitcher = element => {
  const button = element.querySelector('.hs-language-switcher__button');
  const menu = element.querySelector('.hs-language-switcher__menu');
  const options = Array.from(menu.children);
  const chevron = element.querySelector(
    '.hs-language-switcher__icon--dropdown'
  );

  let selectedIndex = -1;
  let optionMousemoveHandlers = [];

  function onDocumentClick(e) {
    const target = e.target;

    if (element === target || !element.contains(target)) {
      hideMenu();
    }
  }

  function onKeyDown(e) {
    menu.classList.remove('mousemove');

    switch (e.key) {
      case KEYS.SPACE:
      case KEYS.ENTER:
        if (selectedIndex >= 0) {
          e.preventDefault();
          const selectedOption = options[selectedIndex];
          window.location.href = selectedOption.children[0].href;
        }
        break;
      case KEYS.DOWN:
      case KEYS.ARROW_DOWN:
        e.preventDefault();
        selectNextOption();
        break;
      case KEYS.UP:
      case KEYS.ARROW_UP:
        e.preventDefault();
        selectPreviousOption();
        break;
      case KEYS.TAB:
      case KEYS.ESCAPE:
        hideMenu();
        break;
      default:
      // nothing
    }
  }

  function onOptionMousemove(index) {
    menu.classList.add('mousemove');
    selectedIndex = index;
    updateSelectedOption();
  }

  function showMenu() {
    selectedIndex = 0;
    menu.classList.add('visible');
    button.setAttribute('aria-expanded', true);
    element.addEventListener('keydown', onKeyDown);
    element.classList.add('menu-open');

    options.forEach((option, index) => {
      /*
       * The mousemove handler has custom arguments, given via bind
       * Bind returns a new instance of the function, so in order to remove the event listener handler from the element,
       * the references must be stored in an array for removal later
       */

      const handler = onOptionMousemove.bind(null, index);
      optionMousemoveHandlers.push(handler);
      option.addEventListener('mousemove', handler);
    });

    if (chevron) {
      rotateChevron();
    }

    document.addEventListener('click', onDocumentClick);

    updateSelectedOption();
  }

  function hideMenu() {
    // Hide the dropdown
    menu.classList.remove('visible');
    button.setAttribute('aria-expanded', false);
    element.classList.remove('menu-open');

    options.forEach((option, index) => {
      // Remove class for option background highlight
      option.classList.remove('active');

      // Remove mousemove event handlers stored in array
      option.removeEventListener('mousemove', optionMousemoveHandlers[index]);
    });

    if (chevron) {
      rotateChevron();
    }

    optionMousemoveHandlers = [];

    element.removeEventListener('keydown', onKeyDown);

    document.removeEventListener('click', onDocumentClick);

    button.focus();
  }

  function toggleMenu() {
    if (menu.classList.contains('visible')) {
      hideMenu();
    } else {
      showMenu();
    }
  }

  function selectNextOption() {
    if (selectedIndex + 1 === options.length) {
      selectedIndex = 0;
    } else {
      selectedIndex += 1;
    }

    updateSelectedOption();
  }

  function selectPreviousOption() {
    if (selectedIndex - 1 < 0) {
      selectedIndex = options.length - 1;
    } else {
      selectedIndex -= 1;
    }

    updateSelectedOption();
  }

  function updateSelectedOption() {
    options.forEach((option, index) => {
      if (index === selectedIndex) {
        option.classList.add('active');
        option.children[0].focus();
      } else {
        option.classList.remove('active');
      }
    });
  }

  function rotateChevron() {
    chevron.classList.contains('active')
      ? chevron.classList.remove('active')
      : chevron.classList.add('active');
  }

  // Allows clicking & enter key to open the menu
  button.addEventListener('click', () => {
    toggleMenu();
  });

  // Allows the arrow down key to open the menu
  button.addEventListener('keydown', e => {
    if (e.key === KEYS.ARROW_DOWN) {
      showMenu();

      e.preventDefault(); // Prevent the page from scrolling down
      e.stopPropagation(); // Prevent the wrapper element from handling this keydown after the menu opens
    }
  });
};

function handleScreenChange() {
  const windowWidth = window.innerWidth;
  const centerOfWindow = windowWidth / 2;

  document
    .querySelectorAll(
      '.hs-language-switcher .hs-language-switcher__inner-wrapper'
    )
    .forEach(el => {
      const elPosition = el.getBoundingClientRect();
      const elXPos = elPosition.x;
      const elWidth = elPosition.width;
      const elCenterPos = elXPos + elWidth / 2;
      const menu = el.querySelector('.hs-language-switcher__menu');

      if (
        elCenterPos > centerOfWindow - 25 &&
        elCenterPos < centerOfWindow + 25
      ) {
        menu.classList.add('hs--align-center');
      } else if (elCenterPos > centerOfWindow) {
        menu.classList.add('hs--align-right');
      } else {
        menu.classList.add('hs--align-left');
      }
    });
}

// Force mobile dropdown alignment
const breakpoints = [
  { width: '(max-width: 450px)' },
  { width: '(min-width:541px) and (max-width: 767px)' },
];

// Attach event listeners to each breakpoint
breakpoints.forEach(breakpoint => {
  const mediaQuery = window.matchMedia(breakpoint.width);

  // Call the handler when the screen matches the breakpoint
  const handleScreenChangeWrapper = e => {
    if (e.matches) {
      handleScreenChange();
    }
  };
  mediaQuery.addEventListener('change', handleScreenChangeWrapper);

  // Initial check on page load
  if (mediaQuery.matches) {
    handleScreenChange();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.hs-language-switcher')).forEach(
    languageSwitcher => HsLanguageSwitcher(languageSwitcher)
  );
});
