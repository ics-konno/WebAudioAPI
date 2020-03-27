// window.addEventListener("load", init);
let audioContext = new AudioContext();

let playbackRate = 1;

window.addEventListener("load", () => {
  const button = document.querySelector("#start");
  button.addEventListener("click", () => {
    setupSample().then(sample => {
      playSample(audioContext, sample);
    });
  });

  const rateControl = document.querySelector("#rate");
  rateControl.addEventListener(
    "input",
    () => {
      playbackRate = Number(rateControl.value);
    },
    false
  );
});

// 音声データを受け取ってaudioBufferにdecodeする関数
async function getFile(audioContext, filePath) {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

async function setupSample() {
  const filePath = "./dtmf.mp3";
  const sample = await getFile(audioContext, filePath);
  return sample;
}

function playSample(audioContext, audioBuffer) {
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.playbackRate.setValueAtTime(
    playbackRate,
    audioContext.currentTime
  );
  sampleSource.connect(audioContext.destination);
  sampleSource.start();
  return sampleSource;
}
