(() => {
  const c = window.SHADOW_CONTENT,
    kind = document.body.dataset.document,
    root = document.querySelector("#document");
  const n = (tag, text) => {
    const e = document.createElement(tag);
    e.textContent = text;
    return e;
  };
  const header = document.createElement("header");
  header.append(
    n("p", c.artist.brand.toUpperCase() + " / SHADOW STAGE"),
    n("h1", c.artist.name),
    n("p", kind === "rider" ? c.rider.status : c.press.summary),
  );
  root.append(header);
  const section = (title, paragraphs) => {
    const s = document.createElement("section");
    s.append(n("h2", title));
    paragraphs.forEach((text) => s.append(n("p", text)));
    root.append(s);
    return s;
  };
  if (kind === "epk") {
    const intro = section("The artist", [c.bio.short]);
    const image = document.createElement("img");
    image.src = "../" + c.images.hero;
    image.alt = c.images.heroAlt;
    image.className = "press-image";
    intro.append(image);
    section(
      "The Unholy Trinity",
      Object.values(c.personas).map((p) => p.name + " / " + p.label),
    );
    section("Selected music", [
      c.tracks
        .slice(0, 3)
        .map((t) => t.title)
        .join(" / "),
    ]);
  } else if (kind === "bios") {
    section("Short biography", [c.bio.short]);
    section("Extended biography", c.bio.extended);
  } else if (kind === "rider") {
    section("Working draft", [c.rider.intro]);
    section("Hospitality preferences", c.rider.hospitality);
    section("Technical details to confirm", c.rider.technicalToConfirm);
    section("Optional ideas - not requirements", c.rider.optionalIdeas);
  }
  if (kind !== "rider") {
    const s = section("Official channels", []);
    window.ShadowDownloads.officialLinks().forEach(([label, url]) => {
      const p = n("p", ""),
        a = n("a", label + " — " + url);
      a.href = url;
      p.append(a);
      s.append(p);
    });
  }
  section("Booking / press / collaboration", [c.contactEmail]);
  const footer = n("footer", c.artist.brand + " / " + c.press.updated);
  root.append(footer);
  document
    .querySelector("#print")
    .addEventListener("click", () => window.print());
})();
