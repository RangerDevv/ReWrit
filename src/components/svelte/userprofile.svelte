<script lang="ts">
import { supabase } from "../../lib/backend";

let name = "";
let email = "";

async function updateName() {    
    const { error } = await supabase.auth.updateUser({
    data: {
        name: name,
    },
    })
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