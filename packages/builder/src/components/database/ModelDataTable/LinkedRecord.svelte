<script>
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { backendUiStore } from "builderStore"
  import api from "builderStore/api"

  export let ids = []
  export let field

  let records = []
  let open = false
  let model

  $: FIELDS_TO_HIDE = [$backendUiStore.selectedModel.name]

  async function fetchRecords() {
    const response = await api.post("/api/records/search", {
      keys: ids,
    })
    const modelResponse = await api.get(`/api/models/${field.modelId}`)
    records = await response.json()
    model = await modelResponse.json()
  }

  $: ids && fetchRecords()

  function toggleOpen() {
    open = !open
  }

  onMount(() => {
    fetchRecords()
  })
</script>

<section>
  <a on:click={toggleOpen}>{records.length}</a>
  {#if open}
    <div class="popover" transition:fade>
      <header>
        <h3>{field.name}</h3>
        <i class="ri-close-circle-fill" on:click={toggleOpen} />
      </header>
      {#each records as record}
        <div class="linked-record">
          <div class="fields">
            {#each Object.keys(model.schema).filter(key => !FIELDS_TO_HIDE.includes(key)) as key}
              <div class="field">
                <span>{model.schema[key].name}</span>
                <p>{record[key]}</p>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  section {
    display: relative;
  }

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  i {
    font-size: 24px;
    color: var(--ink-lighter);
  }

  i:hover {
    cursor: pointer;
  }

  a {
    font-size: 14px;
  }

  .popover {
    width: 500px;
    position: absolute;
    right: 15%;
    padding: 20px;
    background: var(--grey-1);
    border: 1px solid var(--grey);
  }

  h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }

  .fields {
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    background: var(--white);
    border: 1px solid var(--grey);
    border-radius: 5px;
    margin-bottom: 8px;
  }

  .field span {
    color: var(--ink-lighter);
    font-size: 12px;
  }

  .field p {
    color: var(--ink);
    font-size: 14px;
    word-break: break-word;
    font-weight: 500;
    margin-top: 4px;
  }
</style>
