<script lang="ts">
  import Button from "./components/Button.svelte";

  export let title: string;
  export let content: string;
</script>

<form action="?/updatePost" method="POST">
  <h2>Editing: {title}</h2>
  <label for="title"><h3>Title</h3></label>
  <input class="formEntry" type="text" id="title" name="title" value={title} />
  <label for="content"><h3>Content</h3></label>
  <textarea
    class="formEntry"
    id="content"
    name="content"
    rows={5}
    value={content}
  />
  <div class="buttonContainer">
    <Button type="submit" text="Update Post" />
  </div>
</form>

<style>
  form {
    display: block;

    border: solid gray;
    border-radius: 10px;

    width: fit-content;

    padding: 1%;
  }

  .formEntry {
    color: inherit;
    background-color: inherit;
    min-width: auto;
    width: fit-content;
    border: solid gray;
    border-radius: 10px;
  }
</style>
