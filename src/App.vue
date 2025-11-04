<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AppLayout from './components/app-layout/AppLayout.vue';
import DatePicker from './components/date-picker/DatePicker.vue';
import VContainer from './components/ui/container/VContainer.vue';
import VButton from './components/ui/button/VButton.vue';

import { useDateStore } from './stores/date.store';

const { t } = useI18n();
const dateStore = useDateStore();

const newDate = ref<Date | undefined>(dateStore.date ? new Date(dateStore.date) : undefined);
const savedStatus = ref<'saved' | 'error' | 'notSaved' | 'init'>('init');

const setNewDate = (d: Date) => {
  savedStatus.value = 'notSaved';
  newDate.value = d;
};

const handleSubmit = async () => {
  if (newDate.value) {
    const { status } = await dateStore.saveDate(newDate.value);
    savedStatus.value = status === 'success' ? 'saved' : 'error';
  }
};

const submitBtnDisabled = computed(() => {
  return !newDate.value || savedStatus.value === 'saved';
});
</script>

<template>
  <app-layout>
    <section>
      <v-container>
        <div class="content">
          <h1 class="title">{{ t('mainTitle') }}</h1>
          <form class="form" @submit.prevent="handleSubmit">
            <legend>{{ t('formTitle') }}</legend>
            <div class="form-body">
              <fieldset>
                <date-picker :date="newDate" @set-new-date="setNewDate" />
                <span v-if="savedStatus === 'saved'" class="message message_success">
                  {{ t('dateFormMessages.saveSuccess') }}
                </span>
                <span v-else-if="savedStatus === 'error'" class="message message_error">
                  {{ t('dateFormMessages.saveError') }}
                </span>
              </fieldset>
              <v-button type="submit" :disabled="submitBtnDisabled">
                {{ t('dateBtnSaveLabel') }}
              </v-button>
            </div>
          </form>
        </div>
      </v-container>
    </section>
  </app-layout>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.title {
  margin-bottom: 30px;
  font-weight: bold;
}

.form {
  margin: auto;
  margin-top: 100px;
  padding: 30px;
  box-shadow: 0 0 15px -5px var(--dp-indigo-light);
  border-radius: 20px;
}

.form legend {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.form fieldset {
  position: relative;
  min-width: 250px;
  padding-bottom: 10px;
  border: none;
}

.message {
  position: absolute;
  left: 10px;
  bottom: -5px;
  font-size: 12px;
  color: var(--dp-text-placeholder);
}

.message_success {
  color: var(--dp-success);
}

.message_error {
  color: var(--dp-error);
}

.form-body {
  display: flex;
  gap: 20px;
  margin: auto;
}
</style>
