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

<div class="h-screen items-center w-full" id="Footer">
    <div class="flex flex-col sm:flex-row justify-center w-screen sm:justify-evenly pt-32">
        <div class=" flex flex-col gap-4 place-items-center">
            <h1 class="text-5xl font-extrabold text-blue-600 w-[32rem]">Easy to use</h1>
            <p class="text-xl w-96 text-center md:text-left text-white">ReWriteDoc is easy to use and easy to understand. 0 code required to post a documentation. No HTML, CSS, or JS. We handle it all for you!</p>
        </div>	
        <LottiePlayer
            src="https://assets4.lottiefiles.com/packages/lf20_r3y35yp1.json"
            autoplay="{true}"
            stop="{0.1}"
            loop="{true}"
            controls="{false}"
            renderer="svg"
            background="transparent"
            height="{350}"
            width="{350}"
            controlsLayout="{controlsLayout}" />
    </div>
</div>