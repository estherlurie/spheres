<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import CreatePostForm from "$lib/CreatePostForm.svelte";

  import type { PageData } from "./$types";
  import Post from "$lib/Post.svelte";
  import CreateSphereForm from "$lib/CreateSphereForm.svelte";
  export let data: PageData;
  let username = data.username;
  let spheres = data.spheres ? data.spheres : [];
  let posts = data.posts ? data.posts : [];
  let spheresExists = spheres.length !== 0;
  let postsExists = posts.length !== 0;
</script>

<Navbar {username} />
<main>
  <h1>Origin</h1>
  <div>
    {#if !spheresExists}
      <h2>Make your first Sphere!</h2>
    {/if}
    <CreateSphereForm />
    {#each spheres as sphere}
      <p>Sphere id={sphere.id} name={sphere.name}</p>
    {/each}
  </div>
  <div>
    {#if spheresExists}
      <CreatePostForm {spheres} />
    {/if}
  </div>
  <div class="posts">
    {#if postsExists}
      {#each posts as post}
        <Post title={post.title} content={post.content} id={post.id} />
      {/each}
    {/if}
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
