'use strict';

const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
const mobileNav = window.matchMedia('(max-width: 720px)');

function closeNavigation(restoreFocus = false) {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  if (restoreFocus) navToggle.focus();
}

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(expanded));
  nav.classList.toggle('open', expanded);
});

nav.addEventListener('click', event => {
  if (event.target.closest('a')) closeNavigation();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
    closeNavigation(true);
  }
});

mobileNav.addEventListener('change', () => closeNavigation());

const filterButtons = document.querySelectorAll('.filter');
const workCards = document.querySelectorAll('.work-card');
const emptyMessage = document.querySelector('.empty-filter');
const filterStatus = document.querySelector('#filter-status');

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
      if (show) visible += 1;
    });

    emptyMessage.hidden = visible > 0;
    filterStatus.textContent = `${visible} ${visible === 1 ? 'artwork' : 'artworks'} shown for ${button.textContent.trim().toLowerCase()}.`;
  });
});

const form = document.querySelector('#inquiry-form');
const referenceInput = document.querySelector('#references');
const fileList = document.querySelector('#file-list');
const dialog = document.querySelector('#inquiry-preview');
const previewContent = document.querySelector('#preview-content');

referenceInput.addEventListener('change', () => {
  const files = [...referenceInput.files];
  const tooMany = files.length > 3;
  const error = tooMany ? 'Please choose up to 3 images.' : '';

  referenceInput.setCustomValidity(error);
  if (tooMany) referenceInput.setAttribute('aria-invalid', 'true');
  else referenceInput.removeAttribute('aria-invalid');

  fileList.textContent = error || (files.length
    ? files.map(file => file.name).join(', ')
    : 'Choose photos or sketches');
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const heading = document.createElement('h2');
  heading.id = 'preview-title';
  heading.textContent = 'Your idea has a shape.';

  const details = document.createElement('p');
  details.textContent = `${String(data.get('name')).trim()}, your ${String(data.get('size')).trim()} idea for your ${String(data.get('placement')).trim()} is ready to describe to the artist.`;

  const note = document.createElement('p');
  note.textContent = 'This is a portfolio demo. No inquiry or files were sent, no booking was made, and no deposit was charged.';

  const followup = document.createElement('p');
  followup.textContent = 'For the real site, Mya would review a Tally submission and then send an approved Square link separately.';

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'button';
  close.textContent = 'KEEP EXPLORING';
  close.addEventListener('click', () => dialog.close());

  previewContent.replaceChildren(heading, details, note, followup, close);
  dialog.showModal();
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
