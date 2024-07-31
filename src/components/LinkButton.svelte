<script>
  export let href;
</script>

<a class="button body-text" {href} target="_blank"><slot /></a>

<style>
  .button {
    text-decoration: none;

    display: inline-block;
    padding: 7px 20px;
    border: 3px solid #00b7ff;

    color: rgb(0, 183, 255);
    
    cursor: pointer;
  }
</style>