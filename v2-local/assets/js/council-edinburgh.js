<script>

(function () {
  function initNativeDialogs() {
    document.addEventListener("click", function (event) {
      const trigger = event.target.closest("[data-modal-open]");
      if (!trigger) return;

      const modalId = trigger.getAttribute("data-modal-open");
      const modal = document.getElementById(modalId);

      if (!modal || typeof modal.showModal !== "function") return;

      event.preventDefault();
      modal.showModal();
    });

    document.addEventListener("click", function (event) {
      const modal = event.target.closest("dialog.si-modal");

      if (!modal || event.target !== modal) return;

      modal.close();
    });
  }

  initNativeDialogs();
})();

</script>