<script lang="ts">
  /** @type {import('./types').PageData} */
  export let title;
  export let content;
  export let link;

  import { navigating } from "$app/stores";
  import Card from "$lib/components/Card.svelte";
</script>

<div>
  <a href="./{link}">
    <Card {title} {content} />
  </a>
</div>
