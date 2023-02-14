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
            comments = data;
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

    function showComments() {
        let modal = document.getElementById('modal')!;
        modal.style.display = "block";
        // close the modal when the user clicks outside of it
    }

    function hideComments() {
        let modal = document.getElementById('modal')!;
        modal.style.display = "none";
    }

    // generate a random character
    const randomChar = () => {
        const n = Math.floor(Math.random() * 62);
        if (n < 10) return n; //1-10
        if (n < 36) return String.fromCharCode(n + 55); //A-Z
        return String.fromCharCode(n + 61); //a-z
    };
</script>

<button class="btn btn-error btn-sm btn-square btn-outline text-white font-bold place-self-center w-20 h-12 text-xl bg-blue-700 rounded-lg mt-5" id="btn" on:click={showComments}>
    Chat
</button>

<main class=" w-96 sm:w-7/12 h-96 place-self-center bg-slate-900 fixed p-10 overflow-auto rounded-2xl" id='modal'>
    <div class=" flex flex-row justify-between">
    <h1 class="text-white text-xl">Comments</h1>
    <!-- make a svg X button -->
    <button class="btn btn-error btn-sm btn-square btn-outline text-red-700 font-extrabold" on:click={hideComments}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
    </div>
    <div>
        <form>
   <div class="w-full mb-4 rounded-lg mt-6">
       <div class="px-4 py-2 bg-transparent rounded-t-lg">
           <label for="comment" class="sr-only">Your comment</label>
           <textarea bind:value={comment.text} id="comment" rows="2" class="w-full px-0 text-sm focus:ring-0 bg-transparent outline-none" placeholder="Write a comment..." required></textarea>
       </div>
       <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button on:click={addComment} type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button>
       </div>
   </div>
</form>
    </div>
    <div>
        {#each comments as coment}
            <div class="gap-3 flex flex-row">
                    <img src={`https://avatars.dicebear.com/api/avataaars/${randomChar()}.svg?options[mood][]=happy`} alt="avatar" class="w-10 h-10 rounded-full mt-2" />
                <p class="pt-4 whitespace-pre-wrap w-full">{coment.text}</p>
            </div>
        {/each}
    </div>
</main>

<style>

    #modal {
        display: none;
    }

    /* change the styling of scroll bar */
    ::-webkit-scrollbar {
        width: 10px;
    }

</style>