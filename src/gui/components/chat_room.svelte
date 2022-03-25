<wired-card>
  <ol>
      <li>
        <article>
          <header>
            <figure>
              <figcaption>William</figcaption>
            </figure>
            <time>11:32</time>
          </header>
          <p>Hello my name is William xDxD</p>
        </article>
      </li>
      <li>
        <article>
          <header>
            <figure>
              <figcaption>Joshua</figcaption>
            </figure>
            <time>11:32</time>
          </header>
          <p>Hello my name is William xDxD</p>
        </article>
      </li>
      <li>
        <article>
          <header>
            <figure>
              <figcaption>William</figcaption>
            </figure>
            <time>11:32</time>
          </header>
          <p>Hello my name is Joshua xDxD</p>
        </article>
      </li>
    </ol>
  </wired-card>
<section class="input-area">
  <wired-input></wired-input>
  <wired-button elevation="2">Send <Fa icon={faPaperPlane}></Fa></wired-button>
</section>

<style lang="scss">
  ol {
    list-style: none;
    margin: 5px 20px;
    padding: 0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  figure{
    margin: 0;
  }

  .input-area{
    display: flex;
    wired-input {
      flex: 1;
    }
  }
</style>
<script>
  import "wired-elements"
  import Fa from 'svelte-fa';
  import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

</script>