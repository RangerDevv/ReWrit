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
    <!--  loop through the content and display only is_toc = true as a table of contents -->
    <div class="" id="Tableofcontents">
        <h1 class="">📰Contents</h1>
        <div class="">
            <ul class="">
                {#each contentText as content}
                    {#if content.is_toc}
                        <li class="">
                           <SvelteMarkdown source={content.text} />
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
<div class="body">
  {#each contentText as content}
            <div class="">
              {#if content.is_code}
              <div class="">
                <pre class="" id="Code"><code>{content.text}</code></pre>
                </div>
              {:else}
              <!-- <p class="text-left text-lg text-white">{@html content.text}</p> -->
              <div class="">
                {#if content.is_toc == false}
              <SvelteMarkdown source={content.text} />
                {/if}
              </div>
              {/if}
            </div>
  {/each}
    </div>
</div>
<style>
  /* add padding and make text white */
  main {
      padding: 3rem;
      color: white;
  }

  /* make the padding less on mobile */
    @media (max-width: 600px) {
        main {
            padding: 1rem;
        }
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
  p {
      font-size: 1.2rem;
  }
  a {
      color: #00b3ff;
  }
  a:hover {
      color: #00b3ff;
      text-decoration: underline;
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

  .body {
    white-space: pre-wrap;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100vh;
  }

  /* make the table of contents to the left of the the main content */
  #Tableofcontents {
        width: 20rem;
        overflow: auto;
        float: left;
        height: 100vh;
        /* increase size of text */
        font-size: 1.2rem;
    }
    /* hide the table of contents on mobile screen */
    @media (max-width: 600px) {
        #Tableofcontents {
            display: none;
        }
    }

</style>
</main>

