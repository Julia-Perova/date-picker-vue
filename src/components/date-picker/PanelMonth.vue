<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import VButton from '../ui/button/VButton.vue';

import { monthsNames } from './date-picker.constants';

const { t } = useI18n();
const emit = defineEmits<{ (e: 'set-month', month: number): void }>();
</script>

<template>
  <div class="panel-months">
    <ul class="panel-months--list">
      <li v-for="(month, index) in monthsNames" :key="month">
        <v-button class="month-btn" variant="text" @click="emit('set-month', index)">{{
          t(`monthsNames.short.${month}`)
        }}</v-button>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.panel-months {
  padding: 10px 15px;
}

.panel-months--list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.month-btn {
  width: 100%;
  height: 30px;
  font-weight: normal;
  font-size: 16px;
}
</style>
