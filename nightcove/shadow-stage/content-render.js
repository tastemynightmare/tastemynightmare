/* Applies content.js to the page. Layout and section headings live in music.html. */
(() => {
  const c = window.SHADOW_CONTENT;
  const $ = (s) => document.querySelector(s);
  const node = (tag, text, cls) => {
    const e = document.createElement(tag);
    if (text) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  };
  document.title = `Shadow Stage - ${c.artist.name} | ${c.artist.brand}`;
  document.querySelector('meta[name="description"]').content =
    c.artist.description.replace(/\n/g, " ");
  const title = $("#artist-name");
  title.replaceChildren(
    node("span", c.artist.firstName),
    document.createElement("br"),
    node("em", c.artist.lastName),
  );
  $(".hero-tagline").textContent = c.artist.tagline;
  $(".hero-description").textContent = c.artist.description;
  $(".hero-description").style.whiteSpace = "pre-line";
  $(".hero-photo img").src = c.images.hero;
  $(".hero-photo img").alt = c.images.heroAlt;
  $(".photo-caption").textContent = c.images.heroCaption;
  $(".brand img").src = c.images.logo;
  $(".footer img").src = c.images.logo;
  document.querySelector('link[rel="icon"]').href = c.images.logo;
  $(".brand").href = c.links.home;
  $(".masthead-center").href = c.links.home;
  const oldLinks = {
    "https://open.spotify.com/artist/3ztJFOdQ2mptebJdUI81kj": "spotify",
    "https://www.youtube.com/@AshelicRose": "youtube",
    "https://www.youtube.com/@AshelicRoseVlogs": "vlogs",
    "https://www.instagram.com/tastemynightmare/": "instagram",
    "https://www.tiktok.com/@tastemy.nightmare": "tiktok",
    "https://tastemynightmare.com/portfolio/portfolio.html": "portfolio",
  };
  document.querySelectorAll("a[href]").forEach((a) => {
    const key = oldLinks[a.getAttribute("href")];
    if (key) a.href = c.links[key];
  });
  $(".contact-email").textContent = c.contactEmail + " ↗";
  $(".contact-email").href = "mailto:" + c.contactEmail;
  const column = $(".bio-column"),
    actions = $(".bio-actions");
  column.replaceChildren(
    node("p", c.bio.lead, "lead"),
    ...c.bio.pageParagraphs.map((text) => node("p", text)),
    actions,
  );
  $(".next-era .eyebrow").textContent = c.nextRelease.status;
  $(".next-era h3").textContent = c.nextRelease.title;
  $(".next-era p").textContent = c.nextRelease.description;
  const desk = $(".projection-desk"),
    label = desk.querySelector(".eyebrow"),
    channel = desk.querySelector(".channel-link");
  const filmButtons = c.films.map((film, i) => {
    const b = node("button", "", "film" + (i === 0 ? " active" : ""));
    b.type = "button";
    b.dataset.film = i;
    b.setAttribute("aria-pressed", String(i === 0));
    const duration = node("span", film.duration + " ");
    const arrow = node("b", "↗");
    arrow.setAttribute("aria-hidden", "true");
    duration.append(arrow);
    b.append(
      node("span", String(i + 1).padStart(2, "0") + " / " + film.category),
      node("strong", film.title),
      duration,
    );
    return b;
  });
  desk.replaceChildren(label, ...filmButtons, channel);
  const grid = $(".asset-grid");
  grid.replaceChildren(
    ...c.assets.map((asset, i) => {
      const article = node("article", "", "asset");
      article.dataset.category = asset.category;
      const b = node("button", "", "asset-preview");
      b.type = "button";
      b.dataset.asset = i;
      b.setAttribute("aria-label", "Preview " + asset.title);
      const img = node("img");
      img.src = asset.src;
      img.alt = asset.title;
      img.loading = "lazy";
      if (asset.category === "brand") img.className = "contain";
      b.append(img, node("span", "VIEW FULL SIZE ↗"));
      const details = node("div", "", "asset-details"),
        description = node("div");
      description.append(
        node("h3", asset.displayTitle),
        node("p", asset.caption),
      );
      const download = node("a", "↓");
      download.href = asset.src;
      download.download = asset.filename;
      download.setAttribute("aria-label", "Download " + asset.title);
      details.append(description, download);
      article.append(b, details);
      return article;
    }),
  );
  $("#asset-count").textContent = c.assets.length + " ORIGINAL ASSETS";
})();
