<wired-card class="debug-panel" elevation="1">
    <div class="row">
      <div class="six columns">
        <span>Piece: <span contenteditable="true" bind:textContent={piece_coord}></span></span>
      </div>
      <div class="six columns">
        <span>Mouse: <span contenteditable="true" bind:textContent={mouse_coord}></span></span>
      </div>
    </div>
    <div class="row">
      <div class="six columns">
        <span>Player Turn: <span contenteditable="true" bind:textContent={player_turn}></span></span>
      </div>
    </div>
</wired-card>
<style>
    :global(.debug-panel){
        user-select: none;
        font-family: "Visitor";
        padding: 16px;
    }

    @font-face {
        font-family: 'Visitor';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/Visitor.woff2") format('woff2');
    }
</style>

<script lang="ts">
    import "wired-elements";
    export let mouse_coord, piece_coord, player_turn;
</script>