<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";

  export let data;
  let username = data.username;
</script>

<Navbar {username} />
<main>
  <h1>{username}</h1>
  <p>
    Eventually, you will be able to edit/update your profile, see your posts,
    and manage your Spheres.
  </p>
</main>
