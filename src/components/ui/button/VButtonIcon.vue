<template>
  <button class="button" type="button">
    <slot />
  </button>
</template>

<style lang="css" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 100%;
  color: var(--dp-black-soft);
  transition: 0.3s;
  cursor: pointer;
}

.button:hover {
  background-color: var(--dp-indigo-hover);
  color: var(--dp-indigo-light);
}
</style>
