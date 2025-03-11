<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="background--custom flex h-dvh flex-col">
  <div class="grow">Header</div>
  <div class="flex grow-7 items-center justify-center">
    {@render children()}
  </div>
  <div class="grow">Footer</div>
</div>
