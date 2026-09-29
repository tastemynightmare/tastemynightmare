const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(expanded));
  nav.classList.toggle('open', expanded);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const filterButtons = document.querySelectorAll('.filter');
const workCards = document.querySelectorAll('.work-card');
const emptyMessage = document.querySelector('.empty-filter');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let visible = 0;

    filterButtons.forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });

    workCards.forEach(card => {
      const show = category === 'all' || card.dataset.category === category;
      card.hidden = !show;
      if (show) visible++;
    });

    emptyMessage.hidden = visible > 0;
  });
});

const form = document.querySelector('#inquiry-form');
const referenceInput = document.querySelector('#references');
const fileList = document.querySelector('#file-list');
const dialog = document.querySelector('#inquiry-preview');

referenceInput.addEventListener('change', () => {
  const files = [...referenceInput.files];
  if (files.length > 3) {
    referenceInput.value = '';
    fileList.textContent = 'Please choose up to 3 images.';
    return;
  }
  fileList.textContent = files.length ? files.map(file => file.name).join(', ') : 'Choose photos or sketches';
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const content = document.querySelector('#preview-content');
  content.replaceChildren();

  const heading = document.createElement('h2');
  heading.textContent = 'Your idea has a shape.';
  const details = document.createElement('p');
  details.textContent = `${data.get('name')}, your ${data.get('size')} idea for your ${data.get('placement')} is ready to describe to the artist.`;
  const note = document.createElement('p');
  note.textContent = 'This is a portfolio demo. No inquiry or files were sent, no booking was made, and no deposit was charged.';
  const followup = document.createElement('p');
  followup.textContent = 'For the real site, Mya would review a Tally submission and then send an approved Square link separately.';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'button';
  close.textContent = 'KEEP EXPLORING';
  close.addEventListener('click', () => dialog.close());
  content.append(heading, details, note, followup, close);
  dialog.showModal();
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});