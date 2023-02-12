<script lang="ts">
    import { supabase } from "../../lib/backend";
    import { onMount } from "svelte";
    import type { Language } from "../../lib/db";
    

    // Generate a random 4 digit number
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    let contnumber = 0;

    let current_time = new Date().toISOString(); 

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
        number?:number,
        text:string,
        connect?:number,
        is_code?:boolean,
    }

    let NewAssignment: NewAssignment = {
        title: "",
        description: "",
        lang: 0,
        id:getRandomInt(10000),
        created_at: current_time,
        user_id: "345f3cdf-6041-4924-be7f-5cee3b9e2534",

    }

    let Contents: Contents = {
        id:getRandomInt(10000),
        created_at: current_time,
        number: contnumber,
        text: "",
        connect: NewAssignment.id,
        is_code: false,
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

    // make the items in the array equal to the content of Contents
    let contenttext: Contents[] = []
    const addContent = () => contenttext = [...contenttext, {text: "", id: getRandomInt(10000), created_at: current_time , number: contnumber,}]
    function removeContent(index: number) {
        contenttext.splice(index, 1)
        contenttext = [...contenttext]
    }
    const addCode = () => {contenttext = [...contenttext, {text: "", id: getRandomInt(10000), created_at: current_time , number: contnumber, is_code: true,}]}

    console.log(contenttext)

    $: disabled = NewAssignment.title === "" || NewAssignment.description === "" || NewAssignment.lang === 0 || contenttext.length === 0

    async function pushcontent() {
        await Promise.all(contenttext.map(async (content) => {
            await supabase.from('Contents').insert([
                {
                    text: content.text, 
                    // set the content.number to the index of the array
                    number: contenttext.indexOf(content),
                    connect: NewAssignment.id, 
                    id: content.id, 
                    created_at: content.created_at,
                    is_code: content.is_code,
                },
            ]).then(({ data, error }) => {
                console.log(NewAssignment.id)
                console.log(content.connect)
                console.log(contenttext)
                console.log(error)
            })
        }),
        )
    }

    async function Push (newAssignment: NewAssignment, contents: Contents ) {
        supabase.from('Documentation').insert([
            {title: newAssignment.title, description: newAssignment.description, lang: newAssignment.lang, id: newAssignment.id, created_at: newAssignment.created_at, user_id: newAssignment.user_id},
        ]).then(({ data, error }) => {
            console.log(data)
            console.log(error)
            pushcontent()
            console.log(contenttext)
        }),
            // loop through the array and insert the contents
            setTimeout(() => {
            // go to the docs/newAssignment.id
            window.location.href = "/docs/" + newAssignment.id
        }, 1500);
        }

</script>

<main>

    <div class="flex flex-col place-items-center w-screen text-white  pl-0 sm:pl-20 gap-7">
        <h1>New Assignment</h1>
        <textarea rows="1"  bind:value={NewAssignment.title} placeholder="Title" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <textarea rows="1"  bind:value={NewAssignment.description} placeholder="Description" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        {#each contenttext as content}
            <textarea rows="6" bind:value={content.text} placeholder="Contents" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <button on:click={() => removeContent(contenttext.indexOf(content))} class="block p-2.5 w-24 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Remove</button>
        {/each}
        <div class="flex flex-row gap-6">
            <select bind:value={NewAssignment.lang} class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="0">Select Language</option>
                {#each language as lang}
                    <option value={lang.id}>{lang.language_name}</option>
                {/each}
            </select>
            <!-- Make a select button a new content -->
            <!-- <select class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="0"><button on:click={addContent}>Select Content</button></option>
                <option value="1">Code</option>
                <option value="2">Text</option>
                <option value="3">Image</option>
            </select> -->
            <button on:click={addContent} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700">Text</button>
            <!-- <button on:click={ () =>} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700">Code</button> -->
            <button on:click={addCode} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700">Code</button>
        </div>
            <button on:click={() => Push(NewAssignment, Contents)} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700">Push</button>
    </div>
</main>