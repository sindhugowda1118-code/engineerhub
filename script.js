const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const commandPalette = document.getElementById('commandPalette');
const chips = document.querySelectorAll('.chip');
const billingButtons = document.querySelectorAll('.billing-btn');
const prices = document.querySelectorAll('.amount');

const getStoredTheme = () => localStorage.getItem('engineerhub-theme') || 'dark';

const setTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('engineerhub-theme', theme);
};

setTheme(getStoredTheme());

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

mobileMenu?.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  nav.style.position = 'absolute';
  nav.style.top = '78px';
  nav.style.left = '16px';
  nav.style.right = '16px';
  nav.style.flexDirection = 'column';
  nav.style.padding = '16px';
  nav.style.background = 'rgba(11,16,22,0.9)';
  nav.style.border = '1px solid var(--line)';
  nav.style.borderRadius = '16px';
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter;
    const cards = document.querySelectorAll('.tool-card');

    cards.forEach((card) => {
      const category = card.dataset.category;
      const matches = filter === 'all' || category === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

billingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    billingButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const mode = button.dataset.billing;
    prices.forEach((item) => {
      const val = mode === 'yearly' ? item.dataset.yearly : item.dataset.monthly;
      item.textContent = val;
    });

    const small = document.querySelectorAll('.price small');
    small.forEach((node) => {
      node.textContent = mode === 'yearly' ? '/year' : '/month';
    });
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    commandPalette.classList.add('show');
    commandPalette.setAttribute('aria-hidden', 'false');
  }

  if (event.key === 'Escape') {
    commandPalette.classList.remove('show');
    commandPalette.setAttribute('aria-hidden', 'true');
  }
});

commandPalette?.addEventListener('click', (event) => {
  if (event.target === commandPalette) {
    commandPalette.classList.remove('show');
    commandPalette.setAttribute('aria-hidden', 'true');
  }
});
