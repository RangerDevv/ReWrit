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

    interface Contents{
        id?:number,
        created_at?:string,
        text:string,
        connect:number,
    }

    let NewAssignment: NewAssignment = {
        title: "",
        description: "",
        lang: 666,
        id: 2003,
        created_at: "2021-09-01T00:00:00.000Z",
        user_id: "345f3cdf-6041-4924-be7f-5cee3b9e2534",
    }

    let Contents: Contents = {
        id: Math.random(),
        created_at: "2021-09-01T00:00:00.000Z",
        text: "",
        connect: 2003,
    }

    function Push (newAssignment: NewAssignment) {
        supabase.from('Documentation').insert([
            {title: newAssignment.title, description: newAssignment.description, lang: newAssignment.lang, id: newAssignment.id, created_at: newAssignment.created_at, user_id: newAssignment.user_id},
        supabase.from('Contents').insert([
            {id: Contents.id, created_at: Contents.created_at, text: Contents.text, connect: Contents.connect},
        ]).then(({ data, error }) => {
            console.log(data)
            console.log(error)
        })
        ]).then(({ data, error }) => {
            console.log(data)
            console.log(error)
        })
    }
</script>

<main>
    <h1>New Assignment</h1>
    <input type="text" bind:value={NewAssignment.title} placeholder="Title" />
    <input type="text" bind:value={NewAssignment.description} placeholder="Description" />
    <input type="text" bind:value={Contents.text} placeholder="Contents" />

    <button on:click={() => Push(NewAssignment)}>Submit</button>
</main>