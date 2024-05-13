<script>
  import Card from "./Card.svelte";

  export let title;
  export let content;
  export let id;
</script>

<div class="outer">
  <article>
    <Card {title} {content} />
    <form action="?/deletePost&id={id}" method="POST">
      <button type="submit">Delete Post</button>
    </form>
    <a href="/" role="button" style="width: 100%;">Edit Post</a>
  </article>
</div>

<style>
  .outer {
    margin-left: 10px;
    display: flex;
  }

  article {
    margin: 0 auto;
  }

  form {
    display: flex;
  }

  button {
    margin: 0 auto;
  }

  a {
    margin: 0 auto;
  }
</style>
