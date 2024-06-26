<script setup lang="ts">
import { useTeamStore } from "~/store/index";
import type { GroupProps, TeamProps } from "~/store/types";

const teamStore = useTeamStore();
const props = defineProps<{ group: GroupProps }>();
const groupRef = ref<HTMLElement>();
defineEmits<{
  (e: "on-team-click", team: TeamProps): void;
  (e: "on-clear-list"): void;
}>();

const isAllTeamsSelected = computed(() => {
  return props.group.list.every((team) => team !== undefined);
});

const handleDragStart = (e: DragEvent) => {
  const target = e.target as HTMLElement;
  target.classList.add("dragging");
  e.dataTransfer?.setData("team-id", target.id);
};

const handleDrop = (e: DragEvent) => {
  const target = e.target as HTMLElement;
  groupRef.value
    ?.querySelector(".group-list--item-team.dragging")
    ?.classList.remove("dragging");
  const droppedTeam = props.group.list.find((x) => x?.alt === target.id);
  const draggedTeam = props.group.list.find(
    (x) => x?.alt === e.dataTransfer?.getData("team-id")
  );

  if (!droppedTeam || !draggedTeam) {
    return;
  }

  const droppedTeamOrder = droppedTeam.order;
  const draggedTeamOrder = draggedTeam.order;

  droppedTeam.order = draggedTeamOrder;
  draggedTeam.order = droppedTeamOrder;

  teamStore.removeFromSelectedThirdTeams(draggedTeam);
  teamStore.removeFromSelectedThirdTeams(droppedTeam);
};

const groupList = computed(() => {
  return isAllTeamsSelected
    ? props.group.list.sort((a, b) => (a!.order! > b!.order! ? 1 : -1))
    : props.group.list;
});
</script>

<template>
  <div ref="groupRef" class="group">
    <ul class="group--header">
      <li
        v-for="team in group.availableTeams"
        :key="team.alt"
        class="group--header-list"
        :class="{ selected: team.selected }"
        aria-label="Bu ülkeyi seçmek için tıklayın"
        @click="$emit('on-team-click', team)"
      >
        <img :src="team.flagSrc" :alt="team.alt" :title="team.alt" />
      </li>
    </ul>
    <ul class="group--list">
      <li
        v-for="(team, index) in groupList"
        :key="team?.alt ?? index"
        class="group-list--item"
      >
        <div
          v-if="team"
          class="group-list--item-team"
          :id="team.alt"
          :class="{ drag: isAllTeamsSelected }"
          :draggable="isAllTeamsSelected"
          @dragstart="handleDragStart"
          @drop.prevent="handleDrop"
          @dragover.prevent
        >
          <img :src="team.flagSrc" :alt="team.alt" :title="team.fullName" />
          <p>{{ team.order }} - {{ team.fullName }}</p>
          <IconsDrag v-if="isAllTeamsSelected" class="icon" />
        </div>
        <div v-else class="group-list--item-team">
          <div class="avatar"></div>
        </div>
      </li>
    </ul>
    <button
      v-if="isAllTeamsSelected"
      @click="$emit('on-clear-list')"
      class="clear-list-button"
    >
      Clear List
    </button>
  </div>
</template>

<style scoped>
.group {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  align-self: flex-start;
}

.group--header {
  background-color: var(--color-primary);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
}

.group--list {
  display: flex;
  flex-direction: column;
}

.group--header-list {
  cursor: pointer;
  transition: filter 500ms linear;
}

.group--header-list.selected {
  filter: grayscale(0.7);
}

.group-list--item-team {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.group-list--item-team > * {
  pointer-events: none;
}

.group-list--item:not(:last-child) {
  border-bottom: 1px solid var(--color-border);
}

.icon {
  margin-inline-start: auto;
}

.avatar {
  background-color: var(--color-border);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.clear-list-button {
  width: 100%;
  background-color: var(--color-primary);
  color: white;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
}

.group-list--item-team.drag {
  cursor: grab;
}

.group-list--item-team.dragging {
  background-color: var(--color-primary);
  color: white;
}
.group-list--item-team.dragging .icon {
  display: none;
}
</style>
