<script lang="ts">
	import 'wired-elements';
	import Fa from 'svelte-fa';
	import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
	export let mouse_coord, piece_coord, player_turn, victory_status;

	let is_open = true;
	const handle_closer_click = (evt: Event) => {
		is_open = !is_open;
	};
</script>

<wired-card class="debug-panel" elevation="1">
	<header>
		<h3>Debug Panel</h3>
		<wired-button on:click={handle_closer_click}>
			{#if is_open}
				<Fa icon={faCaretUp} />
			{:else}
				<Fa icon={faCaretDown} />
			{/if}
		</wired-button>
	</header>
	{#if is_open}
		<section>
			<div>
				<span>Piece: [<em contenteditable="true" bind:textContent={piece_coord} />]</span>
				<span>Mouse: [<em contenteditable="true" bind:textContent={mouse_coord} />]</span>
			</div>
			<div>
				<span>Player Turn: <strong contenteditable="true" bind:textContent={player_turn} /></span>
				<span>Victory: <em contenteditable="true" bind:textContent={victory_status} /></span>
			</div>
		</section>
	{/if}
</wired-card>

<style lang="scss">
	:global(.debug-panel) {
		wired-button {
			background: #ff7979;
		}

		header {
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

		h3 {
			font-size: 15px;
		}
	}
</style>
