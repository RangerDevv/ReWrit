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
<div class=" place-items-center">
  {#each contentText as content}
            <div class="flex flex-col gap-2 pl-6 sm:pl-12 pt-2">
              {#if content.is_code}
              <div class="w-96 sm:w-1/2 h-72 mt-6 rounded-lg place-self-center">
                <pre class="overflow-auto h-72 whitespace-pre-wrap rounded-lg"><code id="Code">{content.text}</code></pre>
                </div>
              {:else}
              <!-- <p class="text-left text-lg text-white">{@html content.text}</p> -->
              <div class=" text-white">
              <SvelteMarkdown source={content.text} />
            </div>
              {/if}
            </div>
  {/each}
    </div>
</div>
</main>