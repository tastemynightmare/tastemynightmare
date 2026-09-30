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
const money = amount => `$${amount}`;

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

function selection() {
  const set = prices[form.elements.service.value];
  const type = form.querySelector('input[name="type"]:checked').value;
  const chosenExtras = [...form.querySelectorAll('input[name="extra"]:checked')]
    .map(input => extras[input.value]);
  const base = set[type];
  const total = base + chosenExtras.reduce((sum, item) => sum + item.price, 0);
  const deposit = type === 'full' ? 35 : 0;

  return { set, type, chosenExtras, base, total, deposit };
}

function updateSummary() {
  const selected = selection();
  document.querySelector('#summary-service').textContent = `${selected.set.name} ${selected.type === 'full' ? 'full set' : 'refill'}`;
  document.querySelector('#summary-base').textContent = money(selected.base);
  document.querySelector('#summary-total').textContent = money(selected.total);
  document.querySelector('#summary-deposit').textContent = money(selected.deposit);
  document.querySelector('#summary-remaining').textContent = money(selected.total - selected.deposit);

  const extraRows = document.querySelector('#summary-extras');
  extraRows.replaceChildren();
  selected.chosenExtras.forEach(item => {
    const row = document.createElement('div');
    row.className = 'summary-line';
    const label = document.createElement('span');
    label.textContent = item.name;
    const price = document.createElement('strong');
    price.textContent = money(item.price);
    row.append(label, price);
    extraRows.append(row);
  });
}

form.addEventListener('change', updateSummary);

// The sample date and time fields are a UI demonstration, not a live scheduler.
const dateInput = document.querySelector('#date');
const localToday = new Date();
const year = localToday.getFullYear();
const month = String(localToday.getMonth() + 1).padStart(2, '0');
const day = String(localToday.getDate()).padStart(2, '0');
dateInput.min = `${year}-${month}-${day}`;

// Menu buttons start the demo with that lash style selected.
document.querySelectorAll('.select-set').forEach(button => {
  button.addEventListener('click', () => {
    form.elements.service.value = button.dataset.set;
    form.querySelector('input[name="type"][value="full"]').checked = true;
    updateSummary();
    document.querySelector('#play-checkout').scrollIntoView({ behavior: 'smooth' });
    form.elements.service.focus({ preventScroll: true });
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const selected = selection();
  const name = form.elements['client-name'].value.trim();
  const date = dateInput.value;
  const time = form.elements.time.value;
  const details = document.querySelector('#confirmation-content');
  details.replaceChildren();

  const heading = document.createElement('h2');
  heading.textContent = 'Your demo look is set ✦';
  const summary = document.createElement('p');
  summary.textContent = `${name}, you tried a ${selected.set.name.toLowerCase()} ${selected.type === 'full' ? 'full set' : 'refill'} for ${date} at ${time}. Example service total: ${money(selected.total)}.`;
  const note = document.createElement('p');
  note.textContent = 'This was play checkout. No appointment was booked, no email was sent, and no payment was collected.';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'pill pill-pink';
  close.textContent = 'Keep exploring';
  close.addEventListener('click', () => confirmation.close());
  details.append(heading, summary, note, close);
  confirmation.showModal();
});

document.querySelector('.dialog-close').addEventListener('click', () => confirmation.close());
confirmation.addEventListener('click', event => {
  if (event.target === confirmation) confirmation.close();
});

updateSummary();