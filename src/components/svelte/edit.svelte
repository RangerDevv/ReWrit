<script lang="ts">

    export let pid = 0;
    import { supabase } from "../../lib/backend";
    import type { Documentation,Contents } from "../../lib/db";
    import { onMount } from "svelte";

    let current_time = new Date().toISOString();
    let contnumber = 0;
    
    interface Contents{
        id?:number,
        created_at?:string,
        number?:number,
        text:string,
        connect?:number,
        is_code?:boolean,
    }

    let Contents: Contents = {
        created_at: current_time,
        number: contnumber,
        text: "",
        connect: pid,
        is_code: false,
    }

    let Content: Contents[] = [];

    onMount(async () => {
        const { data, error } = await supabase.from("Contents").select("*").eq("connect",pid).order("number", { ascending: true });
        if (error) {
            console.log(error);
        } else {
            Content = data;
        }
    });

    // get the documentation from the database
    let Documentation: Documentation[] = [];
    onMount(async () => {
        const { data, error } = await supabase.from("Documentation").select("*").eq("id",pid);
        if (error) {
            console.log(error);
        } else {
            Documentation = data;
        }
    });

    function updateContent() {
        supabase.from("Contents").update([
            {
                created_at: current_time,
                number: contnumber,
                text: Contents.text,
                connect: pid,
                is_code: Contents.is_code,
            }
        ]).then((data) => {
            console.log(data);
        })
    }

</script>

<main class="text-white">
    <!-- use input fields -->
    {#each Documentation as doc}
    <div class="text-black">
        <input type="text" bind:value={doc.title} />
        <input type="text" bind:value={doc.description} />
    </div>
    {/each}
    {#each Content as cont}
    <div class="text-black">
        <input type="text" bind:value={cont.text} />
    </div>
    {/each}
    <button on:click={updateContent}>Update</button>
</main>