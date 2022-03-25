<NavigationBar></NavigationBar>

<main>
    <wired-card elevation="1">
        <h1>omok.io</h1>
    </wired-card>
    {#if loadedComponent}
        <svelte:component this={loadedComponent} />
    {:else }
        <p>Loading Omok Game...</p>
    {/if}
</main>

<footer>
    <span>
        <strong>omok-client</strong> | 
        <a href="https://github.com/GreenSoap/omok-client"><Fa icon={faGithub}></Fa>  Github</a>
    </span>
</footer>

<script>
    import { onMount } from "svelte";
    import "wired-elements"
    import Fa from 'svelte-fa';
    import { faGithub } from '@fortawesome/free-brands-svg-icons';
    import NavigationBar from "../gui/components/navigation_bar.svelte";

    let loadedComponent = null;
    const OmokViewModel = () => import("../gui/omok_view_model.svelte");

    onMount(() => {
        OmokViewModel().then(module => {
            loadedComponent = module.default;
        });
    });

</script>

<style lang="scss">
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

    :global(a){
        text-decoration: none;
    }

    :global(html){
        height: 100%;
    }

    :global(body){
        font: normal 15px 'Gloria Hallelujah', serif; 
        min-height: 100%;
        display: grid;
        grid-template-rows: 0fr 1fr 0fr;
        align-items: end;
    }

    main {
        display: grid;
        gap: 10px;
        max-width: 1200px;
        margin: auto;

        > wired-card{
            text-align: center;
            font-size: 36px;
            padding: 10px;
            opacity: 1;
        }
    }

    footer {
        display: flex;
        justify-content: center;
        padding: 15px;
        font-size: 18px;
    }

    h1 { font-weight: normal }
</style>