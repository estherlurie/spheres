<script lang="ts">
  /** @type {import('./$types').PageData}*/
  export let data;

  import Navbar from "$lib/Navbar.svelte";
</script>

<Navbar />
<main>
  <h2>Hi, I'm {data.name}!</h2>
  <p>
    Eventually this is where you'll be able to see someone's Profile. You can
    also see all the updates to their Spheres.
  </p>
</main>
