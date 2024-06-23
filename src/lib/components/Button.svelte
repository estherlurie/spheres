<script lang="ts">
  export let type;
  export let text: String;
</script>

<button {type}>{text}</button>

<style>
  button {
    margin: 0 auto;
    width: fit-content;
    background-color: lightblue;
    border-radius: 10px;
  }
</style>
