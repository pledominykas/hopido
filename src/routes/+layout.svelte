<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="flex h-dvh items-center justify-center">
  <div>
    {@render children()}
  </div>
</div>
