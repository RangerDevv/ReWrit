<script>
    import SvelteMarkdown from "svelte-markdown";
    export let content = "";
</script>

<div>

<SvelteMarkdown source={content} />

<style>
    /* make the headings like headings */
    h1 {
        font-size: 2rem;
        font-weight: bold;
    }
    h2 {
        font-size: 1.5rem;
    }
    h3 {
        font-size: 1.25rem;
    }
    h4 {
        font-size: 1rem;
    }
    h5 {
        font-size: 0.875rem;
    }
    h6 {
        font-size: 0.75rem;
    }
    p {
        font-size: 1.2rem;
    }
    a {
        color: #00b3ff;
    }
    a:hover {
        color: #00b3ff;
        text-decoration: underline;
    }
      /* style table  with a white border */
      table {
          border: 1px solid white;
      }
      /* style table header with a white border */
      th {
          border: 1px solid white;
      }
      /* style table body with a white border */
      td {
          border: 1px solid white;
      }
  
      /* make the pre tag look like a code block */
      code {
          /* make the bg color a light greyish color */
          background-color: #363636;
          border-radius: 5px;
          padding:5px;
          color: white;
          /* make the text a bit small */
          font-size: 0.9rem;
          /* border color light grey */
          border: 1px solid grey
      }
  
  </style>
</div>
