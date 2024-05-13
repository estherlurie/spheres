<script>
  import Card from "./Card.svelte";

  export let title;
  export let content;
  export let id;
</script>

<article>
  <Card {title} {content} />
  <form action="?/deletePost&id={id}" method="POST">
    <button type="submit">Delete Post</button>
  </form>
  <a href="/" role="button" style="width: 100%;">Edit Post</a>
</article>
