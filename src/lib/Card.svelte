<script lang="ts">
  /** @type {import('./types').PageData} */
  export let title;
  export let content;
</script>

<div class="card">
  {#if title}
    <header>{title}</header>
  {/if}
  <p>{content}</p>
</div>

<style lang="scss">
  .card {
    background-color: rgb(24, 100, 114);

    display: inline-block;

    height: 300px;
    width: 140px;

    margin: 1%;

    border: solid rgb(6, 66, 11);
    border-radius: 10px;
  }

  header {
    font-size: 25px;
    padding-top: 10%;
    text-align: center;
  }

  p {
    display: flexbox;
    margin: 30px auto;

    text-align: center;

    font-size: 18px;

    white-space: nowrap;
    overflow: hidden;
    text-wrap: pretty;
    text-overflow: clip;
    overflow-y: scroll;
  }
</style>
