<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';

import VContainer from '../ui/container/VContainer.vue';
import VButton from '../ui/button/VButton.vue';

const { locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
});

const changeLocale = () => {
  locale.value = locale.value === 'en' ? 'ru' : 'en';
};
</script>

<template>
  <header class="header">
    <v-container>
      <img
        alt="Vue logo"
        class="header-logo"
        src="../../assets/logo.svg"
        width="125"
        height="125"
      />

      <v-button class="lang-btn" @click="changeLocale" color="light" outlined>
        {{ locale }}
      </v-button>
    </v-container>
  </header>

  <main>
    <slot />
  </main>

  <footer class="footer">
    <v-container>
      <div>© Julia Perova</div>
    </v-container>
  </footer>
</template>

<style lang="css" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  background-color: var(--dp-indigo);
  color: var(--dp-white-soft);
}

.header-logo {
  width: 50px;
  height: 50px;
}

main {
  flex-grow: 1;
  padding: 40px 0 60px;
}

.lang-btn {
  width: 50px;
  min-width: unset;
  padding: 15px;
  margin-left: auto;
  text-transform: capitalize;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background-color: var(--dp-indigo-light);
  color: var(--dp-white-soft);
}
</style>
