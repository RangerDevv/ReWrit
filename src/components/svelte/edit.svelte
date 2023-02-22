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
        // update the documentation
        // supabase.from("Documentation").update(Documentation).eq("id",pid);
        // update the content
        // supabase.from("Contents").update(Content).eq("connect",pid);

        // console.log(Content);
        // console.log(Documentation);

        supabase.from("Contents").upsert(Content).eq("connect",pid).then((res) => {
            console.log(res);
        });
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