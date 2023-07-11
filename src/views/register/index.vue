<template>
  <div class="container">
    <div class="content">
      <div class="content-inner">
        <Register />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Register from '@/views/register/components/register.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }
  }
</style>
