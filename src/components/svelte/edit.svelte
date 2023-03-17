<script lang="ts">

    export let user : any;
    export let pid = 0;
    import { supabase } from "../../lib/backend";
    import type { Documentation,Contents,Language } from "../../lib/db";
    import { onMount } from "svelte";
    import Txtbox from "./txtbox.svelte";

    let current_time = new Date().toISOString();
    let contnumber = 0;
    
    interface Contents{
        id?:number,
        created_at?:string,
        number?:number,
        text?:string,
        connect?:number,
        is_code?:boolean,
        user_id?:string,
        is_toc?:boolean,
    }

    let Contents: Contents = {
        created_at: current_time,
        number: contnumber,
        text: "",
        connect: pid,
        is_code: false,
        user_id: user.id,
        is_toc: false,
    }
    

    let Content: Contents[] = [];
    let Deletedcontent: Contents[] = [];
    let Newcontent: Contents[] = [];

    console.log(Newcontent);

    let newId = 0;



    onMount(async () => {
        const { data, error } = await supabase.from("Contents").select("*").eq("connect",pid).order("number", { ascending: true });
        if (error) {
            console.log(error);
        } else {
            Content = data;
            console.log(Content.length);
            // set the length of the content to the newId
            newId = Content.length;
        }
    });

    // get the documentation from the database
    let Documentation: any[] = [];
    let Language: any[] = [];
    onMount(async () => {
        const { data, error } = await supabase.from("Documentation").select("*").eq("id",pid);
        if (error) {
            console.log(error);
        } else {
            Documentation = data;
        }

        const { data: data2, error: error2 } = await supabase.from("Language").select("*")
        if (error2) {
            console.log(error2);
        } else {
            Language = data2;
        }
    });


    // a function that deletes the content from the database when the user clicks the delete button it removes the appropriate content from the array and adds it to the deleted content array
    const deleteContent = (id: any) => {
        // move the content to the deleted content array
        Deletedcontent = [...Deletedcontent, Content.filter((item) => item.number == id)[0]];
        // remove the content from the content array
        Content = Content.filter((item) => item.number !== id);
        // set the Content.number to the index of the array
        Content.forEach((item, index) => item.number = index);
    }


    const addContent = () => Newcontent = [...Newcontent, {text: "", created_at: current_time , number: newId++, connect: pid, is_code: false, user_id:user.id, is_toc: false}]
    const addCode = () => Newcontent = [...Newcontent, {text: "", created_at: current_time , number: newId++, connect: pid, is_code: true, user_id:user.id, is_toc: false}]
    const removeDeletedContent = (id: any) => Deletedcontent = Deletedcontent.filter((item) => item.number !== id, newId--)

    function updateContent() {
        Content.forEach((item, index) => item.number = index);

        Newcontent.forEach((item, index) => item.number = index + Content.length);

        // update the documentation
        supabase.from("Documentation").upsert(Documentation).eq("id",pid).then((res) => {
            console.log(res);
        });

        // delete the content that is in the deleted content array
        if (Deletedcontent.length > 0) {
            supabase.from("Contents").delete().in("number", Deletedcontent.map((item) => item.number)).then((res) => {
                console.log(res);
            });
        }

        console.log(Deletedcontent);


        supabase.from("Contents").upsert(Content).eq("connect",pid).then((res) => {
            console.log(res);
        });

        // check if there are any new content then add it to the database
        if (Newcontent.length > 0) {
            supabase.from("Contents").insert(Newcontent).then((res) => {
                console.log(res);
            });
        }

        // check if thee are any new content
        setInterval(()=> {
            //  window.location.href = "/docs/" + pid;
        }) , 600;

        
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
    {#if cont.is_toc == true}
    <div class="text-black flex flex-col pt-7 w-full place-items-center">
        <textarea rows="4" bind:value={cont.text} placeholder="Table of Contents" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-lg outline-none" id={"content" + cont.number}/>
    </div>
    {/if}
    {#if cont.is_toc == false}
    <div class="text-black flex flex-col pt-7 w-full place-items-center">
        <!-- <input type="text" bind:value={cont.text} /> -->
        <Txtbox bind:value={cont.text} />
        <button on:click={() => deleteContent(cont.number)} class="block p-2.5 w-20 text-sm rounded-lg bg-red-700 border-red-600 placeholder-gray-400 text-white mt-5">Delete</button>
    </div>
    {/if}
    {/each}
    {#each Newcontent as newcont}
    <div class="text-black flex flex-col pt-7 w-full place-items-center">
        <!-- <input type="text" bind:value={cont.text} /> -->
        {#if newcont.is_code ==false}
        <Txtbox bind:value={newcont.text} />
        {/if}
        {#if newcont.is_code ==true}
        <div class="w-96 sm:w-1/2 bg-gray-700 rounded-t-lg items-center h-10 p-1.5">Code</div>
            <textarea rows="6" bind:value={newcont.text} placeholder="Contents (This text editor uses Markdown. Please use the markdown syntax.)" class="block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-b-lg outline-none" id="content"/>
        {/if}
        <button on:click={removeDeletedContent} class="block p-2.5 w-20 text-sm rounded-lg bg-red-700 border-red-600 placeholder-gray-400 text-white focus:ring-red-500 focus:border-red-500 disabled:bg-gray-800 disabled:hover:bg-gray-700 mt-7">Remove</button>
    </div>
    {/each}
    <div class="flex flex-row justify-center gap-4">
        {#each Documentation as doc}
        <select bind:value={doc.lang} class="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {#each Language as lang}
                <option value={lang.id}>{lang.title}</option>
            {/each}
        </select>
        {/each}
        <button on:click={addContent} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700 mt-7">Text</button>
        <button on:click={addCode} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700 mt-7">Code</button>
    <button on:click={updateContent} class="block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700 mt-7">Update</button>
    </div>
</main>
