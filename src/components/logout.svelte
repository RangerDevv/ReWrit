<script lang="ts">
    import { supabase } from "../lib/backend";
    import { onMount } from "svelte";
async function signout() {
    const { error } = await supabase.auth.signOut()
    location.replace('/')
}
</script>
<div>
    <button on:click={signout} class="bg-white text-black px-4 py-2 rounded-lg w-full sm:w-auto">Sign out</button>
</div>