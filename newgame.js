AFRAME.registerComponent("refresh", {
  init: function () {
    this.el.addEventListener("click", function (evt) {
      window.location.reload();
    });
  },
});
