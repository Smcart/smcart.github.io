window.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var navigation = document.getElementById("primary-navigation");
  menuToggle.addEventListener("click", function () {
    var expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navigation.classList.toggle("is-open", !expanded);
  });
  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
  document
    .querySelectorAll("video[data-poster-srcset]")
    .forEach(function (video) {
      var poster = new Image();
      poster.addEventListener("load", function () {
        video.poster = poster.currentSrc || poster.src;
      });
      poster.addEventListener("error", function () {
        console.error(
          "Unable to load responsive video poster:",
          poster.currentSrc || poster.src,
        );
      });
      poster.sizes = video.dataset.posterSizes;
      poster.srcset = video.dataset.posterSrcset;
      poster.src = "./img/olo_grab_optimized.jpg";
    });
  document
    .querySelectorAll(".youtube-placeholder[data-video-id]")
    .forEach(function (placeholder) {
      placeholder.addEventListener("click", function (event) {
        if (window.location.protocol === "file:") return;
        event.preventDefault();
        var videoId = placeholder.dataset.videoId;
        var frame = document.createElement("iframe");
        frame.src =
          "https://www.youtube-nocookie.com/embed/" +
          encodeURIComponent(videoId) +
          "?autoplay=1";
        frame.title = placeholder.dataset.videoTitle;
        frame.loading = "lazy";
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        frame.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        frame.allowFullscreen = true;
        placeholder.replaceWith(frame);
      });
    });
  if (window.baguetteBox) baguetteBox.run(".gallery");
});
