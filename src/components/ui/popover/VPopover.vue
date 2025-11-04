<script setup lang="ts">
import { computed } from 'vue';

const {
  elementId,
  distance = 2,
  isOpen,
  position = 'bottom',
} = defineProps<{
  elementId: string;
  distance?: number;
  isOpen: boolean;
  position?: 'top' | 'bottom';
}>();

const popoverDistance = computed(() => {
  return `${distance}px`;
});
</script>

<template>
  <transition name="fade">
    <teleport defer :to="`#${elementId}`">
      <div v-if="isOpen" class="popover" :class="`popover_${position}`">
        <div class="popover-header">
          <slot name="header" />
        </div>
        <div class="popover-body">
          <slot />
        </div>
        <div class="popover-footer">
          <slot name="footer" />
        </div>
      </div>
    </teleport>
  </transition>
</template>

<style lang="css" scoped>
.popover {
  position: absolute;
  left: 0;
  min-width: 100%;
  min-height: 200px;
  background-color: var(--dp-white);
  box-shadow: 0 0 8px 0px var(--dp-indigo-light);
  border-radius: 10px;
  z-index: 2;
}

.popover_top {
  bottom: 100%;
  margin-bottom: v-bind(popoverDistance);
}

.popover_bottom {
  top: 100%;
  margin-top: v-bind(popoverDistance);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
