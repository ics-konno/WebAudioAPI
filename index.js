window.addEventListener("load", () => {
  const audioContext = new AudioContext();
  const audioElement = document.querySelector("audio");

  const track = audioContext.createMediaElementSource(audioElement);
//   track.connect(audioContext.destination);

  const gainNode = audioContext.createGain()
//   track.connect(gainNode).connect(audioContext.destination)

  const playButton = document.querySelector("button");
  playButton.addEventListener(
    "click",
    () => {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      if (playButton.dataset.playing === "false") {
        audioElement.play();
        playButton.dataset.playing = "true";
      } else if (playButton.dataset.playing === "true") {
        audioElement.pause();
        playButton.dataset.playing = "false";
      }
    },
    false
  );

  const volumeControl = document.querySelector("#volume")
  volumeControl.addEventListener("input", () => {
      gainNode.gain.value = volumeControl.value
  }, false)

  const pannerOptions = {pan: 0}
  const panner = new StereoPannerNode(audioContext, pannerOptions)
  const pannerControl = document.querySelector("#panner")
  pannerControl.addEventListener("input", () => {
      panner.pan.value = pannerControl.value
  }, false)
  track.connect(gainNode).connect(panner).connect(audioContext.destination)
});
