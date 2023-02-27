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
        // check if the langsort is empty
        // if it is empty then return all the docs
        // if it is not empty then return the docs with the langsort
        .eq("connect", langsort)
        // order by the time created
        .order("created_at", { ascending: false })

    // if there is an error then log it
    if (docsError) {
        console.log(docsError)
    }

    // if there is data then set the docs to the data
    if (d) {
        docs = d
    }
})

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
            <!--  make a select sort for the docs based on the language -->
            <select bind:value={langsort} class="w-80 h-10 rounded-lg bg-gray-800 text-white">
                <option value="">All</option>
                {#each languages as language}
                    <option value={language.id}>{language.title}</option>
                {/each}
            </select>
            {#each docs as doc}
            <div class="flex flex-col justify-items-center text-white w-80 h-32 bg-gray-800 rounded-xl outline-dashed outline-gray-400">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div on:click={() => window.location.href = `/docs/${doc.id}`}>
                    <p class="text-center text-2xl pt-2 pb-7 font-bold">{doc.title}</p>
                    <p class="text-center text-sm pt-2 pb-7" id="desc">{doc.description}</p>
                </div>
            </div>
            {/each}
        </div>
    </div>
</main>