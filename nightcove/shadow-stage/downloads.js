/* Editable press downloads. All text comes from content.js, without a build step. */
(() => {
  "use strict";
  const c = window.SHADOW_CONTENT;
  const siteRoot = new URL(
    document.body.dataset.siteRoot || "./",
    document.baseURI,
  );
  const ascii = (value) =>
    String(value)
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—]/g, "-")
      .replace(/…/g, "...")
      .replace(/[•]/g, " / ")
      .replace(/↗/g, "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\x09\x0a\x0d\x20-\x7e]/g, "");
  const officialLinks = () => [
    ["Website", c.links.website],
    ["Spotify", c.links.spotify],
    ["Apple Music", c.links.apple],
    [
      "Official music video",
      "https://www.youtube.com/watch?v=" + c.films[0].id,
    ],
    ["YouTube", c.links.youtube],
    ["Behind the scenes", c.links.vlogs],
    ["Instagram", c.links.instagram],
    ["TikTok", c.links.tiktok],
    ["Creative portfolio", new URL(c.links.portfolio, siteRoot).href],
    ["Contact", "mailto:" + c.contactEmail],
  ];
  function bios() {
    return `${c.artist.name.toUpperCase()} / ${c.artist.brand.toUpperCase()}\n\nSHORT BIO\n${c.bio.short}\n\nEXTENDED BIO\n${c.bio.extended.join("\n\n")}\n\nBOOKING / PRESS / COLLABORATION\n${c.contactEmail}\n`;
  }
  function links() {
    return (
      `${c.artist.name.toUpperCase()} / OFFICIAL LINKS\n\n` +
      officialLinks()
        .map(([label, url]) => label + "\n" + url)
        .join("\n\n") +
      "\n"
    );
  }
  function riderText() {
    return (
      `${c.artist.name} / HOSPITALITY RIDER\n${c.rider.status}\n\n${c.rider.intro}\n\nHOSPITALITY PREFERENCES\n` +
      c.rider.hospitality.map((x) => "- " + x).join("\n") +
      "\n\nTECHNICAL DETAILS TO CONFIRM\n" +
      c.rider.technicalToConfirm.map((x) => "- " + x).join("\n") +
      "\n\nOPTIONAL IDEAS TO CONSIDER - NOT REQUIREMENTS\n" +
      c.rider.optionalIdeas.map((x) => "- " + x).join("\n") +
      "\n"
    );
  }
  async function fileBytes(src) {
    const url = new URL(src, siteRoot);
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Could not load ${src} (${r.status}).`);
    return new Uint8Array(await r.arrayBuffer());
  }
  async function createPDF(kind = "epk") {
    if (!window.PDFLib)
      throw new Error("PDF library is missing. Check the vendor folder.");
    const { PDFDocument, StandardFonts, rgb, PDFString } = window.PDFLib;
    const pdf = await PDFDocument.create();
    pdf.setTitle(
      c.artist.name +
        (kind === "rider" ? " - Rider Draft" : " - Artist Press Sheet"),
    );
    pdf.setAuthor(c.artist.name + " / " + c.artist.brand);
    let regular, bold;
    try {
      pdf.registerFontkit(window.fontkit);
      regular = await pdf.embedFont(
        await fileBytes("assets/press-regular.ttf"),
        { subset: true },
      );
      bold = await pdf.embedFont(await fileBytes("assets/press-bold.ttf"), {
        subset: true,
      });
    } catch (error) {
      // Preserve text downloads when a browser blocks local-file font loading.
      regular = await pdf.embedFont(StandardFonts.Helvetica);
      bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    }
    const ink = rgb(0.15, 0.08, 0.09),
      red = rgb(0.59, 0.15, 0.18),
      muted = rgb(0.39, 0.34, 0.33),
      paper = rgb(0.98, 0.96, 0.93),
      line = rgb(0.82, 0.76, 0.72);
    const width = 595.28,
      height = 841.89,
      margin = 42,
      contentWidth = width - 2 * margin;
    let page, y;
    const drawText = (text, x, yy, size = 10, font = regular, color = ink) =>
      page.drawText(ascii(text), { x, y: yy, size, font, color });
    function newPage(first = false) {
      page = pdf.addPage([width, height]);
      page.drawRectangle({ x: 0, y: 0, width, height, color: paper });
      page.drawRectangle({
        x: 0,
        y: height - (first ? 158 : 86),
        width,
        height: first ? 158 : 86,
        color: ink,
      });
      drawText(
        c.artist.brand.toUpperCase() + " / SHADOW STAGE",
        margin,
        height - 30,
        8,
        regular,
        rgb(0.87, 0.72, 0.67),
      );
      const title = first
        ? c.artist.name.toUpperCase()
        : c.artist.name + " / continued";
      let size = first ? 36 : 21;
      while (bold.widthOfTextAtSize(ascii(title), size) > contentWidth) size--;
      drawText(title, margin, height - (first ? 83 : 60), size, bold, paper);
      if (first)
        drawText(
          kind === "rider" ? c.rider.status : c.press.summary,
          margin,
          height - 121,
          9,
          regular,
          rgb(0.93, 0.73, 0.66),
        );
      y = height - (first ? 188 : 116);
    }
    function ensure(space) {
      if (y - space < 68) newPage();
    }
    function wrap(text, size, font, maxWidth) {
      const lines = [];
      for (const paragraph of ascii(text).split("\n")) {
        let current = "";
        for (const word of paragraph.split(/\s+/).filter(Boolean)) {
          const next = current ? current + " " + word : word;
          if (font.widthOfTextAtSize(next, size) > maxWidth && current) {
            lines.push(current);
            current = word;
          } else current = next;
          if (font.widthOfTextAtSize(current, size) > maxWidth) {
            let part = "";
            for (const ch of current) {
              if (font.widthOfTextAtSize(part + ch, size) > maxWidth && part) {
                lines.push(part);
                part = ch;
              } else part += ch;
            }
            current = part;
          }
        }
        lines.push(current);
      }
      return lines;
    }
    function paragraph(
      text,
      {
        size = 10,
        leading = 15,
        x = margin,
        maxWidth = contentWidth,
        font = regular,
        color = ink,
        after = 12,
      } = {},
    ) {
      for (const textLine of wrap(text, size, font, maxWidth)) {
        ensure(leading);
        drawText(textLine, x, y, size, font, color);
        y -= leading;
      }
      y -= after;
    }
    function heading(text) {
      ensure(44);
      y -= 4;
      drawText(text.toUpperCase(), margin, y, 8, bold, red);
      y -= 21;
    }
    function link(label, url) {
      ensure(20);
      drawText(label, margin, y, 9, regular, red);
      const ref = pdf.context.register(
        pdf.context.obj({
          Type: "Annot",
          Subtype: "Link",
          Rect: [
            margin,
            y - 3,
            margin + regular.widthOfTextAtSize(ascii(label), 9),
            y + 12,
          ],
          Border: [0, 0, 0],
          A: { Type: "Action", S: "URI", URI: PDFString.of(url) },
        }),
      );
      page.node.addAnnot(ref);
      y -= 20;
    }
    newPage(true);
    if (kind === "rider") {
      heading("Hospitality rider / working draft");
      paragraph(c.rider.intro);
      heading("Hospitality preferences");
      c.rider.hospitality.forEach((text, i) => paragraph(`${i + 1}. ${text}`));
      heading("Technical details to confirm");
      c.rider.technicalToConfirm.forEach((text) =>
        paragraph("- " + text, { size: 9.5, leading: 14, after: 7 }),
      );
      heading("Optional ideas - not requirements");
      c.rider.optionalIdeas.forEach((text) =>
        paragraph("- " + text, { size: 9.5, leading: 14, after: 7 }),
      );
      heading("Advance contact");
      link(c.contactEmail, "mailto:" + c.contactEmail);
    } else {
      const top = y;
      let image;
      try {
        const bytes = await fileBytes(c.images.hero);
        image = /\.png(?:\?|$)/i.test(c.images.hero)
          ? await pdf.embedPng(bytes)
          : await pdf.embedJpg(bytes);
      } catch (e) {
        console.warn(
          "Press sheet photo could not load; text remains available.",
          e.message,
        );
      }
      heading("The artist");
      const bioWidth = image ? 310 : contentWidth;
      paragraph(c.bio.short, { maxWidth: bioWidth, size: 10.5, leading: 16 });
      if (image) {
        const dims = image.scaleToFit(168, 220);
        page.drawImage(image, {
          x: width - margin - 168 + (168 - dims.width) / 2,
          y: top - dims.height,
          width: dims.width,
          height: dims.height,
        });
        y = Math.min(y, top - dims.height - 22);
      }
      heading("The Unholy Trinity");
      for (const persona of Object.values(c.personas))
        paragraph(persona.name + " / " + persona.label, {
          font: regular,
          size: 12,
          leading: 16,
          after: 7,
        });
      heading("Selected music");
      paragraph(
        c.tracks
          .slice(0, 3)
          .map((t) => t.title)
          .join(" / "),
        { size: 10, leading: 15, after: 6 },
      );
      paragraph("Music may contain explicit lyrics.", {
        size: 8,
        leading: 12,
        color: muted,
        after: 10,
      });
      heading("Explore the work");
      link("Listen on Spotify", c.links.spotify);
      link("Listen on Apple Music", c.links.apple);
      link(
        "Watch " + c.films[0].title,
        "https://www.youtube.com/watch?v=" + c.films[0].id,
      );
      link("Creative portfolio", new URL(c.links.portfolio, siteRoot).href);
      heading("Booking / press / collaboration");
      link(c.contactEmail, "mailto:" + c.contactEmail);
      link(c.links.website, c.links.website);
    }
    pdf.getPages().forEach((p, i) => {
      p.drawLine({
        start: { x: margin, y: 47 },
        end: { x: width - margin, y: 47 },
        thickness: 0.5,
        color: line,
      });
      p.drawText(
        ascii(
          `${c.artist.brand.toUpperCase()} / ${c.press.updated} / ${i + 1} OF ${pdf.getPageCount()}`,
        ),
        { x: margin, y: 31, size: 7, font: regular, color: muted },
      );
    });
    return pdf.save();
  }
  async function bundle() {
    if (!window.JSZip)
      throw new Error("ZIP library is missing. Check the vendor folder.");
    const zip = new window.JSZip(),
      folder = zip.folder("Ashelic-Rose-Press-Kit");
    folder.file("Ashelic-Rose-EPK.pdf", await createPDF());
    folder.file("Ashelic-Rose-Bios.txt", bios());
    folder.file("Ashelic-Rose-Links.txt", links());
    folder.file("Press-Asset-Notes.txt", c.press.creditNote);
    for (const asset of c.assets)
      folder.file(asset.filename, await fileBytes(asset.src));
    if (c.press.includeRiderInBundle) {
      folder.file("Ashelic-Rose-Rider.pdf", await createPDF("rider"));
      folder.file("Ashelic-Rose-Rider.txt", riderText());
    }
    return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
  }
  function save(bytes, filename, type) {
    const url = URL.createObjectURL(new Blob([bytes], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  let messageTimer;
  function announce(text) {
    const element = document.querySelector("#toast, #download-status");
    if (!element) return;
    element.textContent = text;
    element.classList.add("visible");
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => element.classList.remove("visible"), 6500);
  }
  async function download(kind) {
    if (kind === "epk")
      save(await createPDF(), "Ashelic-Rose-EPK.pdf", "application/pdf");
    else if (kind === "bundle")
      save(await bundle(), "Ashelic-Rose-Press-Kit.zip", "application/zip");
    else if (kind === "bios")
      save(bios(), "Ashelic-Rose-Bios.txt", "text/plain;charset=utf-8");
    else if (kind === "links")
      save(links(), "Ashelic-Rose-Links.txt", "text/plain;charset=utf-8");
    else if (kind === "rider")
      save(
        await createPDF("rider"),
        "Ashelic-Rose-Rider-DRAFT.pdf",
        "application/pdf",
      );
  }
  document.querySelectorAll("[data-download]").forEach((a) =>
    a.addEventListener("click", async (event) => {
      event.preventDefault();
      if (a.getAttribute("aria-busy") === "true") return;
      a.setAttribute("aria-busy", "true");
      announce("Preparing your download…");
      try {
        await download(a.dataset.download);
        announce("Download ready.");
      } catch (e) {
        console.error(e);
        announce(
          "Download could not be generated. Use the printable document page, or preview through a local server.",
        );
      } finally {
        a.removeAttribute("aria-busy");
      }
    }),
  );
  window.ShadowDownloads = {
    createPDF,
    bundle,
    bios,
    links,
    riderText,
    download,
    officialLinks,
  };
})();
