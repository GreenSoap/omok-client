<!-- Lobby Creation Menu -->
<h3>Lobby Creation</h3>
<label for="name-input">What's your name?</label>
<wired-card>
  <input id="name-input" placeholder="Name" bind:value={name_input} />
</wired-card>

<label for="lobby-code-input">What Lobby Code do you want for your game? <br />
<em>Your friends use this to join you!</em></label>
<wired-card>
  <input id="lobby-code-input" placeholder="Lobby Code" bind:value={lobby_code_input} />
</wired-card>
<wired-button elevation="3" on:click={dispatch('create_lobby_clicked', {
  lobby_code_input,
  name_input
})}>Create Lobby!</wired-button>
<wired-button elevation="3" on:click={dispatch('back_button_clicked')}>Go Back!</wired-button>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let lobby_code_input = "", name_input = "";
</script>