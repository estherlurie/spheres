<script lang="ts">
  import ClickableCard from "$lib/ClickableCard.svelte";
</script>

<div class="outer">
  <ClickableCard text="John" link="./people/john" />
  <ClickableCard text="Jane" link="./people/jane" />
  <ClickableCard text="Eric" link="./people/eric" />
  <ClickableCard text="Trinity" link="./people/trinity" />
</div>

<style>
  .outer {
    display: flex;
    width: 90%;
    overflow-x: scroll;
  }
</style>
