<script lang="ts">
  import { gameState, handleSquareClicked } from '$lib/game-state.svelte';
  import { SquareState } from '$lib/grid-utils';

  const gridSizeClasses: Record<number, string> = {
    [1]: 'grid-cols-1 grid-rows-1',
    [2]: 'grid-cols-2 grid-rows-2',
    [3]: 'grid-cols-3 grid-rows-3',
    [4]: 'grid-cols-4 grid-rows-4',
    [5]: 'grid-cols-5 grid-rows-5',
    [6]: 'grid-cols-6 grid-rows-6',
    [7]: 'grid-cols-7 grid-rows-7',
    [8]: 'grid-cols-8 grid-rows-8',
    [9]: 'grid-cols-9 grid-rows-9',
    [10]: 'grid-cols-10 grid-rows-10'
  };

  const squareColorClasses: Record<SquareState, string> = {
    [SquareState.Current]: 'outline-green-400 z-1',
    [SquareState.ValidMove]: 'outline-blue-400 z-1',
    [SquareState.None]: 'outline-gray-200 z-0'
  };
</script>

<div
  class="grid {gridSizeClasses[
    gameState.grid.size
  ]} aspect-square gap-[1px] font-medium text-black portrait:w-full landscape:h-full"
>
  {#each gameState.grid.squares as row}
    {#each row as square}
      <div
        onclick={() => handleSquareClicked(square)}
        class="flex aspect-square items-center justify-center outline {squareColorClasses[
          square.state
        ]}"
      >
        {#if square.value !== null}
          {square.value}
        {/if}
      </div>
    {/each}
  {/each}
</div>
