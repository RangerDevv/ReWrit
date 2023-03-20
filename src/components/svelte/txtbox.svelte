<script lang="ts">
  import { prevent_default } from "svelte/internal";
  import Mdxpreview from "./mdxpreview.svelte";

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
    text.focus();
    text.selectionStart = start + 2;
    text.selectionEnd = end + 2;
    // update the value
    value = text.value;
}
// add italic to the selected text
function italic(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "*" + selected + "*";
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 1;
    text.selectionEnd = end + 1;
    // update the value
    value = text.value;
}
// add strikethrough to the selected text
function strikethrough(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "~~" + selected + "~~";
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 2;
    text.selectionEnd = end + 2;
    // update the value
    value = text.value;
}
// add code to the selected text
function code(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "`" + selected + "`";
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 1;
    text.selectionEnd = end + 1;
    // update the value
    value = text.value;
}
// add link to the selected text
function link(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "[" + selected + "](https://)";
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 1;
    text.selectionEnd = end + 1;
    // update the value
    value = text.value;
}
// headings 
function h1(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "# " + selected;
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 2;
    text.selectionEnd = end + 2;
    // update the value
    value = text.value;
}
function h2(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "## " + selected;
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 3;
    text.selectionEnd = end + 3;
    // update the value
    value = text.value;
}
function h3(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "### " + selected;
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 4;
    text.selectionEnd = end + 4;
    // update the value
    value = text.value;
}
function h4(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "#### " + selected;
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 5;
    text.selectionEnd = end + 5;
    // update the value
    value = text.value;
}
function h5(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "##### " + selected;
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 6;
    text.selectionEnd = end + 6;
    // update the value
    value = text.value;
}
function h6(this: any) {
    prevent_default;
    let text = this.parentNode.parentNode.querySelector("textarea");
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selected = text.value.substring(start, end);
    let replacement = "###### " + selected;
    text.value = text.value.substring(0, start) + replacement + text.value.substring(end);
    text.focus();
    text.selectionStart = start + 7;
    text.selectionEnd = end + 7;
    // update the value
    value = text.value;
}

let is_prev = false;

function togglePreview(this: any) {
    // get all the preview and editor elements
    let preview = this.parentNode.parentNode.querySelector("#preview");
    let editor = this.parentNode.parentNode.querySelector("#editor");

    if (preview == null || editor == null) return;
    //   do it to all the elements
    if (is_prev) {
        preview.style.display = "none";
        editor.style.display = "block";
        is_prev = false;
    } else {
        preview.style.display = "block";
        editor.style.display = "none";
        is_prev = true;
    }
}
</script>

<div class="flex w-96 sm:w-1/2 bg-gray-700 rounded-t-lg items-center h-auto overflow-x-auto">

<!-- headings -->
<button class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50  focus:ring-blue-500 focus: dark:bg-gray-700 dark: dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus: rounded-tl-lg" on:click={h1}><h1 class="text-xl">Heading 1</h1></button>
<button class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50  focus:ring-blue-500 focus: dark:bg-gray-700 dark: dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:" on:click={h2}><h2 class=" text-lg">Heading 2</h2></button>
<button class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50  focus:ring-blue-500 focus: dark:bg-gray-700 dark: dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:" on:click={h3}><h3 class="text-md">Heading 3</h3></button>
<button class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50  focus:ring-blue-500 focus: dark:bg-gray-700 dark: dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus: rounded-tl-lg" on:click={bold
}><strong>B</strong></button>
<button class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50  focus:ring-blue-500 focus: dark:bg-gray-700 dark: dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:" on:click={italic}><em>I</em></button>
<button class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50  focus:ring-blue-500 focus: dark:bg-gray-700 dark: dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:" on:click={strikethrough}><s>S</s></button>
<button class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50  focus:ring-blue-500 focus: dark:bg-gray-700 dark: dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus: " on:click={code}><code>Code</code></button>
<!-- link -->
<button class="block w-auto text-sm pt-2 text-gray-900 bg-gray-50  focus:ring-blue-500 focus: dark:bg-gray-700 dark: dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus: rounded-tr-lg" on:click={link}>
<svg width="30px" height="30px" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <g>
      <path d="m409.54 260.86c-3.8633-8.6836-9.2812-16.855-16.406-23.98-7.1289-7.1211-15.297-12.543-23.98-16.406l-10.758 10.758-7.4727 7.4688-7.7578 7.7578c-1.4414 1.4375-2.668 3-3.7383 4.6367 10.297 0.67188 19.934 4.8242 27.297 12.191 7.5742 7.5664 11.512 17.316 12.164 27.234 0.37109 5.5117-0.30859 11.035-2.0781 16.328-1.9609 5.8867-5.125 11.438-9.7148 16.172-0.14453 0.13672-0.22656 0.30859-0.35938 0.44922l-8.8086 8.8008-12.219 12.219-11.398 11.406-29.715 29.715c-8.0391 8.0391-18.719 12.457-30.098 12.457-11.355 0-22.055-4.4297-30.098-12.469-8.0273-8.0273-12.453-18.719-12.453-30.086 0-11.367 4.418-22.062 12.457-30.098l29.758-29.762c-1.7031-5.2773-2.918-10.68-3.6641-16.129-0.55469-4.0625-0.92969-8.1523-0.94922-12.246-0.054687-7.5312 0.875-15.055 2.6172-22.422l-54.172 54.164c-31.188 31.199-31.188 81.789 0 112.99 15.602 15.59 36.047 23.398 56.488 23.398 20.453 0 40.898-7.8008 56.492-23.398l54.086-54.086 8.0547-8.0469c4.6094-4.6133 8.457-9.6914 11.699-15.027 5.1055-8.3711 8.5781-17.441 10.312-26.801 0.89453-4.8125 1.3711-9.6875 1.3711-14.57 0.011718-5.9609-0.72266-11.91-2.0391-17.754-1.1289-5.0781-2.7695-10.051-4.918-14.863z" fill="white"/>
      <path d="m482 148.01c-15.602-15.598-36.051-23.398-56.488-23.398-20.453 0.003906-40.898 7.8008-56.492 23.402l-62.137 62.137c-4.6133 4.6133-8.457 9.6914-11.703 15.02-5.1016 8.3711-8.5781 17.441-10.32 26.801-0.89453 4.8125-1.3711 9.6914-1.3711 14.57-0.003906 5.9609 0.72266 11.91 2.0391 17.758 1.1484 5.0664 2.7891 10.043 4.9414 14.859 3.8633 8.6758 9.2773 16.844 16.406 23.969s15.293 12.543 23.98 16.41l10.75-10.75 7.4727-7.4688 7.75-7.75c1.4414-1.4414 2.6719-3.0039 3.7422-4.6445-10.301-0.67188-19.938-4.8164-27.309-12.191-7.5859-7.5781-11.523-17.348-12.176-27.289-0.35547-5.4961 0.33984-10.988 2.0977-16.273 1.9531-5.8867 5.1133-11.445 9.7148-16.172 0.13672-0.13672 0.22656-0.30469 0.36719-0.44922l8.8047-8.8047 12.227-12.219 11.406-11.406 29.707-29.703c8.0391-8.0391 18.723-12.469 30.102-12.469 11.367 0 22.055 4.4297 30.086 12.465 16.602 16.594 16.602 43.598 0.011719 60.188l-29.77 29.762c1.707 5.2852 2.918 10.68 3.6641 16.133 0.55859 4.0625 0.92969 8.1523 0.94922 12.242 0.054687 7.5352-0.87109 15.055-2.6289 22.422l54.176-54.164c31.188-31.199 31.188-81.785 0-112.98z" fill="white"/>
      <use x="70" y="643.167969" xlink:href="#x" fill="white"/>
     </g>
</svg>
</button>
<!-- preview -->
<button class=" flex justify-center pl-4" on:click={togglePreview}>
<svg fill="#FFFFFF" height="24" width="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 488.85 488.85" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M244.425,98.725c-93.4,0-178.1,51.1-240.6,134.1c-5.1,6.8-5.1,16.3,0,23.1c62.5,83.1,147.2,134.2,240.6,134.2 s178.1-51.1,240.6-134.1c5.1-6.8,5.1-16.3,0-23.1C422.525,149.825,337.825,98.725,244.425,98.725z M251.125,347.025 c-62,3.9-113.2-47.2-109.3-109.3c3.2-51.2,44.7-92.7,95.9-95.9c62-3.9,113.2,47.2,109.3,109.3 C343.725,302.225,302.225,343.725,251.125,347.025z M248.025,299.625c-33.4,2.1-61-25.4-58.8-58.8c1.7-27.6,24.1-49.9,51.7-51.7 c33.4-2.1,61,25.4,58.8,58.8C297.925,275.625,275.525,297.925,248.025,299.625z"></path> </g> </g></svg>
  </button>  
</div>
<div class=" w-96 sm:w-1/2 h-80 overflow-y-scroll bg-gray-700 p-3 text-white" id="preview">
    <Mdxpreview content={value}/>
</div>
<div id="editor" class="w-96 sm:w-1/2">
<textarea rows="15" bind:value={value} placeholder="Contents (This text editor uses Markdown. Please use the markdown syntax.)" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-b-lg outline-none"/>
</div>

<style>

    #preview {
        display: none;
    }

    #editor {
        display: block;
    }

</style>