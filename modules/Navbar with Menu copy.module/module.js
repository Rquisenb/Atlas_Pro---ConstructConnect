(function () {
  function changeButtonBehavior(e) {
    const items = document.querySelectorAll('.kl-navbar__item');

    if (e.matches) {
      items.forEach(function (item) {
        const button = item.querySelector('.kl-navbar__dropdown');

        if (button && !button.classList.contains('kl-navbar__leaf'))
          //button.href = 'javascript:void(0);';
		  button.dataset.check = 'javascript:void(0);';
      });
    } else {
      items.forEach(function (item) {
        const button = item.querySelector('.kl-navbar__dropdown');

        if (button && !button.classList.contains('kl-navbar__leaf'))
          button.href = button.dataset.href;
      });
    }
  }

  const buttons = document.querySelectorAll(
    '.kl-navbar__item .kl-navbar__dropdown'
  );
  const mql = window.matchMedia('(max-width: 920px)');

  buttons.forEach(function (btn) {
    btn.dataset.href = btn.href;
  });

  let currentTab = null;

  changeButtonBehavior(mql);

  try {
    mql.addEventListener('change', changeButtonBehavior);
  } catch (err) {
    mql.addListener(changeButtonBehavior);
  }

  const ITEM_ACTIVE_CLASS = 'kl-navbar__item--active';
  const navItems = document.querySelectorAll('.kl-navbar__item');
  const hamburger = document.querySelector('.kl-navbar__hamburger');
  const navbar = document.querySelector('.kl-navbar');

  document.addEventListener('click', function () {
    const active = document.querySelector('.kl-navbar__item--active');
    if (active) active.classList.remove(ITEM_ACTIVE_CLASS);
  });

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('is-active');
      navbar.classList.toggle('kl-navbar--active');
      document.body.classList.toggle('no-scroll');
    });
  }

  navItems.forEach(function (item) {
    const anchor = item.querySelector('a');
    const panel = item.querySelector('.kl-navbar__panel');

    if (anchor && panel) {
      anchor.addEventListener('mouseenter', function () {
        item.classList.add(ITEM_ACTIVE_CLASS);
        if (currentTab && currentTab !== item) {
          currentTab.classList.remove(ITEM_ACTIVE_CLASS);
        }
        currentTab = item;
      });
      anchor.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }else{ // This one is if you don't have a panel
      anchor.addEventListener('mouseenter', function () {
        item.classList.add(ITEM_ACTIVE_CLASS);
        if ((currentTab) && (currentTab !== item)) {
          currentTab.classList.remove(ITEM_ACTIVE_CLASS);
        }
        currentTab = item;
	  });
	  anchor.addEventListener('mouseleave', function (){
        currentTab.classList.remove(ITEM_ACTIVE_CLASS);
	  })
    }

    if (panel) {
      panel.addEventListener('mouseleave', function () {
        if (currentTab) currentTab.classList.remove(ITEM_ACTIVE_CLASS);
      });
      panel.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }
  });

  const nodes = document.querySelectorAll('.kl-navbar__menu a');

  nodes.forEach(function (node) {
    node.addEventListener('click', function (event) {
      const target = event.currentTarget;
      //if (target.getAttribute('href') != 'javascript:void(0);') {
		if (target.dataset.check != 'javascript:void(0);'){
        hamburger.classList.remove('is-active');
        navbar.classList.remove('kl-navbar--active');
        document.body.classList.remove('no-scroll');
      }
    });
  });
})();
