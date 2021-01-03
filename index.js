AFRAME.registerComponent("capture-mouse", {
  init: function () {
    this.eventRepeater = this.eventRepeater.bind(this);
    this.el.sceneEl.addEventListener(
      "loaded",
      () => {
        this.el.sceneEl.canvas.addEventListener(
          "mousedown",
          this.eventRepeater
        );
        this.el.sceneEl.canvas.addEventListener("mouseup", this.eventRepeater);
        this.el.sceneEl.canvas.addEventListener(
          "touchstart",
          this.eventRepeater
        );
        this.el.sceneEl.canvas.addEventListener(
          "touchmove",
          this.eventRepeater
        );
        this.el.sceneEl.canvas.addEventListener("touchend", this.eventRepeater);
      },
      { once: true }
    );
  },
  eventRepeater: function (evt) {
    if (evt.type.startsWith("touch")) {
      evt.preventDefault();
      // avoid repeating touchmove because it interferes with look-controls
      if (evt.type === "touchmove") {
        return;
      }
    }
    this.el.emit(evt.type, evt.detail);
  },
});

// AFRAME.registerComponent("color-randomizer", {
//   play: function () {
//     this.el.addEventListener("drag-drop", function (evt) {
//       evt.detail.dropped.setAttribute(
//         "material",
//         "color",
//         "#" + ((Math.random() * 0xffffff) << 0).toString(16)
//       );
//       // color randomizer credit: http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript#comment6801353_5365036
//     });
//   },
// });

// AFRAME.registerComponent("score-counter", {
//   schema: {
//     el: {
//       type: "selector",
//     },
//     score: {
//       type: "int",
//       default: 0,
//     },
//   },
//   // dependencies: ["raycaster"],
//   init: function () {
//     var sceneEl = document.querySelector("a-scene");
//     var scoreBoard = document.querySelector("#score");

//     sceneEl
//       .querySelector("a-entity")
//       .addEventListener("raycaster-intersection", () => {
//         this.data.score++;
//         var newScore = "Score: " + this.data.score;
//         scoreBoard.setAttribute("text", "value", newScore);
//       });
//   },
// });

AFRAME.registerComponent("collider-check", {
  schema: {
    el: {
      type: "selector",
    },
    score: {
      type: "int",
      default: -1,
    },
  },
  dependencies: ["raycaster"],

  init: function () {
    var data = this.data;
    var el = this.el;
    // var sceneEl = document.querySelector("a-scene");
    var scoreBoard = document.querySelector("#score");
    this.el.addEventListener("raycaster-intersection", () => {
      console.log("Player hit something!");

      this.data.score++;
      var newScore = "Score: " + this.data.score;
      scoreBoard.setAttribute("text", "value", newScore);
    });
  },
});
