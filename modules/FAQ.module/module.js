(function () {
  const entries = document.querySelectorAll('.kl-faq__entry');
  const ACTIVE_CLASS = 'kl-faq__entry--active';

  let currentEntry = null;

  entries.forEach(function (entry) {
    const header = entry.querySelector('.kl-faq__header');

    if (header.dataset.kl_faq_listener_attached !== 'true') {
      header.addEventListener('click', function () {
        if (currentEntry != null) {
          const content = currentEntry.querySelector('.kl-faq__description');
          content.style.height = 0;

          if (currentEntry !== entry) {
            currentEntry.classList.remove(ACTIVE_CLASS);
            currentEntry = null;
          }
        }

        entry.classList.toggle(ACTIVE_CLASS);

        if (entry.classList.contains(ACTIVE_CLASS)) {
          const content = entry.querySelector('.kl-faq__description');
          content.style.height = content.scrollHeight + 'px';
          currentEntry = entry;
        }
      });
      header.dataset['kl_faq_listener_attached'] = 'true';
    }
  });
})();
