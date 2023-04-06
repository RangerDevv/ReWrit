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

    export let src= "";
  </script>
  
<main>
  <LottiePlayer
    src= {src}
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