<script lang="ts">
    import { supabase } from "../lib/backend";
    import { onMount } from "svelte";
async function signInWithGitHub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
  })
}
</script>
<div>
    <button on:click={signInWithGitHub} class="bg-white text-black px-4 py-2 rounded-lg">Sign in with GitHub</button>
</div>