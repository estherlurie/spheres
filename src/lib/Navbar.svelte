<script lang="ts">
  export let username: string | null = null;
</script>

<nav>
  <a href="/">Home</a>
  {#if username}
    <a href="/origin">Origin</a>
    <a href="/profile">Profile</a>
    <a href="/logout">Logout</a>
  {:else}
    <a href="/login">Login</a>
  {/if}
</nav>

<style lang="scss">
  nav {
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
