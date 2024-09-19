<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  const username = data.username;
</script>

<Navbar {username} />

<main>
  <h1>Welcome to Spheres</h1>

  <p>Your social spheres, online.</p>
  <p>
    Think close friends stories -- but on Spheres, you can make as many lists as
    you like.
  </p>
  <a href="/origin"><h3>Origin</h3></a>
</main>
