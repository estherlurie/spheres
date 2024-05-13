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

    display: flexbox;

    height: 300px;
    width: 140px;

    margin: 10px;

    border: solid rgb(6, 66, 11);
    border-radius: 10px;
  }

  p {
    display: flexbox;
    margin: 130px auto;

    text-align: center;

    font-size: 30px;
  }
</style>
