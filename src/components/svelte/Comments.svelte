<script lang="ts">

    import { supabase } from "../../lib/backend";
    import { onMount } from "svelte";

    export let currId: number;

    interface Comments {
        id?:number,
        created_at?:string,
        number:number,
        text:string,
        cmntof:number,
    }


    let Comments: Comments = {
        id:0,
        created_at: "",
        number: 0,
        text: "",
        cmntof: currId,
    }    

    let comments: Comments[] = [];

    onMount(async () => {
        let { data, error } = await supabase
            .from("Comments")
            .select("*")
            .eq("cmntof", currId);
        if (error) {
            console.log(error);
        }
        console.log(data);
    });

    async function addComment() {
        let { data: comment, error } = await supabase
            .from("Comments")
            .insert([Comments]);
        if (error) {
            console.log(error);
        }
        console.log(comment);
    }


</script>

<main class="text-white">
    <h1>Comments</h1>
    <div>
        <input type="text" bind:value={Comments.text} />
        <button on:click={addComment}>Add Comment</button>
    <div>
        {#each comments as comment}
            <div>
                <p>{comment.text}</p>
            </div>
        {/each}
    </div>
</main>
