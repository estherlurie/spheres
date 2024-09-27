<script lang="ts">
  import type { Sphere } from "@prisma/client";
  import Button from "./components/Button.svelte";

  export let spheres: Sphere[];
</script>

<div class="outer">
  <h2>New Post</h2>
  <form action="?/createPost" method="POST">
    <label for="sphere">Sphere</label>
    <select id="sphere" name="sphere">
      {#each spheres as sphere}
        <option value={sphere.id}>{sphere.name}</option>
      {/each}
    </select>
    <label for="title"><h3>Title</h3></label>
    <input class="formEntry" type="text" id="title" name="title" />
    <label for="content"><h3>Content</h3></label>
    <textarea class="formEntry" id="content" name="content" rows={5} />
    <div class="buttonContainer">
      <Button type="submit" text="Add Post" />
    </div>
  </form>
</div>

<style>
  .outer {
    width: 25%;
    border: solid gray;
    border-radius: 10px;
    display: block;
    padding: 10px;
    margin: 0 auto;
  }

  .formEntry {
    color: inherit;
    background-color: inherit;
    width: 95%;
    border: solid gray;
    border-radius: 10px;
  }
</style>
