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
    src= {"https://assets8.lottiefiles.com/packages/lf20_3rwasyjy.json"}
    autoplay="{true}"
    loop="{false}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{400}"
    width="{400}"

    controlsLayout="{controlsLayout}"
   />
</main>