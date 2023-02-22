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

    // const addContent = () => contenttext = [...contenttext, {text: "", id: getRandomInt(10000), created_at: current_time , number: contnumber, is_code: false, user_id: user.id,}]

    let addContent = () => {
        Content = [...Content, {text: "", created_at: current_time , number: contnumber, is_code: false, connect: pid,}];
        contnumber++;
    }

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
        supabase.from("Documentation").upsert(Documentation).eq("id",pid).then((res) => {
            console.log(res);
        });
        // update the content
        // supabase.from("Contents").update(Content).eq("connect",pid);

        // console.log(Content);
        // console.log(Documentation);

        supabase.from("Contents").upsert(Content).eq("connect",pid).then((res) => {
            console.log(res);
        });

        // check if thee are any new content
        if (Content.length > 0) {
            // check if the last content is empty
            if (Content[Content.length-1].text == "") {
                // remove the last content
                Content.pop();
            }
        }

    }

</script>

<main class="text-white">
    <!-- use input fields -->
    {#each Documentation as doc}
    <div class="flex flex-col gap-7 w-full place-items-center">
        <h1>New Docs</h1>
        <textarea rows="1"  bind:value={doc.title} placeholder="Title" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <textarea rows="1"  bind:value={doc.description} placeholder="Description" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
    {/each}
    {#each Content as cont}
    <div class="text-black flex flex-col pt-7 w-full place-items-center">
        <!-- <input type="text" bind:value={cont.text} /> -->
        <textarea rows="6" bind:value={cont.text} placeholder="Contents (This text editor uses Markdown. Please use the markdown syntax.) If content is left empty, it will be automatically be deleted" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-lg outline-none" id={"content" + cont.number}/>

    </div>
    {/each}
    <div class="flex flex-row justify-center">
        <!-- <button on:click={addContent} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700 mt-7">Add</button> -->
    <button on:click={updateContent} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700 mt-7">Update</button>
    </div>
</main>