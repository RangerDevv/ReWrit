<script lang="ts">

    import { supabase } from "../../lib/backend";
    import { onMount } from "svelte";

    export let currLocation = "";
    export let path = "";
    let search = "";
    let results: any[] = [];
    let language = [] as any[];

    onMount(async () => {
        const { data: lang, error } = await supabase
            .from("Language")
            .select("*")
            .order("id", { ascending: false })
            .limit(10)
        language = lang || [];
    });

    async function searchReq(){
    const { data: searchResults, error: er} = await supabase
        .from(currLocation)
        .select("*")
        // search the title and description for the search term
        .ilike("title", `%${search}%`)
        .order("id", { ascending: false })
        .limit(10)
        console.log(searchResults)
        // leave the results array empty if there is no search term
        if (search.length > 0) {
            results = searchResults || [];
        } else {
            results = [];
        }
    }

    onMount(async () => {
        searchReq();
    });

    function toggleSearchModal() {
        const modal = document.getElementById("Search_Modal") as HTMLElement;
        if (modal.style.display === "none") {
            modal.style.display = "flex";
        } else {
            modal.style.display = "none";
        }
    }
</script>
<!-- <div class="flex justify-center">
<button class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l-xl" on:click={toggleSearchModal}>
    Search 🔎
</button>
</div> -->

<div class=" flex justify-center mt-4 pb-4" id="Search_Modal">
    <input type="text" bind:value={search} on:input={searchReq}  class="text-black w-52 sm:w-96 h-8 bg-gray-300 outline-none rounded-md pl-2" placeholder="Search 🔎"/>
    {#if results.length > 0}
    <div class=" w-96 h-60 overflow-y-scroll fixed mt-11 bg-slate-900 rounded-md shadow-xl z-50">
    {#each results as result}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="flex flex-row text-white w-96 h-auto justify-center cursor-pointer mt-1 mb-1 " on:click={() => {
                window.location.href = `/${path}/${result.id}`;}}>
                <div class="flex flex-col">
                    <h1 class="text-left pl-3 text-lg pt-2 pb-1 font-bold">{result.title}</h1>
                    <!-- get the language id from the document and get the language name from the language array and display it -->
                    <p class="text-left pl-3 text-sm pt-2 pb-2 truncate w-80">Category: {language.find((lang) => lang.id === result.lang).title}</p>
                    <p class="text-left pl-3 text-sm pt-1 pb-2 truncate w-80">{result.description}</p>
                </div>
            </div>
            <!-- divider -->
            <div class="w-96 h-0.5 bg-gray-300"></div>
    {/each}  
</div>
    {/if}
</div>

<style>

/* make the overlfow scrollbar size to 10px */
::-webkit-scrollbar {
    width: 0;
}

</style>