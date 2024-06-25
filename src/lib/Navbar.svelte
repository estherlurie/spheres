<script lang="ts">
  export let username: string | null;
</script>

<main>
  <a href="/">Home</a>
  <a href="/origin">Origin</a>
  <a href="/profile">Profile</a>
  <a href="/logout">Logout</a>
  {#if username}
    <p>Hello {username}</p>
  {/if}
</main>

<style lang="scss">
  main {
    background-color: rgb(68, 94, 86);
    border: solid;
    border-color: black;
    border-radius: 10px;
    height: 50px;

    display: flex;
  }

  a {
    margin: 10px 25px;
    font-size: 18px;
    padding: 5px;
  }
</style>
