<script lang="ts">
import { supabase } from "../../lib/backend";

export let uuid : any;
let name = "";
let email = "";

async function updateName() {    
    const { error } = await supabase.auth.updateUser({
    data: {
        name: name,
    },
    })
    window.location.href = "/dashboard";
    // get the docs from the database
    const { data: d, error: docsError } = await supabase
        .from("Documentation")
        .select("user_email")
        .eq("user_id", uuid)
    
    // change the user_email to the new name if the user_id matches the uuid in the database
    if(d){
        await supabase
            .from("Documentation")
            .upsert({ user_email: name })
            .eq("user_id", uuid)
    }
    if(docsError){
        console.log(docsError)
    }
}

async function updateEmail() {    
    const { error } = await supabase.auth.updateUser({
    data: {
        email: email,
    },
    })
}
</script>

<main class="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">

    <h1 class="text-2xl font-bold text-white">Update Profile</h1>

    <input type="text" bind:value={name} class="w-96 h-12 rounded-lg p-4" placeholder="Name" />

    <button on:click={updateName} class="w-96 h-12 rounded-lg bg-blue-500 text-white">Update Name</button>

</main>