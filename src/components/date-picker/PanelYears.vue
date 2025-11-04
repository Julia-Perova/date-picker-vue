<script setup lang="ts">
import { computed } from 'vue';
import { getDecade } from 'date-fns';

import VButton from '../ui/button/VButton.vue';
import { DECADE_DIAPASON } from './date-picker.constants';

const { date, offset = 0 } = defineProps<{ date: Date; offset?: number }>();

const emits = defineEmits<{ (e: 'set-year', year: number): void }>();

const yearsList = computed(() => {
  const res: number[] = [];
  const decadeStart = getDecade(date) + offset;
  const decadeEnd = decadeStart + DECADE_DIAPASON;

  for (let y = decadeStart; y <= decadeEnd; y++) {
    res.push(y);
  }

  return res;
});
</script>

<template>
  <div class="panel-years">
    <ul class="panel-years--list">
      <li v-for="value in yearsList" :key="value">
        <v-button class="year-btn" variant="text" @click="emits('set-year', value)">
          {{ value }}
        </v-button>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.panel-years {
  padding: 10px 15px;
}

.panel-years--list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.year-btn {
  width: 100%;
  height: 30px;
  font-weight: normal;
  font-size: 16px;
}
</style>
