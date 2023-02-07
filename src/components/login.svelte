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
    <button on:click={signInWithGitHub}>Sign in with GitHub</button>
</div>