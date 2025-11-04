<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { format, parse, setDate, setMonth, setYear } from 'date-fns';
import { useI18n } from 'vue-i18n';

import VPopover from '../ui/popover/VPopover.vue';
import CalendarIcon from '../icons/CalendarIcon.vue';

import PanelCalendar from './PanelCalendar.vue';
import PanelHeader from './PanelHeader.vue';
import PanelMonth from './PanelMonth.vue';
import PanelYears from './PanelYears.vue';

const { t } = useI18n();
const datePicker = useTemplateRef('date-picker');

const { date } = defineProps<{ date?: Date }>();
const emits = defineEmits<{ (e: 'set-new-date', date: Date): void }>();

const isOpenedCalendar = ref<boolean>(false);
const activePanel = ref<'calendar' | 'months' | 'years'>('calendar');
const yearsOffset = ref<number>(0);
const datePickerDate = ref(date);
const datePickerValue = ref<string>('');

onMounted(() => {
  if (date) {
    datePickerValue.value = format(date, 'dd.MM.yyyy');
  }
});

const openCalender = () => {
  isOpenedCalendar.value = true;
};

const changeActivePanel = (panelName: 'calendar' | 'months' | 'years') => {
  activePanel.value = panelName;
};

const setYearsOffset = (offset: number) => {
  yearsOffset.value += offset;
};

const closeCalendar = () => {
  if (isOpenedCalendar.value) {
    datePickerDate.value = date;
    isOpenedCalendar.value = false;
  }
  activePanel.value = 'calendar';
  yearsOffset.value = 0;
};

const handleSetDay = (day: number) => {
  const newDate = datePickerDate.value || new Date();
  datePickerDate.value = setDate(newDate, day);
  datePickerValue.value = format(datePickerDate.value, 'dd.MM.yyyy');

  emits('set-new-date', parse(datePickerValue.value, 'dd.MM.yyyy', new Date()));
  isOpenedCalendar.value = false;
};

const handleSetMonth = (month: number) => {
  const newDate = datePickerDate.value || new Date();
  datePickerDate.value = setMonth(newDate, month);

  if (activePanel.value === 'months') {
    activePanel.value = 'calendar';
  }
};

const handleSetYear = (year: number) => {
  const newDate = datePickerDate.value || new Date();
  datePickerDate.value = setYear(newDate, year);
  yearsOffset.value = 0;

  if (activePanel.value === 'years') {
    activePanel.value = 'calendar';
  }
};

onClickOutside(datePicker, closeCalendar);
</script>

<template>
  <div
    id="date-picker"
    class="date-picker"
    @keyup.tab="openCalender"
    @keydown.esc="closeCalendar"
    tabindex="0"
    ref="date-picker"
  >
    <div class="date-picker--container" @click="openCalender">
      <div class="date-picker--inputs">
        <input type="hidden" name="date" :value="datePickerDate" />
      </div>
      <div class="date-picker--value">
        <span v-if="datePickerValue" class="value">{{ datePickerValue }}</span>
        <span v-else class="placeholder">{{ t('datePlaceholder') }}</span>
      </div>
      <div class="date-picker--icon">
        <calendar-icon />
      </div>
    </div>
    <div>
      <v-popover element-id="date-picker" :is-open="isOpenedCalendar" :distance="5">
        <template #header>
          <panel-header
            :active-panel="activePanel"
            :date="datePickerDate || new Date()"
            :offset="yearsOffset"
            @change-active-panel="changeActivePanel"
            @set-month="handleSetMonth"
            @set-year="handleSetYear"
            @set-years-offset="setYearsOffset"
          />
        </template>

        <panel-calendar
          v-if="activePanel === 'calendar'"
          :date="datePickerDate || new Date()"
          :date-value="datePickerValue"
          @set-day="handleSetDay"
        />
        <panel-month v-if="activePanel === 'months'" @set-month="handleSetMonth" />
        <panel-years
          v-if="activePanel === 'years'"
          :date="datePickerDate || new Date()"
          :offset="yearsOffset"
          @set-year="handleSetYear"
        />
      </v-popover>
    </div>
  </div>
</template>

<style lang="css" scoped>
.date-picker {
  position: relative;
  min-width: 200px;
  border: 1px solid var(--dp-indigo);
  border-radius: 10px;
  transition: 0.3s;
  user-select: none;
}

.date-picker--container {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
}

.date-picker--value {
  flex-grow: 1;
}

.date-picker--value .placeholder {
  color: var(--dp-text-placeholder);
}

.date-picker--icon {
  display: flex;
  place-items: center;
  width: fit-content;
  height: 100%;
  padding: 0 5px;
  color: var(--dp-black-soft);
  transition: color 0.3s;
}

.date-picker:hover {
  border-color: var(--dp-indigo-light);
}

.date-picker:hover .date-picker--icon {
  color: var(--dp-indigo-light);
}
</style>
