<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 80px;
}
</style>
