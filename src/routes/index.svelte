<NavigationBar></NavigationBar>
<main>
    <wired-card elevation="1">
      <h1>edward omok</h1>
    </wired-card>
    {#if loadedComponent}
        <svelte:component this={loadedComponent} />
    {:else }
        <p>Loading Omok Game...</p>
    {/if}
</main>

<script>
    import "wired-elements"
    import NavigationBar from "../gui/components/navigation_bar.svelte";
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

    @font-face {
        font-family: 'Gloria Hallelujah';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/GloriaHallelujah.woff2") format('woff2');
    }

    @font-face {
        font-family: 'Visitor';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/Visitor.woff2") format('woff2');
    }

    :global(body){
        font: normal 15px 'Gloria Hallelujah', serif; 
    }

    main {
        display: grid;
        gap: 10px;
        max-width: 700px;
        margin: auto;
    }

    main > wired-card{
        text-align: center;
        font-size: 36px;
        padding: 16px;
    }

    h1 { font-weight: normal }
</style>