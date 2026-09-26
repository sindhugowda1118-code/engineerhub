const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const commandPalette = document.getElementById('commandPalette');
const chips = document.querySelectorAll('.chip');
const billingButtons = document.querySelectorAll('.billing-btn');
const amounts = document.querySelectorAll('.amount');

const getStoredTheme = () => localStorage.getItem('engineerhub-theme') || 'dark';

const setTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('engineerhub-theme', theme);
};

setTheme(getStoredTheme());

themeToggle?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

mobileMenu?.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const isVisible = nav.style.display === 'flex';
  nav.style.display = isVisible ? 'none' : 'flex';
  nav.style.position = 'absolute';
  nav.style.top = '78px';
  nav.style.left = '16px';
  nav.style.right = '16px';
  nav.style.flexDirection = 'column';
  nav.style.alignItems = 'flex-start';
  nav.style.padding = '16px';
  nav.style.border = '1px solid var(--line)';
  nav.style.borderRadius = '18px';
  nav.style.background = 'rgba(8, 14, 19, 0.94)';
  nav.style.boxShadow = 'var(--shadow)';
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter;
    const cards = document.querySelectorAll('.tool-card');

    cards.forEach((card) => {
      const category = card.dataset.category;
      const match = filter === 'all' || category === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});

billingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    billingButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const billing = button.dataset.billing;
    amounts.forEach((amount) => {
      const value = billing === 'yearly' ? amount.dataset.yearly : amount.dataset.monthly;
      amount.textContent = value;
    });

    document.querySelectorAll('.price-wrap small').forEach((small) => {
      small.textContent = billing === 'yearly' ? '/year' : '/month';
    });
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    commandPalette?.classList.add('show');
    commandPalette?.setAttribute('aria-hidden', 'false');
  }

  if (event.key === 'Escape') {
    commandPalette?.classList.remove('show');
    commandPalette?.setAttribute('aria-hidden', 'true');
  }
});

commandPalette?.addEventListener('click', (event) => {
  if (event.target === commandPalette) {
    commandPalette.classList.remove('show');
    commandPalette.setAttribute('aria-hidden', 'true');
  }
});
