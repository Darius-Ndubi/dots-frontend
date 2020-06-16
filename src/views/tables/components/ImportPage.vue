<template>
  <div class="import-page">
    <div>
      <h1>{{ $t('tables.importTable.importTable') }}</h1>
    </div>
    <div class="import-button">
      <h-button
        dark-text
        class="header-button"
        @click="showCsv = true"
      >
        {{ $t('tables.importTable.importCsv') }}
      </h-button>
      <span class="vertical" />
      <h-button
        dark-text
        @click="showCsv = false"
      >
        {{ $t('tables.importTable.importKobo') }}
      </h-button>
    </div>
    <div>
      <template v-if="showCsv">
        <import-csv-form
          :table="currentTable"
        />
      </template>
    </div>
  </div>
</template>

<script>
import ImportCsvForm from './ImportCsvForm'

export default {
  name: 'ImportPage',
  components: {
    ImportCsvForm
  },
  data: () => {
    return {
      showModal: false,
      loading: false,
      currentTable: null,
      tableSource: '',
      thirdPartyForms: null,
      showCsv: true
    }
  },
  methods: {

    /**
       * Called on modal close event
       */
    modalClosed() {
      this.showModal = false
      this.currentTable = null
    },

    /**
       * trigger when a table source is selected
       * @param event
       */
    sourceSelected(event) {
      this.tableSource = event.toLowerCase()
      if (this.tableSource !== 'csv') {
        this.$store.dispatch(
          `tables/${tableActions.GET_THIRD_PARTY_FORMS}`,
          this.tableSource
        ).then((forms) => {
          this.thirdPartyForms = forms
        })
      }
      this.showModal = true
    }
  }

}

</script>

<style scoped lang="scss">
.import-page{
    padding-left: 10%;
}
.import-buttons{
    padding-bottom: 2%;
    padding-top: 2%;
}
.vertical {
    border-left: 1px solid black;
    height: 1000px;
    padding-right: 5%;
}
.header-button{
    margin-right: 5%
}

.import-csv-form {
    &__upload-area {
      width: 100%;
    }

    &__fields {
      display: flex;
    }

    &__field-item {
      flex: 1;
      margin-right: 8px;

      &:last-child {
        margin-right: unset;
      }
    }

    &__action-btns {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    &__help-text {
      font-size: 14px;
      color: #25CED1;
    }
  }
</style>
