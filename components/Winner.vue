<script setup lang="ts">
import type { TeamProps } from "~/store/types";

defineProps<{ winner?: TeamProps }>();
</script>

<template>
  <div class="winner">
    <img
      v-if="winner"
      class="flag"
      :src="winner.flagSrc"
      :alt="winner.fullName"
    />
    <img
      src="https://gaming.uefa.com/en/uclbracket/static/bracket/assets/eurotournament/images/winner_cup.png"
      alt="Winner"
    />
  </div>
</template>

<style scoped>
.winner {
  position: relative;
}

.flag {
  position: absolute;
  top: 43px;
  left: 25px;
}
</style>
