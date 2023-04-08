<script lang="ts">
    import { supabase } from "../../lib/backend";
    import { onMount } from "svelte";
    import type { Comments } from "../../lib/db";


    interface Comments {
        id?:number,
        created_at?:string,
        number:number,
        text:string,
        cmntof:number,
    }

    export let id= 0;
    let comments: Comments[] = [];

    let comment: Comments = {
        created_at: new Date().toISOString(),
        number: 0,
        text: "",
        cmntof: id,
    }

    onMount(async () => {
        const { data, error } = await supabase.from("Comments").select("*").eq("cmntof", id);
        if (error) {
            console.log(error);
        } else {
            comments = data as Comments[];
        }
    });

    async function addComment() {
        const { data, error } = await supabase.from("Comments").insert(comment);
        if (error) {
            console.log(error);
        } else {
            comments = [...comments];
        }
    }
    // generate a random character
    const randomChar = () => {
        const n = Math.floor(Math.random() * 62);
        if (n < 10) return n; //1-10
        if (n < 36) return String.fromCharCode(n + 55); //A-Z
        return String.fromCharCode(n + 61); //a-z
    };

    $: disabled = comment.text.length < 1;
</script>

<label for="my-modal-5" class="btn btn-secondary">Comments</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-5" class="modal-toggle" />
<div class="modal ">
  <div class="modal-box w-11/12 max-w-5xl h-96 overflow-y-auto bg-zinc-800">
    <div class=" flex flex-row justify-between">
        <h1 class="text-white text-xl">Comments</h1>
        <!-- make a svg X button -->
        <div class="modal-action">
            <label for="my-modal-5" class="btn btn-error">Close</label>
          </div>
        </div>
        <div>
            <form>
       <div class="w-full mb-4 rounded-lg mt-6">
           <div class="px-4 py-2 bg-transparent rounded-t-lg">
               <label for="comment" class="sr-only">Your comment</label>
               <textarea bind:value={comment.text} id="comment" rows="2" class="w-full px-0 text-sm focus:ring-0 bg-transparent outline-none" placeholder="Write a comment..." required></textarea>
           </div>
           <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 overflow-y-auto rounded-b-lg">
               <button on:click={addComment} type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:bg-gray-400" {disabled}>
                   Post comment
               </button>
           </div>
       </div>
    </form>
    </div>
    <div>
        {#each comments as coment}
            <div class="gap-3 flex flex-row">
                <img src={`https://avatars.dicebear.com/api/bottts/${randomChar()}.svg?options[mood][]=happy`} alt="avatar" class="w-10 h-10 rounded-full mt-2" />
                <div class="flex flex-col">
                <p class="text-gray-400 text-sm">{coment.created_at?.slice(0,10)}</p>
                <p class="whitespace-pre-wrap w-full text-md">{coment.text}</p>
                </div>
            </div>
        {/each}
    </div>
  </div>
</div>

<style>
    /* change the styling of scroll bar */
    ::-webkit-scrollbar {
        width: 10px;
    }

</style>