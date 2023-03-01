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
    ];
  </script>
  <div class="flex justify-center flex-col w-screen items-center">
  <LottiePlayer
    src="https://assets5.lottiefiles.com/packages/lf20_j3gumpgp.json"
    autoplay="{true}"
    loop="{true}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{450}"
    width="{450}"
    controlsLayout="{controlsLayout}"
  />
  <p class="text-white text-3xl text-center font-extrabold">Sorry, but this page does not exist.</p>
</div>