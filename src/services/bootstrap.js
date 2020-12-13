export function closeOneModal(modalId) {
  const modal = document.getElementById(modalId);

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("style", "display: none");

  const modalBackdrops = document.getElementsByClassName("modal-backdrop");
  document.body.removeChild(modalBackdrops[0]);
}
