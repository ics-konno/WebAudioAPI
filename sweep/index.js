// window.addEventListener("load", init);
let audioContext = new AudioContext();
// createPeriodicWaveは配列から音を作成する
let wave = audioContext.createPeriodicWave(wavetable.real, wavetable.imag);

let attackTime = 0.2;
let releaseTime = 0.2;
let sweepLength = 2

window.addEventListener("load", () => {
  const button = document.querySelector("#start");
  button.addEventListener("click", () => {
    playSweep();
  });

  const attackCotrol = document.querySelector("#attack");
  attackCotrol.addEventListener(
    "input",
    () => {
      attackTime = Number(attackCotrol.value);
    },
    false
  );

  const releaseCotrol = document.querySelector("#release");
  releaseCotrol.addEventListener(
    "input",
    () => {
      releaseTime = Number(releaseCotrol.value);
    },
    false
  );
});

function playSweep() {
  const osc = audioContext.createOscillator();
  // oscillatorにwaveをセットすることで鳴らせる
  osc.setPeriodicWave(wave);
  osc.frequency.value = 440;

  let sweepEnv = audioContext.createGain()
  sweepEnv.gain.cancelScheduledValues(audioContext.currentTime)
  sweepEnv.gain.setValueAtTime(0, audioContext.currentTime)

  // 現在時間+attackTimeまで1に近づく
  sweepEnv.gain.linearRampToValueAtTime(1, audioContext.currentTime + attackTime)
  // 終わり時間-releaseTimeまで0に近づく
  sweepEnv.gain.linearRampToValueAtTime(0, audioContext.currentTime + sweepLength - releaseTime)

  osc.connect(sweepEnv).connect(audioContext.destination);
  console.log("hi")
  osc.start();
  osc.stop(audioContext.currentTime + sweepLength);
}
