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


    let comment: Comments = {
        created_at: "",
        number: 0,
        text: "",
        cmntof: 0,
    }    

    let comments: Comments[] = [];

    onMount(async () => {
        const { data, error } = await supabase.from("Comments").select("*");
        if (error) {
            console.log(error);
        } else {
            comments = data;
        }
    });

    function addComment() {
        comments = [...comments, comment];
        comment = {
            id:0,
            created_at: "",
            number: 0,
            text: "",
            cmntof: 0,
        }
    }

</script>

<main class="text-white">
    <h1>Comments</h1>
    <div>
        <input type="text" bind:value={comment.text} />
        <button on:click={addComment}>Add Comment</button>
    <div>
        {#each comments as comment}
            <div>
                <p>{comment.text}</p>
            </div>
        {/each}
    </div>
</main>
