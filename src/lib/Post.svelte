<script lang="ts">
  import Button from "./components/Button.svelte";

  export let owned: boolean;
  export let author: string;
  export let title: string;
  export let content: string;
  export let id: number;
  export let sphereName: string;
</script>

<div class="outer">
  <article>
    <p>{sphereName}</p>
    <h4>{author}</h4>
    <h3>{title}</h3>
    <p>{content}</p>
    {#if owned}
      <form action="?/deletePost&id={id}" method="POST">
        <Button type="submit" text="Delete" />
      </form>
      <div class="edit">
        <a href="/{id}" role="button">Edit</a>
      </div>
    {/if}
  </article>
</div>

<style>
  .outer {
    display: flex;
    border-color: black;
    border-style: solid;
    border-bottom: 0;
    width: 60%;
    margin: 0 auto;
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
