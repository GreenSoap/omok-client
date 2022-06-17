<script lang="ts">
	import 'wired-elements';
	import OmokViewModel from './omok_game/omok_view_model.svelte';
	import { onMount } from 'svelte';

	let lobby_code_input, name_input;

	let switch_screen = false;
	let display_lobby_creation = false,
		display_lobby_join = false;

	let app_container: HTMLElement;

	onMount(() => {
		app_container = document.querySelector('.app');
	});

	const create_lobby = () => {
		const _ = new OmokViewModel({
			target: app_container,
			props: {
				lobby_code: lobby_code_input,
				creator_name: name_input,
				participant_name: null,
			},
			intro: false
		});

		switch_screen = true;
	};

	const create_local_lobby = () => {
		const _ = new OmokViewModel({
			target: app_container,
			props: {
				lobby_code: null,
				creator_name: null,
				participant_name: null,
			},
			intro: false
		});

		switch_screen = true;
	};

	const join_lobby = () => {
		const _ = new OmokViewModel({
			target: app_container,
			props: {
				lobby_code: lobby_code_input,
				creator_name: null,
				participant_name: name_input,
			},
			intro: false
		});

		switch_screen = true;
	};

	const create_ai_lobby = () => {
		const _ = new OmokViewModel({
			target: app_container,
			props: {
				lobby_code: null,
				creator_name: null,
				participant_name: null,
			},
			intro: false
		});

		switch_screen = true;
	};

	const create_lobby_menu_clicked = () => {
		display_lobby_creation = true;
	};

	const join_lobby_menu_clicked = () => {
		display_lobby_join = true;
	};

	const create_local_menu_clicked = () => {
		create_local_lobby();
	};

	const back_button_clicked = () => {
		display_lobby_creation = false;
		display_lobby_join = false;
	};
</script>

{#if !switch_screen}
	<wired-card class="main_menu" elevation="5">
		<div>
			{#if display_lobby_creation}
				<!-- Lobby Creation Menu -->
				<h3>Lobby Creation</h3>
				<label for="name-input">What's your name?</label>
				<wired-card>
					<input id="name-input" placeholder="Name" bind:value={name_input} />
				</wired-card>

				<label for="lobby-code-input"
					>What Lobby Code do you want for your game? <br /><em
						>Your friends use this to join you!</em
					></label
				>
				<wired-card>
					<input id="lobby-code-input" placeholder="Lobby Code" bind:value={lobby_code_input} />
				</wired-card>
				<wired-button elevation="3" on:click={create_lobby}>Create Lobby!</wired-button>
				<wired-button elevation="3" on:click={back_button_clicked}>Go Back!</wired-button>
			{:else if display_lobby_join}
				<h3>Join a Lobby</h3>
				<label for="lobby-code-input">What is the code of the lobby you want to join?</label>
				<wired-card>
					<input id="lobby-code-input" placeholder="Lobby Code" bind:value={lobby_code_input} />
				</wired-card>
				<wired-button elevation="3" on:click={join_lobby}>Join Lobby!</wired-button>
				<wired-button elevation="3" on:click={back_button_clicked}>Go Back!</wired-button>
			{:else}
				<!-- Main Menu -->
				<h2>Welcome to omok.io!</h2>
				<wired-button elevation="2" on:click={create_lobby_menu_clicked}>Create Lobby</wired-button>
				<wired-button elevation="2" on:click={join_lobby_menu_clicked}>Join Lobby</wired-button>
				<wired-button elevation="2" on:click={create_ai_lobby}>Play vs Computer</wired-button>
				<wired-button elevation="2" on:click={create_local_menu_clicked}>Play locally</wired-button>
			{/if}
		</div>
	</wired-card>
{/if}

<style lang="scss">
	:global(.main_menu) {
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

		wired-button {
			font-size: 18px;
			transition: transform 0.125s ease;

			&:hover {
				transform: scale3d(1.25, 1.05, 1.55);
			}
		}

		input {
			font-family: 'Gloria Hallelujah';
			background: 0;
			border: 0;
			outline: 0;
		}
	}
</style>
