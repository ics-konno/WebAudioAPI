// window.addEventListener("load", init);
let audioContext = new AudioContext();

let pulseHz = 880;
let lofHz = 30;

window.addEventListener("load", () => {
  const button = document.querySelector("#start");
  button.addEventListener("click", () => {
    playPulse();
  });

  const hzCotrol = document.querySelector("#hz");
  hz.addEventListener(
    "input",
    () => {
      pulseHz = Number(hzCotrol.value);
    },
    false
  );

  const lfoControl = document.querySelector("#lfo");
  lfoControl.addEventListener(
    "input",
    () => {
      lofHz = Number(lfoControl.value);
    },
    false
  );
});

let pulseTime = 1;
function playPulse() {
  let osc = audioContext.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(pulseHz, audioContext.currentTime);

  let amp = audioContext.createGain();
  amp.gain.setValueAtTime(1, audioContext.currentTime);

  let lfo = audioContext.createOscillator();
  lfo.type = "square";
  lfo.frequency.setValueAtTime(lofHz, audioContext.currentTime);

  lfo.connect(amp.gain);
  osc.connect(amp).connect(audioContext.destination);
  lfo.start();
  osc.start();
  osc.stop(audioContext.currentTime + pulseTime);
}
