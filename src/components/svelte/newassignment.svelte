<script lang="ts">
    import { supabase } from "../../lib/backend";
    import { onMount } from "svelte";
    import type { Language } from "../../lib/db";
    import Txtbox from "./txtbox.svelte";

    // Generate a random 4 digit number
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    export let user: any;

    // make a fake user
    // let user = {
    //     id: "1234",
    //     email: "eerere@asdjf.coe",
    //     user_metadata: {
    //         name: "test",
    //     },
    // };

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
        user_email?:string,
    }

    interface Contents{
        id?:number,
        created_at?:string,
        number?:number,
        text:string,
        connect?:number,
        is_code?:boolean,
        user_id?:string,
        is_toc?:boolean,
    }

    let NewAssignment: NewAssignment = {
        title: "",
        description: "",
        lang: 0,
        id:getRandomInt(10000),
        created_at: current_time,
        user_id: user.id,
        user_email: user.user_metadata.name,
    }

    let Contents: Contents = {
        id:getRandomInt(10000),
        created_at: current_time,
        number: contnumber,
        text: "",
        connect: NewAssignment.id,
        is_code: false,
        user_id: user.id,
        is_toc: false,
    }
    let language: Language[] = [];
    onMount(async () => {
        const { data, error } = await supabase.from("Language").select("*");
        if (error) {
            console.log(error);
        } else {
            language = data as Language[];
        }
    });

    // make the items in the array equal to the content of Contents
    let contenttext: Contents[] = []
    const addContent = () => contenttext = [...contenttext, {text: "", id: getRandomInt(10000), created_at: current_time , number: contnumber, is_code: false, user_id: user.id,}]
    function removeContent(index: number) {
        contenttext.splice(index, 1)
        contenttext = [...contenttext]
    }
    const addCode = () => {contenttext = [...contenttext, {text: "", id: getRandomInt(10000), created_at: current_time , number: contnumber, is_code: true, user_id: user.id}]}

    console.log(contenttext)

    $: disabled = !NewAssignment.title || !NewAssignment.description || !NewAssignment.lang || !contenttext.length || contenttext.some((content) => !content.text);

    let tableofcontent: Contents[] = []
    const addtoc = () => tableofcontent = [...tableofcontent, {text: "", id: getRandomInt(10000), created_at: current_time , number: contnumber, is_code: false, is_toc: true, user_id: user.id,}]

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
                    user_id: content.user_id,
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
            {title: newAssignment.title, description: newAssignment.description, lang: newAssignment.lang, id: newAssignment.id, created_at: newAssignment.created_at, user_id: newAssignment.user_id, user_email: newAssignment.user_email},
        ]).then(({ data, error }) => {
            console.log(data)
            console.log(error)
            pushcontent()
            tableofcontent.map(async (content) => {
                await supabase.from('Contents').insert([
                    {
                        text: content.text, 
                        // set the content.number to the index of the array
                        number: tableofcontent.indexOf(content),
                        connect: NewAssignment.id, 
                        id: content.id, 
                        created_at: content.created_at,
                        is_code: content.is_code,
                        user_id: content.user_id,
                        is_toc: content.is_toc,
                    },
                ]).then(({ data, error }) => {
                    console.log(NewAssignment.id)
                    console.log(content.connect)
                    console.log(contenttext)
                    console.log(error)
                    contenttext = []
                    tableofcontent = []
                    NewAssignment = {
                        id: getRandomInt(10000),
                        created_at: current_time,
                        title: "",
                        description: "",
                        lang: 0,
                        user_id: user.id,
                        user_email: user.email,
                    }
                    if (error) {
                        window.alert("Something went wrong, please try again later")
                    } else {
                // wait 1.5 seconds and then go to the documentation
                setTimeout(() => {
                    // go to the docs/newAssignment.id
                    window.location.href = "/docs/" + newAssignment.id
                }, 1500);
            }
                })
            })
            console.log(contenttext)
        })
    }
        
        // if the user leaves the page save the data to local storage
        window.onbeforeunload = function() {
            localStorage.setItem("NewAssignment", JSON.stringify(NewAssignment));
            localStorage.setItem("contenttext", JSON.stringify(contenttext));
            localStorage.setItem("tableofcontent", JSON.stringify(tableofcontent));
        }
        // if the user comes back to the page load the data from local storage
        onMount(() => {
            if (localStorage.getItem("NewAssignment")) {
                NewAssignment = JSON.parse(localStorage.getItem("NewAssignment") || "");
            }
            if (localStorage.getItem("contenttext")) {
                contenttext = JSON.parse(localStorage.getItem("contenttext") || "");
            }
            if (localStorage.getItem("tableofcontent")) {
                tableofcontent = JSON.parse(localStorage.getItem("tableofcontent") || "");
            }
        });

        function clear() {
            // set all of the arrays to empty
            contenttext = []
            tableofcontent = []
            NewAssignment = {
                id: getRandomInt(10000),
                created_at: current_time,
                title: "",
                description: "",
                lang: 0,
                user_id: user.id,
                user_email: user.email,
            }
            window.location.reload();
        }
</script>

<main>
    <div class="flex flex-col place-items-center w-screen text-white  pl-0 sm:pl-20 ">
        <div class="flex flex-col gap-7 w-full place-items-center">
        <h1>New Docs</h1>
        <textarea rows="1"  bind:value={NewAssignment.title} placeholder="Title" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <textarea rows="1"  bind:value={NewAssignment.description} placeholder="Description" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        {#each tableofcontent as content}
            <textarea rows="1"  bind:value={content.text} placeholder="Table of Content" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        {/each}
        <button class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" on:click={addtoc}>Add Table of Content</button>
        </div>
        <!-- table of content -->
        {#each contenttext as content (content.id)}
            <div class="flex flex-col pt-7 w-full place-items-center">

            {#if content.is_code ==false}
            <div class="flex flex-col">
                <div class="flex flex-col">
                <Txtbox bind:value={content.text} />
                </div>
                <!--  make a bottom bar for the text editor which has delete button -->
                <div class="flex flex-col sm:flex-row">
                <div class="w-96 md:w-[40rem] bg-gray-700 rounded-b-lg items-center h-10 p-1">
                <button on:click={() => removeContent(contenttext.indexOf(content))} class="block p-1.5 w-24 text-xs text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-auto h-8">Remove</button>
                </div>
                </div>
            </div>
            {/if}
            {#if content.is_code ==true}
            <div class="flex flex-col sm:flex-row gap-6">
                <div>
            <div class="w-96 md:w-[40rem] bg-gray-700 rounded-t-lg items-center h-10 p-1.5">Code
            </div>
                <textarea rows="6" bind:value={content.text} placeholder="Contents (This text editor uses Markdown. Please use the markdown syntax.)" class="sm:order-2 order-1 block p-2.5 w-96 md:w-[40rem] text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none" id="CodeEditor"/>
                <div class="flex flex-col sm:flex-row">
                    <div class="w-96 md:w-[40rem] bg-gray-700 rounded-b-lg items-center h-10 p-1">
                    <button on:click={() => removeContent(contenttext.indexOf(content))} class="block p-1.5 w-24 text-xs text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-auto h-8">Remove</button>
                    </div>
                    </div>
            </div>
            </div>
            {/if}
            </div>
        {/each}
        <div class="flex flex-row gap-6 pt-6">
            <select bind:value={NewAssignment.lang} class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {#each language as lang}
                    <option value={lang.id}>{lang.title}</option>
                {/each}
            </select>
            <button on:click={addContent} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700">Text</button>
            <button on:click={addCode} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700">Code</button>
            <button on:click={clear} class="block p-2.5 w-20 text-sm rounded-lg bg-red-700 border-red-600 placeholder-gray-400 text-white focus:ring-red-500 focus:border-red-500 disabled:bg-gray-800 disabled:hover:bg-gray-700">Clear</button>
        </div>
            <button on:click={() => Push(NewAssignment, Contents)} {disabled} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700 mt-7">Push</button>
    </div>

    <style>
        #CodeEditor {
            font-family: monospace;
        }
    </style>
</main>