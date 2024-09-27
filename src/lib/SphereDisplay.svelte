<script lang="ts">
  import type { Sphere } from "@prisma/client";

  export let spheres: Sphere[];
</script>

<div class="sphereDisplay">
  <h3>Your Spheres</h3>
  <ul>
    {#each spheres as sphere}
      <li>{sphere.name}</li>
    {/each}
  </ul>
</div>

<style>
  .sphereDisplay {
    display: inline-block;
    padding: 0 5%;
    border-radius: 10px;
    border-style: solid;
    margin: 0 auto;
    height: fit-content;
  }
</style>
