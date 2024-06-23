<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import Button from "$lib/components/Button.svelte";
</script>

<Navbar />
<main>
  <div>
    <form action="?/signUp" method="POST">
      <label for="title"><h3>Sign Up</h3></label>
      <label for="username">Username</label>
      <input class="formEntry" type="text" id="username" name="username" />
      <label for="email">email</label>
      <input class="formEntry" type="text" id="email" name="email" />
      <label for="password">Password</label>
      <input class="formEntry" type="password" id="password" name="password" />
      <Button type="submit" text="Submit" />
    </form>
  </div>
</main>

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
