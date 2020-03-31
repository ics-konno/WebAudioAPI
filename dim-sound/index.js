const boxes = document.querySelectorAll(".box");

const options = {
  root: null,
  rootMargin: "-50% 0px",
  threshold: 0
};

const observer = new IntersectionObserver(intersect, options);

boxes.forEach(box => {
  observer.observe(box);
});

function intersect(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      console.log("intersect!");
    }
  });
}
