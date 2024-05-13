<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import Post from "$lib/Post.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;
  $: ({ posts } = data);
</script>

<Navbar />

<main>
  <h1>Welcome to Spheres</h1>

  <p>Your social spheres, online.</p>
  <p>
    Think close friends stories -- but on Spheres, you can make as many lists as
    you like.
  </p>
  <a href="/onboard"><h3>Onboarding</h3></a>
  <a href="/origin"><h3>Origin</h3></a>
  {#each posts as post}
    <Post title={post.title} content={post.content} id={post.id} />
  {/each}
</main>
