<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import Button from "$lib/components/Button.svelte";

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<Navbar />
<div>
  <p>Hello</p>
  <form action="?/signIn" method="POST">
    <label for="title"><h3>Sign In</h3></label>
    <label for="username">Username</label>
    <input class="formEntry" type="text" id="username" name="username" />
    <label for="password">Password</label>
    <input class="formEntry" type="password" id="password" name="password" />
    <Button type="submit" text="Submit" />
  </form>
  {#if form?.success}
    <p>Successful signin</p>
  {/if}
</div>

<style>
  form {
    display: block;

    border: solid gray;
    border-radius: 10px;

    width: fit-content;
    padding: 10px;
  }

  .formEntry {
    color: inherit;
    background-color: inherit;
    width: 95%;
    border: solid gray;
    border-radius: 10px;
  }
</style>
