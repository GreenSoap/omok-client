<NavigationBar></NavigationBar>
<main>
    <wired-card elevation="1">
      <h1>edward omok</h1>
    </wired-card>
    <svelte:component this={OmokViewModel}></svelte:component>
</main>

<script>
  import "wired-elements"
  import NavigationBar from "../gui/components/navigation_bar.svelte";
  import OmokViewModel from "../gui/omok_view_model.svelte";

    {#if loadedComponent}
        <svelte:component this={loadedComponent} />
    {:else }
        <p>Loading Omok Game...</p>
    {/if}
</main>

<script>
import { onMount } from "svelte";

    let loadedComponent = null;
    const OmokViewModel = () => import("../gui/omok_view_model.svelte");

    onMount(() => {
        OmokViewModel().then(module => {
            loadedComponent = module.default;
        });
    });

</script>

<style>
    @font-face {
        font-family: 'Pirata One';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/PirataOne-Regular.woff2") format('woff2');
    }

    * {
        margin: 0;
        border: 0;
        padding: 0;
    }
    main {
        display: grid;
        gap: 10px;
        max-width: 700px;
        margin: auto;
        font: normal 20px 'Pirata One', serif; 
    }

    main > wired-card{
        text-align: center;
        font-size: 36px;
        font-family: "Gloria Hallelujah", cursive;
        padding: 16px;
    }

    h1 { font-weight: normal }
</style>