<footer class="debug-panel">
    <span contenteditable="true" bind:textContent={piece_coord}></span>
    <span contenteditable="true" bind:textContent={mouse_coord}></span>
    <span contenteditable="true" bind:textContent={player_turn}></span>
</footer>

<style>
    .debug-panel{
        user-select: none;
        display: flex;
        justify-content: space-between;
        font-family: "Visitor";
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
    export let mouse_coord, piece_coord, player_turn;
</script>