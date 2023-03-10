<script lang="ts">
  import { prevent_default } from "svelte/internal";




export let value: string = "";
// add bold to the selected text
function bold(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "**" + selected + "**";
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.selectionStart = start + 2;
    text.selectionEnd = end + 2;
}
</script>

<div class=" w-96 sm:w-1/2 bg-gray-700 rounded-t-lg items-center h-10">
<button class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-tl-lg" on:click={bold
}><strong>B</strong></button>
</div>
<textarea rows="6" bind:value={value} placeholder="Contents (This text editor uses Markdown. Please use the markdown syntax.)" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-b-lg outline-none"/>