<script>
  import Button from "./components/Button.svelte";
</script>

<form action="?/createSphere" method="POST">
  <h2>Make a new Sphere</h2>
  <label for="name"><h3>Name</h3></label>
  <input class="formEntry" type="text" id="name" name="name" />
  <label for="allowList"><h3>Insiders</h3></label>
  <textarea class="formEntry" id="allowList" name="allowList" rows={5} />
  <div class="buttonContainer">
    <Button type="submit" text="Create" />
  </div>
</form>

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
