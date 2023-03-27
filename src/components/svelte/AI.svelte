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
</script>

<main class="items-center">
{#if APIKey==''}
  <!-- <input bind:value={APIKey} /> -->
  <div class="form-control">
    <label class="label">
      <span class="label-text">APIKey</span>
    </label>
    <label class="input-group">
      <span>ApiKey</span>
      <input type="text" placeholder="Paste APIKEY here" class="input input-bordered" bind:value={APIKey} />
    </label>
    <label class="label">
      <span class="label-text"><a href="https://beta.openai.com/account/api-keys" class="text-blue-700 underline">Get APIKey</a></span>
    </label>
  </div>
{:else}
  <!-- <input bind:value={prompt} class="w-full" />
  <button on:click={fetchAI}>Ask</button>
  <p class="whitespace-pre-wrap">{result}</p> -->
  <div class="form-control">
    <div class="input-group">
      <input type="text" placeholder="Search…" class="input input-bordered" bind:value={prompt} />
      <button class="btn btn-square bg-zinc-700" on:click={fetchAI}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </button>
    </div>
  </div>
{/if}

<p class="whitespace-pre-wrap">{result}</p>
</main>