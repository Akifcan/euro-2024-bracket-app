<script setup lang="ts">
import { useTeamStore } from "~/store/index";
const teamStore = useTeamStore();
</script>

<template>
  <section class="choose-team">
    <div class="chose-team--header">
      <h3>Best 3th teams</h3>
      <p>Choose best 3th teams</p>
    </div>
    <ul class="selection">
      <ChooseTeamCard
        v-for="team in teamStore.thirdTeams"
        :key="team!.alt"
        :team="team!"
      />
    </ul>
    <button
      v-if="teamStore.selectedThirdTeams.length === 4"
      class="knockout-button"
      @click="teamStore.handleKnockoutStage"
    >
      Continue to Knockout Stage
    </button>
  </section>
</template>

<style scoped>
.choose-team {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}
.chose-team--header {
  padding: 1rem;
  background-color: var(--color-primary);
  color: white;
}
.selection {
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.knockout-button {
  background-color: var(--color-primary);
  color: white;
  width: 100%;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
}
</style>
