import { defineStore } from "pinia";
import type { GroupProps, KnockoutProps, TeamProps } from "./types";

export const useTeamStore = defineStore("team", {
  state: () =>
    ({
      selectedThirdTeams: [],
      groups: [
        {
          id: 0,
          availableTeams: [
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/GER.png",
              alt: "GER",
              fullName: "Germania",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/SCO.png",
              alt: "SCO",
              fullName: "Scotland",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/HUN.png",
              alt: "HUN",
              fullName: "Hungary",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/SUI.png",
              alt: "SUI",
              fullName: "Switzerland",
              selected: false,
            },
          ],
          list: [undefined, undefined, undefined, undefined],
        },
        {
          id: 1,
          availableTeams: [
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/ESP.png",
              alt: "ESP",
              fullName: "Spain",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/CRO.png",
              alt: "CRO",
              fullName: "Croatia",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/ITA.png",
              alt: "ITA",
              fullName: "Italy",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/ALB.png",
              alt: "ALB",
              fullName: "Albania",
              selected: false,
            },
          ],
          list: [undefined, undefined, undefined, undefined],
        },
        {
          id: 2,
          availableTeams: [
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/SVN.png",
              alt: "SVN",
              fullName: "Slovenia",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/DEN.png",
              alt: "DEN",
              fullName: "Denmark",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/SRB.png",
              alt: "SRB",
              fullName: "Serbia",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/ENG.png",
              alt: "ENG",
              fullName: "England",
              selected: false,
            },
          ],
          list: [undefined, undefined, undefined, undefined],
        },
        {
          id: 3,
          availableTeams: [
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/NED.png",
              alt: "NED",
              fullName: "Netherlands",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/FRA.png",
              alt: "FRA",
              fullName: "France",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/POL.png",
              alt: "POL",
              fullName: "Poland",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/AUT.png",
              alt: "AUT",
              fullName: "Austria",
              selected: false,
            },
          ],
          list: [undefined, undefined, undefined, undefined],
        },
        {
          id: 4,
          availableTeams: [
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/ROU.png",
              alt: "ROU",
              fullName: "Romania",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/SVK.png",
              alt: "SVK",
              fullName: "Slovakia",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/UKR.png",
              alt: "UKR",
              fullName: "Ukraine",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/BEL.png",
              alt: "BEL",
              fullName: "Belgium",
              selected: false,
            },
          ],
          list: [undefined, undefined, undefined, undefined],
        },
        {
          id: 5,
          availableTeams: [
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/TUR.png",
              alt: "TUR",
              fullName: "Türkiye",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/POR.png",
              alt: "POR",
              fullName: "Portugal",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/GEO.png",
              alt: "GEO",
              fullName: "Georgia",
              selected: false,
            },
            {
              flagSrc: "https://img.uefa.com/imgml/flags/50x50/CZE.png",
              alt: "CZE",
              fullName: "Czech Republic",
              selected: false,
            },
          ],
          list: [undefined, undefined, undefined, undefined],
        },
      ],
      last16: [],
      last8: [],
      last4: [],
      last1: [],
    } as {
      groups: GroupProps[];
      selectedThirdTeams: TeamProps[];
      last16: KnockoutProps[][];
      last8: KnockoutProps[][];
      last4: KnockoutProps[][];
      last1: KnockoutProps[][];
    }),
  getters: {
    thirdTeams: (state) => state.groups.map((team) => team.list[2]),
  },
  actions: {
    handleKnockoutStage() {
      const winnerTeams = this.groups
        .map((x) => {
          return [x.list[0], x.list[1]];
        })
        .flat();
      const shuffle = [...winnerTeams, ...this.selectedThirdTeams]
        .map((x) => {
          return {
            ...x,
            sortNumber: Math.random(),
          };
        })
        .sort((a, b) => (a.sortNumber > b.sortNumber ? 1 : -1));

      let counter = 0;
      let targetIndex = 0;
      let sortIndex = 0;

      for (let i = 0; i < shuffle.length; i++) {
        if (!shuffle[counter]) {
          break;
        }
        this.last16.push([
          {
            team: shuffle[counter] as TeamProps,
            targetIndex,
            sortIndex,
          },
          {
            team: shuffle[counter + 1] as TeamProps,
            targetIndex,
            sortIndex,
          },
        ]);
        counter += 2;
        if (i % 2 === 1) {
          targetIndex += 1;
        }
        sortIndex += 1;
        if (sortIndex > 1) {
          sortIndex = 0;
        }
      }
      this.last8 = this.handleEmptyKnockouts(8);
      this.last4 = this.handleEmptyKnockouts(4);
      this.last1 = this.handleEmptyKnockouts(1);
    },
    handleEmptyKnockouts(remainTeam: number) {
      const divide = remainTeam / 2;
      const round: KnockoutProps[][] = [];
      let targetIndex = 0;
      let sortIndex = 0;
      for (let i = 0; i < divide; i++) {
        round.push([
          { team: undefined, targetIndex, sortIndex },
          { team: undefined, targetIndex, sortIndex },
        ]);
        if (i % 2 === 1) {
          targetIndex += 1;
        }
        sortIndex += 1;
        if (sortIndex > 1) {
          sortIndex = 0;
        }
      }

      return round;
    },
    removeFromSelectedThirdTeams(team: TeamProps) {
      return (this.selectedThirdTeams = this.selectedThirdTeams.filter(
        (x) => x.alt !== team.alt
      ));
    },
    pushToSelectedThridTeams(team?: TeamProps) {
      if (!team) {
        return;
      }

      const isAdded = this.selectedThirdTeams.find((x) => x.alt == team.alt);

      if (isAdded) {
        return this.removeFromSelectedThirdTeams(team);
      }

      if (this.selectedThirdTeams.length > 3) {
        return;
      }

      this.selectedThirdTeams.push(team);
    },
  },
});
