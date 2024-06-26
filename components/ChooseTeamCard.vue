<script setup lang="ts">
import type { TeamProps } from "~/store/types";
import { useTeamStore } from "~/store/index";
const teamStore = useTeamStore();

const props = defineProps<{ team: TeamProps }>();

const isSelected = computed(() => {
  return teamStore.selectedThirdTeams.find((x) => x.alt === props.team?.alt);
});

const isNotSelected = computed(() => {
  return teamStore.selectedThirdTeams.length === 4 && !isSelected.value;
});
</script>

<template>
  <li
    class="selection--item"
    aria-label="Click for choose this team"
    @click="teamStore.pushToSelectedThridTeams(team)"
  >
    <div
      class="selection--image"
      :class="{
        'not-selected': isNotSelected,
      }"
    >
      <img
        style="width: 3.5rem"
        :src="team?.flagSrc"
        :title="team?.alt"
        :alt="team?.alt"
      />
      <IconsTick v-if="isSelected" class="icon" />
    </div>
    <p>{{ team?.fullName }}</p>
  </li>
</template>

<style scoped>
.selection--item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.selection--image {
  transition: filter 500ms linear;
  position: relative;
}
.icon {
  position: absolute;
  bottom: 0;
  right: 0;
}
.selection--image.not-selected {
  filter: grayscale(0.7);
}
</style>
