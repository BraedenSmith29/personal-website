<script>
  export let href;
</script>

<a class="button" {href} target="_blank"><slot /></a>

<style>
  .button {
    all: unset;

    display: inline-block;
    padding: 7px 20px;
    border: 3px solid #00b7ff;

    color: rgb(0, 183, 255);
    font-size: 1.25em;
    
    cursor: pointer;
  }
</style>