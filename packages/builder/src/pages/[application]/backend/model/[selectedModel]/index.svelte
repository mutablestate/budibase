<script>
  import { getContext } from "svelte"
  import { Button } from "@budibase/bbui"
  import ModelDataTable from "components/database/ModelDataTable"
  import { backendUiStore } from "builderStore"
  import ActionButton from "components/common/ActionButton.svelte"
  import * as api from "components/database/ModelDataTable/api"
  import { CreateEditRecordModal } from "components/database/ModelDataTable/modals"

  const { open, close } = getContext("simple-modal")

  $: selectedModel = $backendUiStore.selectedModel
</script>

{#if $backendUiStore.selectedDatabase._id && selectedModel.name}
  <ModelDataTable />
{:else}
  <i style="color: var(--grey-4)">create your first table to start building</i>
{/if}

<style>
  i {
    font-size: 20px;
    margin-right: 10px;
  }
</style>
