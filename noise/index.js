// window.addEventListener("load", init);
let audioContext = new AudioContext();

let noiseLength = 1;
let bandHz = 1000


window.addEventListener("load", () => {
  const button = document.querySelector("#start");
  button.addEventListener("click", () => {
    playNoise();
  });

  const durationControl = document.querySelector("#duration");
  durationControl.addEventListener(
    "input",
    () => {
      noiseLength = Number(durationControl.value);
    },
    false
  );

  const bandControl = document.querySelector("#band");
  bandControl.addEventListener(
    "input",
    () => {
      bandHz = Number(bandControl.value);
    },
    false
  );
});

function playNoise() {
  const bufferSize = audioContext.sampleRate * noiseLength;
  const buffer = audioContext.createBuffer(
    1,
    bufferSize,
    audioContext.sampleRate
  );

  let data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  let noise = audioContext.createBufferSource();
  noise.buffer = buffer;

  let bandpass = audioContext.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = bandHz;
  noise.connect(bandpass).connect(audioContext.destination);

  noise.start()
}
