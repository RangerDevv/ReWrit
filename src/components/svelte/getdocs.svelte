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
</main>

<style>
  /* add padding and make text white */
  main {
      padding: 1rem;
      color: white;
  }
  /* make the headings like headings */
  h1 {
      font-size: 2rem;
  }
</style>