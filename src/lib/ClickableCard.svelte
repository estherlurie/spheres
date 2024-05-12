<script lang="ts">
  /** @type {import('./types').PageData} */
  export let text;
  export let link;

  import { navigating } from "$app/stores";

  import Card from "$lib/Card.svelte";
</script>

<div>
  <a href="./{link}">
    <Card {text} />
  </a>
</div>
