<script lang="ts">
    import { prevent_default } from "svelte/internal";
    import 'highlight.js/styles/github-dark.css';
    import { HighlightAuto } from "svelte-highlight";

  export let value: string = "";
  // add bold to the selected text
  </script>
  
  <div id="editor" class="w-96 sm:w-1/2 stack">
  <div class="stack">
    <div class="grid place-content-center">  <textarea rows="15" bind:value={value} placeholder="Contents (This text editor uses Markdown. Please use the markdown syntax.)" class="grid p-2.5 w-full text-sm text-gray-900 bg-transparent border border-gray-300 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-b-lg outline-none" /></div> 
  <div class="grid place-content-center w-full h-40">  <HighlightAuto code={value} class="grid" /></div> 
  </div>
  </div>
  
  <style>
  
      #editor {
          display: block;
      }
  
  </style>
  