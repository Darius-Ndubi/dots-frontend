<template>
  <div class="import-page">
    <div>
      <h1>{{ $t('tables.importTable.importTable') }}</h1>
    </div>
    <div class="import-button">
      <h-button
        dark-text
        class="header-button"
      >
        {{ $t('tables.importTable.importCsv') }}
      </h-button>
      <span class="vertical" />
      <h-button
        dark-text
      >
        {{ $t('tables.importTable.importKobo') }}
      </h-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImportPage'

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
</style>
