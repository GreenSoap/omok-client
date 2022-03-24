

<main>
    <header><h1>Edward Omok</h1></header>
    <svelte:component this={OmokViewModel}></svelte:component>
</main>

<script>
    const OmokViewModel = () => import("../gui/omok_view_model.svelte");
    
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

    main > header{
        text-align: center;
        font-size: 36px;
    }

    h1 { font-weight: normal }
</style>