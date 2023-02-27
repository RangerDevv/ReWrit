<script lang="ts">

import { onMount } from 'svelte';
import type { Language, Documentation } from '../../lib/db';
import { supabase } from '../../lib/backend';


let docs: any[] = []
let langsort: number = 0
let languages: Language[] = []

onMount(async () => {
    // get the docs from the database
    const { data: d, error: docsError } = await supabase
        .from("Documentation")
        .select("*")
        .order("created_at", { ascending: false })

    if (docsError) {
        console.log(docsError)
    }

    // if there is data then set the docs to the data
    if (d) {
        docs = d
    }
})

// make a function that sorts the docs based on the language selected
const sortDocs = async () => {
    // get the docs from the database
    const { data: d, error: docsError } = await supabase
        .from("Documentation")
        .select("*")
        // check if the langsort is empty
        // if it is empty then return all the docs
        // order by the time created
        .order("created_at", { ascending: false })

    if (langsort != 0) {
        // if the langsort is not empty then filter the docs based on the language
        if (d) {
            docs = d.filter((doc) => doc.lang == langsort)
        }
    } else {
        // if the langsort is empty then set the docs to the data
        docs = d as any[]
    }

    // if there is an error then log it
    if (docsError) {
        console.log(docsError)
    }
}

const getLanguages = async () => {
    // get the languages from the database
    const { data: l, error: langError } = await supabase
        .from("Language")
        .select("*")

    // if there is an error then log it
    if (langError) {
        console.log(langError)
    }

    // if there is data then set the languages to the data
    if (l) {
        languages = l
    }
}

getLanguages()

</script>

<main>
    <div class="w-96 h-96 rounded-lg self-center sm:pt-0 pt-6">
        <p class="text-white text-center text-2xl font-bold">Latest Docs</p>
        <div class="flex flex-col justify-items-center h-96 pt-3 w-full items-center overflow-y-scroll gap-6">
            <div class="flex flex-row justify-between w-80 h-10 rounded-lg bg-gray-800 text-white outline-none">
                <!--  select sort for the docs based on the language -->
                <select bind:value={langsort} class="w-80 h-10 rounded-lg bg-gray-800 text-white outline-none pl-2">
                    <option value="">All</option>
                    {#each languages as language}
                        <option value={language.id}>{language.title}</option>
                    {/each}
                </select>
                <button on:click={sortDocs} class="w-10 h-10 rounded-lg bg-gray-800 text-white outline-none">Sort</button>
            </div>
            {#each docs as doc}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="w-80 h-32 rounded-lg bg-gray-800 text-white flex flex-col justify-center gap-5 outline-dashed outline-gray-400 hover:outline-gray-700 cursor-pointer" on:click={() => window.location.href = `/docs/${doc.id}`}>
                    <p class="text-center">{doc.title}</p>
                    <p class="text-center w-full truncate">{doc.description}</p>
                </div>
            {/each}
        </div>
    </div>
</main>