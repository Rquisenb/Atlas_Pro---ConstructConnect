/*
(function () {
  const ACTIVE_CLASS = 'active';
  const ACTIVE_SELECTOR = '.' + ACTIVE_CLASS;

  const SECTION_SELECTOR = '.kl-features-03__section';

  const OPTIONS = '.kl-features-03__titles li';
  const opts = document.querySelectorAll(OPTIONS);

  opts.forEach(function (opt) {
    const index = opt.dataset.index;
    const query = SECTION_SELECTOR + `[data-index="${index}"]`;
    const section = document.querySelector(query);

    opt.addEventListener('click', function () {
      const current = document.querySelector(
        SECTION_SELECTOR + ACTIVE_SELECTOR
      );
      const currentTitle = document.querySelector(
        OPTIONS + `[data-index="${current.dataset.index}"]`
      );

      /* Remove ACTIVE_CLASS from current section and title
      current.classList.remove(ACTIVE_CLASS);
      currentTitle.classList.remove(ACTIVE_CLASS);
*/

      /* Add ACTIVE_CLASS from current section and title
      section.classList.add(ACTIVE_CLASS);
      opt.classList.add(ACTIVE_CLASS);
    });
  });
})();
*/
