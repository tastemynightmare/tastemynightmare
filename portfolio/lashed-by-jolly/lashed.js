'use strict';

const prices = {
  classic: { name: 'Classic', full: 80, refill: 60 },
  hybrid: { name: 'Hybrid', full: 100, refill: 80 },
  volume: { name: 'Volume', full: 120, refill: 100 },
  mega: { name: 'Mega Volume', full: 140, refill: 120 }
};

const extras = {
  bottom: { name: 'Bottom lashes', price: 15 },
  removal: { name: 'Lash removal', price: 20 },
  bath: { name: 'Lash bath', price: 20 }
};

const form = document.querySelector('#demo-form');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#primary-nav');
const confirmation = document.querySelector('#confirmation');
const dateInput = document.querySelector('#date');
const summaryAnnouncement = document.querySelector('#summary-announcement');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileNav = window.matchMedia('(max-width: 900px)');
const money = amount => `$${amount}`;

function closeMenu({ restoreFocus = false } = {}) {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu({ restoreFocus: true });
  }
});

mobileNav.addEventListener('change', () => closeMenu());

function getSelection() {
  const set = prices[form.elements.namedItem('service').value];
  const type = form.querySelector('input[name="type"]:checked').value;
  const chosenExtras = [...form.querySelectorAll('input[name="extra"]:checked')]
    .map(input => extras[input.value]);
  const base = set[type];
  const total = base + chosenExtras.reduce((sum, item) => sum + item.price, 0);
  const deposit = type === 'full' ? 35 : 0;

  return { set, type, chosenExtras, base, total, deposit };
}

function updateSummary(announce = true) {
  const { set, type, chosenExtras, base, total, deposit } = getSelection();
  const serviceName = `${set.name} ${type === 'full' ? 'full set' : 'refill'}`;

  document.querySelector('#summary-service').textContent = serviceName;
  document.querySelector('#summary-base').textContent = money(base);
  document.querySelector('#summary-total').textContent = money(total);
  document.querySelector('#summary-deposit').textContent = money(deposit);
  document.querySelector('#summary-remaining').textContent = money(total - deposit);

  const rows = chosenExtras.map(item => {
    const row = document.createElement('div');
    row.className = 'summary-line';

    const label = document.createElement('span');
    label.textContent = item.name;

    const price = document.createElement('strong');
    price.textContent = money(item.price);

    row.append(label, price);
    return row;
  });
  document.querySelector('#summary-extras').replaceChildren(...rows);

  if (announce) {
    summaryAnnouncement.textContent = `${serviceName}. Service total ${money(total)}. ` +
      `Deposit ${money(deposit)}. Remaining ${money(total - deposit)}.`;
  }
}

form.addEventListener('change', () => updateSummary());

// The sample date and time controls demonstrate the flow; they do not reserve a slot.
const today = new Date();
const localDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0')
].join('-');
dateInput.min = localDate;

document.querySelectorAll('.select-set').forEach(button => {
  button.addEventListener('click', () => {
    form.elements.namedItem('service').value = button.dataset.set;
    form.querySelector('input[name="type"][value="full"]').checked = true;
    updateSummary();
    document.querySelector('#play-checkout').scrollIntoView({
      behavior: reduceMotion.matches ? 'instant' : 'smooth'
    });
    form.elements.namedItem('service').focus({ preventScroll: true });
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const { set, type, total } = getSelection();
  const name = form.elements.namedItem('client-name').value.trim();
  const date = dateInput.value;
  const time = form.elements.namedItem('time').value;

  const heading = document.createElement('h2');
  heading.id = 'confirmation-title';
  heading.textContent = 'Your demo look is set ✦';

  const summary = document.createElement('p');
  summary.textContent = `${name}, you tried a ${set.name.toLowerCase()} ` +
    `${type === 'full' ? 'full set' : 'refill'} for ${date} at ${time}. ` +
    `Example service total: ${money(total)}.`;

  const note = document.createElement('p');
  note.textContent = 'This was play checkout. No appointment was booked, ' +
    'no email was sent, and no payment was collected.';

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'pill pill-pink';
  close.textContent = 'Keep exploring';
  close.addEventListener('click', () => confirmation.close());

  document.querySelector('#confirmation-content').replaceChildren(heading, summary, note, close);
  confirmation.showModal();
});

document.querySelector('.dialog-close').addEventListener('click', () => confirmation.close());
confirmation.addEventListener('click', event => {
  if (event.target === confirmation) confirmation.close();
});

updateSummary(false);
