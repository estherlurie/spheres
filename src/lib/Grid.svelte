<script lang="ts">
  import ClickableCard from "$lib/ClickableCard.svelte";
</script>

<div class="outer">
  <ClickableCard text="John" link="./people/John" />
  <ClickableCard text="Jane" link="./people/Jane" />
  <ClickableCard text="Eric" link="./people/Eric" />
  <ClickableCard text="Trinity" link="./people/Trinity" />
</div>

<style>
  .outer {
    display: flex;
    width: 1000px;
  }
</style>
