<script>
  import Card from "./components/Card.svelte";
  import Button from "./components/Button.svelte";

  export let title;
  export let content;
  export let id;
</script>

<div class="outer">
  <article>
    <Card {title} {content} />
    <form action="?/deletePost&id={id}" method="POST">
      <Button type="submit" text="Delete Post" />
    </form>
    <div class="edit">
      <a href="/{id}" role="button">Edit Post</a>
    </div>
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

  .edit {
    text-align: center;
  }
</style>
