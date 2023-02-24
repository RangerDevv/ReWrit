<script lang="ts">

    import { supabase } from "../../lib/backend";
    import { onMount } from "svelte";

    export let currLocation = "";
    export let path = "";
    let search = "";
    let results: any[] = [];

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
    <input type="text" bind:value={search} on:input={searchReq}  class="text-black w-56 h-8 bg-gray-300 outline-none rounded-md pl-2" placeholder="Search 🔎"/>
    {#if results.length > 0}
    <div class=" w-96 h-60 overflow-y-scroll fixed mt-11 bg-zinc-700 rounded-md">
    {#each results as result}
            <div class="flex flex-row text-white w-full h-auto bg-zinc-700 justify-between mt-1 mb-1">
                <div class="flex flex-col">
                    <h1 class="text-left pl-3 text-lg pt-2 pb-4 font-bold">{result.title}</h1>
                    <p class="text-left pl-3 text-sm pt-2 pb-2 truncate w-80">{result.description}</p>
                </div>
                <div class="flex flex-row justify-end">
                <button class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"  on:click={() => {
                    window.location.href = `/${path}/${result.id}`;}}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                </div>
            </div>
    {/each}  
</div>
    {/if}
</div>

<style>

/* make the overlfow scrollbar size to 10px */
::-webkit-scrollbar {
    width: 10px;
}

</style>