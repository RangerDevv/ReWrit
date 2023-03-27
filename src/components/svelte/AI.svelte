<script>
  const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Hello world",
});
console.log(completion.data.choices[0].text);
</script>

<main>
    <h1>OpenAI API Example</h1>
    <button on:click={getCompletion}>Get Completion</button>
    <p class="prompt">{prompt}</p>
    <p class="response">{response}</p>
</main>