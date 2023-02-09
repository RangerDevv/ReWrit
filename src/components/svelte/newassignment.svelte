<script lang="ts">
    import { supabase } from "../../lib/backend";
    import { onMount } from "svelte";
    import type { Documentation } from "../../lib/db";

    interface NewAssignment {
        // title and description of documentation
        title: string;
        description: string;
        lang:number;
        id?:number,
        created_at?:string,
        user_id?:string,
    }

    let NewAssignment: NewAssignment = {
        title: "",
        description: "",
        lang: 666,
        id: 2003,
        created_at: "2021-09-01T00:00:00.000Z",
        user_id: "345f3cdf-6041-4924-be7f-5cee3b9e2534",
    }

    function Push (newAssignment: NewAssignment) {
        supabase.from('Documentation').insert([
            {title: newAssignment.title, description: newAssignment.description, lang: newAssignment.lang, id: newAssignment.id, created_at: newAssignment.created_at, user_id: newAssignment.user_id}
        ]).then(({ data, error }) => {
            console.log(data)
            console.log(error)
        })
        console.log(newAssignment)
    }
</script>

<main>
    <h1>New Assignment</h1>
    <input type="text" bind:value={NewAssignment.title} placeholder="Title" />
    <input type="text" bind:value={NewAssignment.description} placeholder="Description" />
    <button on:click={() => Push(NewAssignment)}>Submit</button>
</main>