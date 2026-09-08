document.querySelectorAll(".vendor-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 3;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -3;

    card.style.transform =
      `perspective(900px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});