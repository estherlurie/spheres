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
  <CreatePostForm />
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

  article {
    border: solid gray;
    border-radius: 10px;

    width: 200px;

    overflow-x: scroll;
    overflow-y: scroll;

    text-wrap: wrap;
  }
  .posts {
    display: flex;
    margin: 0 auto;

    overflow-x: scroll;
  }
</style>
