
{#if !switch_screen}
  <wired-card class="main_menu">
    <div>
      {#if display_lobby_creation}
        <label for="name-input">What's your name?</label>
        <wired-card>
          <input id="name-input" placeholder="Name" bind:value={name_input}/>
        </wired-card>

        <label for="lobby-code-input">What Lobby Code do you want for your game? <br><em>Your friends use this to join you!</em></label>
        <wired-card>
          <input id="lobby-code-input" placeholder="Lobby Code" bind:value={lobby_code_input}/>
        </wired-card>
        <wired-button type="submit" elevation="3" on:click={create_lobby}>Create Lobby!</wired-button>
        <wired-button elevation="3" on:click={back_button_clicked}>Go Back!</wired-button>
      {:else}
        <wired-button on:click={create_lobby_menu_clicked}>Create Lobby</wired-button>
        <wired-button on:click={handle_play_click}>Join Lobby</wired-button>
        <wired-button on:click={handle_play_click}>Play vs Computer</wired-button>
        <wired-button on:click={handle_play_click}>Play locally</wired-button>
      {/if}
    </div>
  </wired-card>
{/if}

<style lang="scss">
  :global(.main_menu){
    margin: 0 auto;
    height: fit-content;
    opacity: 1;
    margin-top: 100px;

    > div {
      display: grid;
      grid-gap: 15px;
      text-align: center;
      justify-items: center;
      padding: 15px;
    }

    wired-button{
      font-size: 18px;
    }

    input {
      font-family: "Gloria Hallelujah"; 
      background: 0;
      border: 0; 
      outline: 0;
    }
  }
</style>

<script lang="ts">

  import "wired-elements";
  import OmokViewModel from "./omok_game/omok_view_model.svelte";
  import { LobbyType } from "../multiplayer/lobby/base_lobby";
import { onMount } from "svelte";

  let lobby_code_input, name_input;

  let switch_screen = false;
  let display_lobby_creation = false;

  let app_container: HTMLElement;

  onMount(() => {
    app_container = document.querySelector('.app');
  })

  const create_lobby = () => {
    const _ = new OmokViewModel({
      target: app_container, 
      props: {  
        lobby_code: lobby_code_input,
        creator_name: name_input,
        lobby_type: LobbyType.ONLINE_CREATE
      },
      intro: false
    });

    switch_screen = true;
  }

  const create_lobby_menu_clicked = () => {
    display_lobby_creation = true;
  }

  const back_button_clicked = () => {
    display_lobby_creation = false;
  }

  const handle_play_click = () => {
    /*
      const model = new OmokViewModel({
        target: document.querySelector('.app'), 
        props: {  
          lobby_code: "hehe",
          intro: true
        }
      });

      switch_screen = true;*/
  }
</script>