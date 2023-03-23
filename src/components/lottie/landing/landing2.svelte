<script>
    import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
  
    let controlsLayout = [
      'previousFrame',
      'playpause',
      'stop',
      'nextFrame',
      'progress',
      'frame',
      'loop',
      'spacer',
      'background',
      'snapshot',
      'zoom',
      'info',
      'useHardwareAcceleration',
      'renderer',
      'quality',

    ];

  </script>
  
<main>
  <LottiePlayer
    src= {"https://assets8.lottiefiles.com/private_files/lf30_wqypnpu5.json"} 
    autoplay="{true}"
    loop="{true}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{400}"
    width="{400}"
    useHardwareAcceleration="{true}"
    controlsLayout="{controlsLayout}"
    setFrsetFrameRate(60f)  />
</main>