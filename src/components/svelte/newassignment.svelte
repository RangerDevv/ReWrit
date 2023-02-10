<script lang="ts">
    import { supabase } from "../../lib/backend";
    import { onMount } from "svelte";
    import type { Language } from "../../lib/db";
    

    // Generate a random 4 digit number
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

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
        connect?:number,
    }

    let NewAssignment: NewAssignment = {
        title: "",
        description: "",
        lang: 0,
        id: getRandomInt(10000),
        created_at: "2021-09-01T00:00:00.000Z",
        user_id: "345f3cdf-6041-4924-be7f-5cee3b9e2534",
    }

    let Contents: Contents = {
        id: getRandomInt(10000),
        created_at: "2021-09-01T00:00:00.000Z",
        text: "",
        // connect to the id of the documentation
        connect: NewAssignment.id,
    }

    // get the language lost of id and the language name from the database
    // select all of the language from the database
    let language: Language[] = [];
    onMount(async () => {
        const { data, error } = await supabase.from("Language").select("*");
        if (error) {
            console.log(error);
        } else {
            language = data;
        }
    });

    // if the forms are empty, the button is disabled
    // $: disabled = !(assignmentname != ""
    //     && questions.length > 0 
    //     && questions.every(x => x.question.trim() != "" && x.answer.trim() != ""))
    $: disabled = (NewAssignment.title == "" || NewAssignment.description == "" || Contents.text == "")

    function Push (newAssignment: NewAssignment, contents: Contents ) {
        supabase.from('Documentation').insert([
            {title: newAssignment.title, description: newAssignment.description, lang: newAssignment.lang, id: newAssignment.id, created_at: newAssignment.created_at, user_id: newAssignment.user_id},
            ]).then(({ data, error }) => {
            console.log(data)
            console.log(error)
        }),
        supabase.from('Contents').insert([
            {id: contents.id, created_at: contents.created_at, text: contents.text, connect: contents.connect},
        ]).then(({ data, error }) => {
            console.log(data)
            console.log(error)
        })
    }
</script>

<main>

    <div class="flex flex-col place-items-center w-screen text-white pl-20 gap-7">
        <h1>New Assignment</h1>
        <textarea rows="1"  bind:value={NewAssignment.title} placeholder="Title" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <textarea rows="1"  bind:value={NewAssignment.description} placeholder="Description" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <textarea rows="6" bind:value={Contents.text} placeholder="Contents" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <div class="flex flex-row">
            <select bind:value={NewAssignment.lang} class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="0">Select Language</option>
                {#each language as lang}
                    <option value={lang.id}>{lang.language_name}</option>
                {/each}
            </select>
        </div>
            <button {disabled} on:click={() => Push(NewAssignment, Contents)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 disabled:bg-gray-800 disabled:hover:bg-gray-700">Push</button>
    </div>
</main>