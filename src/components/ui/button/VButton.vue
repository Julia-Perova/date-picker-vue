<script setup lang="ts">
const {
  variant = 'default',
  outlined = false,
  color = 'dark',
} = defineProps<{
  color?: 'dark' | 'light'
  outlined?: boolean
  variant?: 'default' | 'text'
}>()
</script>

<template>
  <button
    class="button"
    :class="{
      [`button_${variant}`]: variant != 'default',
      [`button_${color}`]: color !== 'dark',
      button_ounlined: outlined,
    }"
    type="button"
  >
    <slot />
  </button>
</template>

<style lang="css" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  height: 42px;
  padding: 10px 20px;
  background-color: var(--dp-indigo);
  border: 1px solid var(--dp-indigo);
  border-radius: 10px;
  color: var(--dp-white-soft);
  font-size: 14px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
}

.button:hover:not(:disabled) {
  background-color: transparent;
  color: var(--dp-indigo);
}

.button:disabled {
  filter: grayscale(1);
  opacity: 0.8;
  cursor: default;
}

.button_text {
  width: fit-content;
  min-width: unset;
  height: fit-content;
  padding: 2px 5px;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  color: var(--dp-black-mute);
}

.button_text:hover:not(:disabled) {
  background-color: var(--dp-indigo-hover);
}

.button_ounlined {
  background-color: transparent;
  color: var(--dp-indigo);
  border-color: var(--dp-indigo);
}

.button_ounlined:hover {
  background-color: var(--dp-indigo);
  color: var(--dp-white-soft);
}

.button_light {
  background-color: var(--dp-white-soft);
  border-color: var(--dp-white-soft);
  color: var(--dp-indigo);
}

.button_light:hover {
  background-color: var(--dp-indigo);
  border-color: var(--dp-indigo);
  color: var(--dp-white-soft);
}

.button_light.button_ounlined {
  background-color: transparent;
  color: var(--dp-white-soft);
}

.button_light.button_ounlined:hover {
  background-color: var(--dp-white-soft);
  color: var(--dp-indigo);
}
</style>
