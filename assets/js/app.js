(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const menuButton = $('.menu-toggle');
  const navLinks = $('#main-navigation');

  const closeMenu = () => {
    if (!menuButton || !navLinks) return;
    menuButton.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  };

  menuButton?.addEventListener('click', () => {
    const nextState = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(nextState));
    navLinks?.classList.toggle('open', nextState);
  });

  navLinks?.addEventListener('click', event => {
    if (event.target.closest('a[href^="#"]')) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 950) closeMenu();
  }, { passive: true });

  // Selector de ruta del laboratorio.
  const choices = $$('.choice');
  const views = $$('.route-view');
  const tabs = $$('.tab-btn');

  choices.forEach(button => button.addEventListener('click', () => {
    choices.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const route = button.dataset.route;
    views.forEach(view => view.classList.toggle('active', view.dataset.view === route));
    const selectedTab = $('.tab-btn.active')?.dataset.tab;
    if (!selectedTab) return;
    $$('.route-view.active .tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.dataset.pane === selectedTab);
    });
  }));

  tabs.forEach(button => button.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    $$('.route-view.active .tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.dataset.pane === button.dataset.tab);
    });
  }));

  // Copia de comandos.
  const toast = $('#toast');
  let toastTimer;
  document.addEventListener('click', async event => {
    const button = event.target.closest('.copy');
    if (!button) return;
    const codeBlock = button.parentElement;
    const text = codeBlock?.innerText.replace('COPIAR', '').trim() || '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    if (toast) {
      clearTimeout(toastTimer);
      toast.classList.add('show');
      toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
    }
  });

  // Recomendador de ruta.
  const checks = $$('.check-item input');
  const updateResult = () => {
    let python = 0;
    let emulator = 0;
    checks.forEach(input => {
      if (!input.checked) return;
      input.dataset.points === 'python' ? python++ : emulator++;
    });
    const total = Math.max(python + emulator, 1);
    const pythonBar = $('#scorePython');
    const emulatorBar = $('#scoreEmulator');
    if (pythonBar) pythonBar.style.width = `${python / total * 100}%`;
    if (emulatorBar) emulatorBar.style.width = `${emulator / total * 100}%`;

    const title = $('#resultTitle');
    const text = $('#resultText');
    const icon = $('#resultIcon');
    if (!title || !text || !icon) return;

    if (python > emulator) {
      icon.textContent = '⚡';
      title.textContent = 'Empieza con Python';
      text.textContent = 'Tu selección favorece una ruta transparente, más fácil de depurar y alineada con el aprendizaje de programación.';
    } else if (emulator > python) {
      icon.textContent = '🔥';
      title.textContent = 'Prueba Season 3';
      text.textContent = 'Tu prioridad es la fidelidad al cliente clásico y tienes tolerancia para configurar SQL, C# y un entorno aislado.';
    } else {
      icon.textContent = '⚔️';
      title.textContent = 'Ruta híbrida';
      text.textContent = 'Empieza con el remake para comprender la lógica y después abre el emulador en una máquina virtual para comparar arquitecturas.';
    }
  };
  checks.forEach(input => input.addEventListener('change', updateResult));
  updateResult();

  // Filtros de la cronología.
  const historyButtons = $$('[data-history-filter]');
  const historyItems = $$('.timeline-item[data-region]');
  historyButtons.forEach(button => button.addEventListener('click', () => {
    historyButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.historyFilter;
    historyItems.forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.region !== filter);
    });
  }));

  // Animaciones y navegación activa.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.11 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const anchorLinks = $$('#main-navigation a[href^="#"]');
  const sections = anchorLinks
    .map(link => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      anchorLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.3, 0.6] });
    sections.forEach(section => navObserver.observe(section));
  }
})();
