<script setup lang="ts">
import { useTeamStore } from "~/store/index";
import type { GroupProps, TeamProps } from "./store/types";
const teamStore = useTeamStore();

const handleList = (group: GroupProps, selectedTeam: TeamProps) => {
  const isSelected = group.list.find((x) => x?.alt === selectedTeam.alt);
  if (isSelected) {
    return;
  }

  selectedTeam.selected = true;
  const index = group.list.findIndex((x) => x === undefined);
  const addedTeamsCount = group.list.filter((x) => x !== undefined).length;
  group.list[index] = { ...selectedTeam, order: addedTeamsCount + 1 };
};

const handleClearList = (group: GroupProps) => {
  group.availableTeams.forEach((team) => {
    team.selected = false;
    teamStore.removeFromSelectedThirdTeams(team);
  });
  group.list = [undefined, undefined, undefined, undefined];
};

const readyForChooseTeam = computed(() => {
  return teamStore.thirdTeams.every((team) => team !== undefined);
});
</script>

<template>
  <div v-if="!teamStore.last16.length" class="group-wrapper">
    <div class="group-container">
      <GroupCard
        v-for="group in teamStore.groups"
        :key="group.id"
        :group="group"
        @on-team-click="handleList(group, $event)"
        @on-clear-list="handleClearList(group)"
      />
    </div>
    <ChooseTeam v-if="readyForChooseTeam" />
  </div>
  <Bracket v-else />
</template>

<style>
:root {
  --color-border: #dedede;
  --color-primary: indigo;
}

.active {
  background-color: indigo;
  color: white;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  list-style: none;
}

.group-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: min(95%, 1200px);
  margin-inline: auto;
  padding-block: 1rem;
  flex-direction: column;
  gap: 1rem;
}

.group-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 1000px) {
  .group-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 1000px) {
  .group-container {
    grid-template-columns: 1fr;
  }
}
</style>
