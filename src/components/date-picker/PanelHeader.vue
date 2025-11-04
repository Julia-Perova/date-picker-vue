<script setup lang="ts">
import { computed } from 'vue';
import { getDecade, getMonth, getYear } from 'date-fns';
import { useI18n } from 'vue-i18n';

import VButton from '../ui/button/VButton.vue';
import VButtonIcon from '../ui/button/VButtonIcon.vue';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';

import {
  DECADE_DIAPASON,
  monthsNames,
  YEARS_DIAPASON_NEXT,
  YEARS_DIAPASON_PREV,
} from './date-picker.constants';

const { t } = useI18n();
const {
  activePanel,
  date,
  offset = 0,
} = defineProps<{
  activePanel: 'calendar' | 'months' | 'years';
  date: Date;
  offset?: number;
}>();

const currentYear = computed(() => getYear(date));
const currentMonth = computed(() => getMonth(date));

const decade = computed(() => {
  const start = getDecade(date) + offset;
  const end = start + DECADE_DIAPASON;

  return `${start} - ${end}`;
});

const emit = defineEmits<{
  (e: 'change-active-panel', panelName: 'calendar' | 'months' | 'years'): void;
  (e: 'set-month', month: number): void;
  (e: 'set-year', year: number): void;
  (e: 'set-years-offset', offset: number): void;
}>();

const handleClickPrev = () => {
  switch (activePanel) {
    case 'years':
      emit('set-years-offset', YEARS_DIAPASON_PREV);
      break;
    case 'months':
      emit('set-year', currentYear.value - 1);
      break;
    default:
      emit('set-month', currentMonth.value - 1);
  }
};

const handleClickNext = () => {
  switch (activePanel) {
    case 'years':
      emit('set-years-offset', YEARS_DIAPASON_NEXT);
      break;
    case 'months':
      emit('set-year', currentYear.value + 1);
      break;
    default:
      emit('set-month', currentMonth.value + 1);
  }
};
</script>

<template>
  <div class="panel-header">
    <v-button-icon @click.stop="handleClickPrev">
      <arrow-left-icon width="15" height="15" />
    </v-button-icon>
    <div class="panel-header--date">
      <v-button
        v-if="activePanel === 'calendar'"
        variant="text"
        @click="emit('change-active-panel', 'months')"
      >
        {{ t(`monthsNames.full.${monthsNames[currentMonth]}`) }}
      </v-button>
      <v-button
        v-if="activePanel !== 'years'"
        variant="text"
        @click="emit('change-active-panel', 'years')"
      >
        {{ currentYear }}
      </v-button>
      <span v-else class="decade">{{ decade }}</span>
    </div>
    <v-button-icon @click="handleClickNext">
      <arrow-right-icon width="15" height="15" />
    </v-button-icon>
  </div>
</template>

<style lang="css" scoped>
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
}

.panel-header--date {
  display: flex;
  align-items: center;
  gap: 2px;
}

.decade {
  font-weight: bold;
}
</style>
