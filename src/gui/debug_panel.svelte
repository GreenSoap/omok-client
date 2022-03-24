<footer class="debug-panel">
    <span>Piece: <span contenteditable="true" bind:textContent={piece_coord}></span></span>
    <span>Mouse: <span contenteditable="true" bind:textContent={mouse_coord}></span></span>
    <span>Player Turn: <span contenteditable="true" bind:textContent={player_turn}></span></span>
    <span>Victory: <span contenteditable="true" bind:textContent={victory_status}></span></span>
</footer>

<style>
    .debug-panel{
        user-select: none;
        display: grid;
        font-family: "Visitor";
        font-size: 15px;
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
    export let mouse_coord, piece_coord, player_turn, victory_status;
</script>