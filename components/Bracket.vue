<script setup lang="ts">
import { useTeamStore } from "~/store/index";
import type { KnockoutProps, TeamProps } from "~/store/types";
const teamStore = useTeamStore();
const winnerTeam = ref<TeamProps>();

const handleActiveClass = (teams: KnockoutProps[], team: KnockoutProps) => {
  teams.forEach((x) => (x.selectedTeamAlt = team.team?.alt));
};

const handleRemoveTeam = (team?: TeamProps) => {
  if (!team) {
    return;
  }
  for (let i = 0; i < teamStore.last8.length; i++) {
    for (let y = 0; y < teamStore.last8[i].length; y++) {
      if (teamStore.last8[i][y].team?.alt === team.alt) {
        teamStore.last8[i][y].team = undefined;
      }
    }
  }
  for (let i = 0; i < teamStore.last4.length; i++) {
    for (let y = 0; y < teamStore.last4[i].length; y++) {
      if (teamStore.last4[i][y].team?.alt === team.alt) {
        teamStore.last4[i][y].team = undefined;
      }
    }
  }
  for (let i = 0; i < teamStore.last1.length; i++) {
    for (let y = 0; y < teamStore.last1[i].length; y++) {
      if (teamStore.last1[i][y].team?.alt === team.alt) {
        teamStore.last1[i][y].team = undefined;
      }
    }
  }
};

const handleLast8 = (teams: KnockoutProps[], team: KnockoutProps) => {
  handleRemoveTeam(teamStore.last8[team.targetIndex][team.sortIndex].team);
  handleActiveClass(teams, team);
  teamStore.last8[team.targetIndex][team.sortIndex].team = team.team;
};

const handleLast4 = (teams: KnockoutProps[], team: KnockoutProps) => {
  const canChoose = teams.every((team) => team.team !== undefined);
  if (!canChoose) {
    return;
  }
  handleRemoveTeam(teamStore.last4[team.targetIndex][team.sortIndex].team);
  handleActiveClass(teams, team);

  teamStore.last4[team.targetIndex][team.sortIndex].team = team.team;
};

const handleLast2 = (teams: KnockoutProps[], team: KnockoutProps) => {
  const canChoose = teams.every((team) => team.team !== undefined);
  if (!canChoose) {
    return;
  }
  handleRemoveTeam(teamStore.last1[team.targetIndex][team.sortIndex].team);
  handleActiveClass(teams, team);

  teamStore.last1[team.targetIndex][team.sortIndex].team = team.team;
};

const handleWinner = (teams: KnockoutProps[], team: KnockoutProps) => {
  const canChoose = teams.every((team) => team.team !== undefined);
  if (!canChoose) {
    return;
  }
  handleActiveClass(teams, team);
  winnerTeam.value = team.team;
};
</script>

<template>
  <div class="bracket-wrapper">
    <div class="bracket-item">
      <ul v-for="(teams, index) in teamStore.last16" :key="index">
        <li
          v-for="team in teams"
          :key="team.team?.alt"
          @click="handleLast8(teams, team)"
          :class="{ active: team.selectedTeamAlt === team.team?.alt }"
        >
          {{ team.team?.fullName }}
        </li>
      </ul>
    </div>
    <div class="bracket-item">
      <ul v-for="(teams, index) in teamStore.last8" :key="index">
        <li
          v-for="(team, index) in teams"
          :key="team.team?.alt && index"
          @click="handleLast4(teams, team)"
          :class="{
            active:
              team.selectedTeamAlt && team.selectedTeamAlt === team.team?.alt,
          }"
        >
          {{ team.team?.fullName ?? "Empty" }}
        </li>
      </ul>
    </div>
    <div class="bracket-item">
      <ul v-for="(teams, index) in teamStore.last4" :key="index">
        <li
          v-for="(team, index) in teams"
          :key="team.team?.alt && index"
          @click="handleLast2(teams, team)"
          :class="{
            active:
              team.selectedTeamAlt && team.selectedTeamAlt === team.team?.alt,
          }"
        >
          {{ team.team?.fullName ?? "Empty" }}
        </li>
      </ul>
    </div>
    <div class="bracket-item final">
      <Winner :winner="winnerTeam" />
      <ul v-for="(teams, index) in teamStore.last1" :key="index">
        <li
          v-for="(team, index) in teams"
          :key="team.team?.alt && index"
          :class="{
            active:
              team.selectedTeamAlt && team.selectedTeamAlt === team.team?.alt,
          }"
          @click="handleWinner(teams, team)"
        >
          {{ team.team?.fullName ?? "Empty" }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.bracket-wrapper {
  margin-inline: auto;
  width: min(90%, 1200px);
  display: flex;
  align-items: center;
  min-height: 100vh;
  justify-content: space-evenly;
  gap: 1rem;
}

.bracket-item {
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.bracket-item ul {
  line-height: 1.5;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  min-width: 200px;
}

.bracket-item.final {
  justify-content: center;
}

.bracket-item ul li {
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.bracket-item ul li.active {
  background-color: var(--color-primary);
  color: white;
}

@media (max-width: 1000px) {
  .bracket-wrapper {
    justify-content: flex-start;
  }
}
</style>
