<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import CreatePostForm from "$lib/CreatePostForm.svelte";

  import type { PageData } from "./$types";
  import Post from "$lib/Post.svelte";
  export let data: PageData;
</script>

<Navbar />
<main>
  <h1>Origin</h1>
  <div>
    <CreatePostForm />
  </div>
  <div class="posts">
    {#each data.posts as post}
      <Post title={post.title} content={post.content} id={post.id} />
    {/each}
  </div>
</main>

<style>
  main {
    display: block;
  }

  div {
    margin: 5%;
  }

  .posts {
    display: flex;
    margin: 0 auto;

    overflow-x: auto;
    overflow-y: auto;
  }
</style>
