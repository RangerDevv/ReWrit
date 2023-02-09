<script lang="ts">
    import { supabase } from "../../lib/backend";
    import { onMount } from "svelte";
    import type { Documentation } from "../../lib/db";

    interface NewAssignment {
        // title and description of documentation
        title: string;
        description: string;
    }

    let NewAssignment: NewAssignment = {
        title: "",
        description: "",
    }

    function Push (newAssignment: NewAssignment) {
        supabase.from('Documentation').insert([
            {title: newAssignment.title, description: newAssignment.description,}
        ]).then(({ data, error }) => {
            console.log(data)
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