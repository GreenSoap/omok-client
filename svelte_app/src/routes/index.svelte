<script lang="ts">
	import 'wired-elements';
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import NavigationBar from '../gui/components/navigation_bar.svelte';
	import MainMenu from '../gui/main_menu.svelte';
</script>

<header>
	<h1>omok.io</h1>
	<NavigationBar />
</header>
<main class="app">
	<MainMenu />
</main>

<footer>
	<span class="footer-info">
		<strong>omok.io</strong> | <em>by william and joshua</em> |
		<a href="https://github.com/GreenSoap/omok-client"><Fa icon={faGithub} /> Github</a>
	</span>
</footer>

<style lang="scss">
	@font-face {
		font-family: 'Pirata One';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url('/PirataOne-Regular.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Gloria Hallelujah';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url('/GloriaHallelujah.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Visitor';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url('/Visitor.woff2') format('woff2');
	}

	:global(h1, h2, h3, h4) {
		margin: 0;
	}

	:global(a) {
		text-decoration: none;
	}

	:global(html) {
		height: 100%;
	}

	:global(body) {
		font: normal 18px 'Gloria Hallelujah', serif;
		min-height: 100%;
		display: grid;
		grid-template-rows: 0fr 1fr 0fr;
		max-width: 1200px;
		margin: auto;

		> header {
			display: flex;
			justify-content: space-between;
			max-width: 720px;
			align-items: end;
		}

		background-color: #fff;
		background-image: linear-gradient(
				90deg,
				transparent 79px,
				#abced4 79px,
				#abced4 81px,
				transparent 81px
			),
			linear-gradient(#eee 0.1em, transparent 0.1em);
		background-size: 100% 1.2em;
	}

	main {
		display: grid;
		gap: 10px;
	}

	footer {
		display: flex;
		justify-content: right;
		padding: 15px;
		font-size: 18px;
	}

	.footer-info > * {
		margin: 0 10px;
	}

	h1 {
		font-weight: normal;
		font-size: 3.5em;
	}
</style>
