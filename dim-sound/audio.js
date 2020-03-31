
const audioContext = new AudioContext();
const panner = audioContext.createPanner()

panner.panningModel = "HRTF"
panner.distanceModel = "inverse"
panner.refDistance = 1;
panner.maxDistance = 10000;
panner.rolloffFactor = 1;
panner.coneInnerAngle = 360;
panner.coneOuterAngle = 0;
panner.coneOuterGain = 0;

panner.orientationX.setValueAtTime(1, audioContext.currentTime)
panner.orientationY.setValueAtTime(0, audioContext.currentTime)
panner.orientationZ.setValueAtTime(0, audioContext.currentTime)


// 音声データを受け取ってaudioBufferにdecodeする関数
async function getFile(audioContext, filePath) {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }
  
  async function setupSample() {
    // const filePath = path;
    const sample1 = await getFile(audioContext, "./summer_streets1.mp3");
    return sample1
  }

  let playbackRate=1
  let source
function playSample(audioContext, buffer){
    source = audioContext.createBufferSource()
    source.buffer = buffer
    source.playbackRate.setValueAtTime(
      playbackRate,
      audioContext.currentTime
    )
    source.connect(panner).connect(audioContext.destination)
    source.start(0)
}

const listener = audioContext.listener

listener.forwardX.setValueAtTime(0, audioContext.currentTime)
listener.forwardY.setValueAtTime(0, audioContext.currentTime)
listener.forwardZ.setValueAtTime(-1, audioContext.currentTime)
listener.upX.value = 0;
listener.upY.value = 1;
listener.upZ.value = 0;


const button = document.querySelector(".play")
button.addEventListener("click",async () => {
  const sample = await setupSample()
  playSample(audioContext,sample)
  panner.positionX.value = -5
})



const stop = document.querySelector(".stop")
stop.addEventListener("click", () => {
  source.stop(0)
})

const wrapper = document.querySelector(".box")
const height = wrapper.clientHeight - window.innerHeight
document.addEventListener("scroll", () => {
console.log(window.pageYOffset/height)

  panner.positionX.value = (window.pageYOffset/height - 0.5) * 10
})