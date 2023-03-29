<script>
  import { onMount } from 'svelte';
  let result = '';
  let APIKey = '';
  let prompt = '';

async function fetchAI() {
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + APIKey,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.9,
      })
    });
    const data = await response.json();
    // error 
    if (data.error) {
      result = data.error;
    } else {
      result = data.choices[0].text;
    }
  };

  // if the user presses enter, fetch the AI
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      fetchAI();
    }
  }
  
  // if the user presses ctrl+k, open the modal
  function handleKeyDown2(event) {
    if (event.key === '.' && event.ctrlKey) {
      document.getElementById("my-modal-3").checked = true;
    }
  }
  // when the user presses escape, close the modal
  function handleKeyDown3(event) {
    if (event.key === 'Escape') {
      document.getElementById("my-modal-3").checked = false;
    }
  }

  onMount(() => {
    // add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKeyDown2);
    window.addEventListener('keydown', handleKeyDown3);
    // remove event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleKeyDown2);
      window.removeEventListener('keydown', handleKeyDown3);
    };
  });
</script>
<div class="tooltip pt-2" data-tip="AI">
<label for="my-modal-3" class="text-lg bg-white px-6 py-2 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out">🤖</label>
</div>


<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative w-96 sm:w-[40rem] h-96 overflow-y-scroll">
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
<main class="items-center">
{#if APIKey==''}
  <!-- <input bind:value={APIKey} /> -->
  <div class="form-control">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="label">
      <span class="label-text">APIKey</span>
    </label>
    <label class="input-group">
      <span>ApiKey</span>
      <input type="text" placeholder="Paste APIKEY here" class="w-80  self-center input input-bordered" bind:value={APIKey}/>
    </label>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="label">
      <span class="label-text"><a href="https://beta.openai.com/account/api-keys" class="text-blue-700 underline">Get APIKey</a></span>
    </label>
  </div>
{:else}
  <!-- <input bind:value={prompt} class="w-full" />
  <button on:click={fetchAI}>Ask</button>
  <p class="whitespace-pre-wrap">{result}</p> -->
  <div class="form-control self-center mx-auto" id="prompt">
    <div class="input-group">
      <input type="text" placeholder="Make me a tutorial on HTML div tags" class="input w-80 input-bordered input-success" bind:value={prompt} id="prompt"/>
      <button class="btn btn-square bg-zinc-700" on:click={fetchAI}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </button>
    </div>
  </div>
{/if}

<div class="chat chat-start">
  <div class="chat-bubble"><p class="whitespace-pre-wrap">{result}</p></div>
</div>
</main>
</div>
</div>

<style>
  /* hide scrollbar */
  .modal-box::-webkit-scrollbar {
    display: none;
  }
/*  make the prompt sticky */
#prompt {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>