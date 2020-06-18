<template>
  <section>
    <div class="content">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>

    <div class="footer">
      <a href="https://hikaya.io/">
        <img src="../assets/hikaya-logo.png" alt="Hikaya logo">
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style scoped lang="scss">
  .content {
    margin-bottom: 100px;
  }
  .footer {
    display: flex;
    background-color: $background-color;
    height: 58px;
    position: fixed;
    bottom: 0;
    width: 100%;
    align-items: center;

    a{
      height: 3rem;
    }

    img {
      margin: 15px 0 0 60px;
      height: 35%;
    }
  }
</style>
