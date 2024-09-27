<script>
  import Button from "./components/Button.svelte";
</script>

<div class="outer">
  <h2>Make a new Sphere</h2>
  <form action="?/createSphere" method="POST">
    <label for="name"><h3>Name</h3></label>
    <input class="formEntry" type="text" id="name" name="name" />
    <label for="allowList"><h3>Insiders</h3></label>
    <textarea class="formEntry" id="allowList" name="allowList" rows={5} />
    <div class="buttonContainer">
      <Button type="submit" text="Create" />
    </div>
  </form>
</div>

<style>
  .outer {
    display: block;

    border: solid gray;
    border-radius: 10px;

    margin: 0 auto;
    padding: 10px;
    width: 25%;
  }

  .formEntry {
    color: inherit;
    background-color: inherit;
    width: 95%;
    border: solid gray;
    border-radius: 10px;
  }
</style>
