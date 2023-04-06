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


<div class="items-center w-full" id="Features">
    <div class="flex flex-col place-items-center">
        <h1 class="text-5xl font-extrabold text-center text-blue-600">Features</h1>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-8">
            <div class="flex flex-col place-items-center">
                <LottiePlayer
                src="https://assets8.lottiefiles.com/packages/lf20_3rwasyjy.json"
                autoplay="{true}"
                loop="{false}"
                controls="{false}"
                renderer="svg"
                background="transparent"
                height="{350}"
                width="{350}"
                controlsLayout="{controlsLayout}"
                />
                <h1 class="text-3xl font-extrabold text-center text-blue-600">Read</h1>
                <p class="text-xl w-96 text-center text-white">Read documentation in a better way.</p>
            </div>
            <div class="flex flex-col place-items-center">
                <LottiePlayer
                src="https://assets8.lottiefiles.com/private_files/lf30_wqypnpu5.json"
                autoplay="{true}"
                loop="{false}"
                controls="{false}"
                renderer="svg"
                background="transparent"
                height="{350}"
                width="{350}"
                controlsLayout="{controlsLayout}"
                />
                <h1 class="text-3xl font-extrabold text-center text-blue-600">Write</h1>
                <p class="text-xl w-96 text-center text-white">Write documentation on undocumentaed topics.</p>
            </div>
        </div>
    </div>
</div>