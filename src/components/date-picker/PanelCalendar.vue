<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { isEqual, isToday, parse, setDate } from 'date-fns';

import VButton from '../ui/button/VButton.vue';

import { daysNames } from './date-picker.constants';
import { generateDaysList } from './date-picker.utils';

const { t } = useI18n();
const { date, dateValue } = defineProps<{ date: Date; dateValue?: string }>();

const emit = defineEmits<{ (e: 'set-day', day: number): void }>();

const saveDate = computed(() => {
  if (dateValue) {
    return parse(dateValue, 'dd.MM.yyyy', new Date());
  }

  return undefined;
});

const calendar = computed(() => {
  return generateDaysList(date);
});
</script>

<template>
  <div class="panel-calendar">
    <div class="panel-calendar--names">
      <span
        v-for="dayName in daysNames"
        :key="dayName.key"
        class="day day-name"
        :class="{ weekend: dayName.isWeekend }"
      >
        {{ t(`dayNames.${dayName.key}`) }}
      </span>
    </div>
    <ul class="panel-calendar--month">
      <li v-for="(el, index) in calendar" :key="`${el.formattedDate}-${index}`">
        <v-button
          variant="text"
          class="day"
          :class="{
            ['current-month']: el.isCurrentMonth,
            selected: saveDate && isEqual(date, setDate(saveDate, el.day)) && el.isCurrentMonth,
            today: isToday(el.formattedDate),
            weekend: el.isWeekend,
          }"
          :disabled="!el.isCurrentMonth"
          @click="emit('set-day', el.day)"
        >
          {{ el.day }}
        </v-button>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.panel-calendar {
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
}

.panel-calendar--names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: auto;
}

.panel-calendar--month {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0;
  margin: 0;
  list-style: none;
}

.day {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  font-weight: normal;
  border: 1px solid transparent;
  border-radius: 100%;
  font-size: 16px;
  opacity: 0.6;
}

.day-name {
  font-weight: bold;
  border: none;
}

.current-month,
.day-name {
  opacity: 1;
}

.weekend {
  color: var(--dp-day-weekend);
}

.today {
  border-color: var(--dp-indigo-light);
}

.selected {
  background-color: var(--dp-indigo);
  border-color: var(--dp-indigo);
  color: var(--dp-white-soft);
}
</style>
