<script lang="ts">
  import ClickableCard from "$lib/ClickableCard.svelte";
</script>

<div class="outer">
  <ClickableCard content="John" link="./people/john" />
  <ClickableCard content="Jane" link="./people/jane" />
  <ClickableCard content="Eric" link="./people/eric" />
  <ClickableCard content="Trinity" link="./people/trinity" />
</div>

<style>
  .outer {
    display: flex;
    width: 90%;
    overflow-x: scroll;
  }
</style>
