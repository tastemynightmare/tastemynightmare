const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.product').forEach(card => card.hidden = filter !== 'all' && card.dataset.category !== filter);
}));
const ideas = {
  harvest: {title:'Harvest Grain Bowl', ingredients:'Cooked grains, roasted seasonal vegetables, leafy greens, and a dressing you love.', method:'Layer the grains and greens, add the vegetables, and finish with dressing. Adjust quantities to taste.'},
  skillet: {title:'Garden Skillet', ingredients:'Cooked grains, chopped garden vegetables, olive oil, garlic, and fresh herbs.', method:'Sauté the vegetables until tender, fold in the grains, and finish with herbs. Season to taste.'},
  tomato: {title:'Slow Simmered Tomato', ingredients:'Tomatoes, onion, garlic, olive oil, herbs, and your choice of beans or pasta.', method:'Cook onion and garlic in olive oil, add tomatoes and herbs, then simmer until thick. Serve with beans or pasta.'}
};
const dialog = document.querySelector('#recipe-dialog');
document.querySelectorAll('.recipe-button').forEach(button => button.addEventListener('click', () => {
  const idea = ideas[button.dataset.recipe];
  const content = document.querySelector('#recipe-content');
  content.replaceChildren();
  const title = document.createElement('h2'); title.textContent = idea.title;
  const intro = document.createElement('p'); intro.className = 'recipe-note'; intro.textContent = 'A flexible serving idea, not a tested recipe.';
  const heading1 = document.createElement('h3'); heading1.textContent = 'What you need';
  const ingredients = document.createElement('p'); ingredients.textContent = idea.ingredients;
  const heading2 = document.createElement('h3'); heading2.textContent = 'How to make it';
  const method = document.createElement('p'); method.textContent = idea.method;
  content.append(title, intro, heading1, ingredients, heading2, method);
  dialog.showModal();
}));
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });