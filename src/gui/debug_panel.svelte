
<wired-card class="debug-panel" elevation="1">
  <header>
    <h3>Debug Panel</h3>
    <wired-button on:click={handle_closer_click}>Close</wired-button>
  </header>
  <section id="debug-values">
    <div>
      <span>Piece: <em contenteditable="true" bind:textContent={piece_coord}></em></span>
      <span>Mouse: <em contenteditable="true" bind:textContent={mouse_coord}></em></span>
    </div>
    <div>
      <span>Player Turn: <strong contenteditable="true" bind:textContent={player_turn}></strong></span>
      <span>Victory: <em contenteditable="true" bind:textContent={victory_status}></em></span>
    </div>
  </section>
</wired-card>

<style lang="scss">
    .debug-panel {
        wired-button{
          background: #ff7979;
        }

        header{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px; 
          margin: 0 0 0 5px;
        }

        div {
          display: flex;
          justify-content: space-evenly;
        }

        h3{
          font-size: 15px; 
        }
    }
</style>

<script lang="ts">
    import "wired-elements";
    export let mouse_coord, piece_coord, player_turn, victory_status;

    let is_open = false;
    const handle_closer_click = (evt: Event) => {
      (evt.target as HTMLButtonElement).textContent = (is_open) ? 'Close' : 'Open';
      document.getElementById('debug-values').style.display = (is_open) ? 'block' : 'none';

      is_open = !is_open;      
    }
</script>