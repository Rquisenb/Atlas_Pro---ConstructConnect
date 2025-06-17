(function () {
  const navbar = document.querySelector('.kl-navbar');
  const hamburger = document.querySelector('.kl-navbar__hamburger');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('is-active');
      navbar.classList.toggle('kl-navbar--active');
      document.body.classList.toggle('no-scroll');
    });
  }

  const ACTIVE_CLASS = 'kl-navbar__parent--active';

  const selected = [];
  const nodes = document.querySelectorAll('.kl-navbar__menu li');
  // const parentNodes = document.querySelectorAll('.kl-navbar__parent');

  nodes.forEach(function (node) {
    function handleClick(event) {
      event.stopPropagation();

      if (selected.length <= 0) {
        selected.push(node);
        node.classList.add(ACTIVE_CLASS);
        return;
      }

      do {
        const last = selected.pop();

        if (last === node) {
          last.classList.remove(ACTIVE_CLASS);
          break;
        } else if (last.contains(node)) {
          selected.push(last);
          selected.push(node);
          node.classList.add(ACTIVE_CLASS);
          break;
        } else {
          last.classList.remove(ACTIVE_CLASS);

          if (selected.length === 0) {
            selected.push(node);
            node.classList.add(ACTIVE_CLASS);
            break;
          }
        }
      } while (selected.length > 0);
    }

    node.addEventListener('click', handleClick);
  });

  nodes.forEach(function (node) {
    if (node.classList.contains('kl-navbar__parent')) return;

    node.addEventListener('click', function (event) {
      hamburger.classList.remove('is-active');
      navbar.classList.remove('kl-navbar--active');
      document.body.classList.remove('no-scroll');
    });
  });

  function highlightActiveButton() {
    const buttons = document.querySelectorAll('a.kl-navbar__button');

    buttons.forEach(function (btn) {
      const href = btn.getAttribute('href');
      const url = new URL(href, window.location.href);

      const currentUrl = window.location.href.split('?')[0];
      const buttonHref = url.href.split('?')[0];

      btn.classList.remove('kl-navbar__button--active');

      if (
        !!href &&
        href !== '#' &&
		//!href.startsWith('#') &&
        !href.startsWith('?') &&
        currentUrl == buttonHref
      )
        btn.classList.add('kl-navbar__button--active');
		// console.log(!!href);
    });
  }

  highlightActiveButton();
  window.addEventListener('hashchange', highlightActiveButton);
})();
