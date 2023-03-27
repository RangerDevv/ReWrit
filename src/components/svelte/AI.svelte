<script>
    let prompt = "Write a function that returns the sum of two numbers";
    let response = "";

    async function getCompletion() {
        const res = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${'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'}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150
            })
        });
        const data = await res.json();
        if (data.error) {
            console.error(data.error);
        } else {
            response = data.choices[0].text;
        }
    }
</script>

<main>
    <h1>OpenAI API Example</h1>
    <button on:click={getCompletion}>Get Completion</button>
    <p class="prompt">{prompt}</p>
    <p class="response">{response}</p>
</main>