<form action="?/createPost" method="POST">
  <h2>What do you want to say?</h2>
  <label for="title"><h3>Title</h3></label>
  <input class="formEntry" type="text" id="title" name="title" />
  <label for="content"><h3>Content</h3></label>
  <textarea class="formEntry" id="content" name="content" rows={5} />
  <button type="submit">Add Post</button>
</form>

<style>
  form {
    display: grid;
  }

  .formEntry {
    color: inherit;
    background-color: inherit;
    min-width: auto;
    width: fit-content;
    border: solid gray;
    border-radius: 10px;
  }

  button {
    margin-top: 5%;
    width: fit-content;
  }
</style>
