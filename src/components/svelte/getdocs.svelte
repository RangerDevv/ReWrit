<script lang="ts">
    import { supabase } from '../../lib/backend';
    import type { Contents,Documentation } from '../../lib/db';
    import { onMount } from 'svelte';
    import 'highlight.js/styles/github-dark.css';
    import hljs from 'highlight.js';
    import code from 'highlight.js/lib/languages/javascript';
    import SvelteMarkdown from 'svelte-markdown';

    export let pid: any;
    let contentText: Contents[] = [];
    async function getDoc() {
        const { data, error } = await supabase
        // get contents table
        .from('Contents')
        .select('*')
        // order by when it was created
        .order('number', { ascending: true })
        .eq('connect', pid);
        contentText = data as Contents[];
        console.log(error);
    }

    onMount(async () => {
        await getDoc();
        const Code = document.querySelectorAll('#Code');
        hljs.registerLanguage('javascript', code);
        // loop through all the elements and highlight them
        Code.forEach((block) => {
          hljs.highlightBlock(block as HTMLElement);
        });
    });
</script>

<main>
<div>
<div class="">
  {#each contentText as content}
            <div class="">
              {#if content.is_code}
              <div class="">
                <pre class="" id="Code"><code>{content.text}</code></pre>
                </div>
              {:else}
              <!-- <p class="text-left text-lg text-white">{@html content.text}</p> -->
              <div class="">
              <SvelteMarkdown source={content.text} />
              </div>
              {/if}
            </div>
  {/each}
    </div>
</div>

<style>
  /* add padding and make text white */
  main {
      padding: 1.5rem;
      color: white;
  }
  /* make the headings like headings */
  h1 {
      font-size: 2rem;
      font-weight: bold;
  }
  h2 {
      font-size: 1.5rem;
  }
  h3 {
      font-size: 1.25rem;
  }
  h4 {
      font-size: 1rem;
  }
  h5 {
      font-size: 0.875rem;
  }
  h6 {
      font-size: 0.75rem;
  }

  #Code {
     width: 32rem;
    height: 20rem;
    overflow: auto;
    /* white space pre wrap */
    white-space: pre-wrap;
    /* center */
    margin: 0 auto;
    
  }
</style>
</main>

