export interface TeamProps {
  flagSrc: string;
  alt: string;
  fullName: string;
  order?: number;
  selected: boolean;
}

export interface GroupProps {
  id: number;
  availableTeams: TeamProps[];
  list: (TeamProps | undefined)[];
}

export interface KnockoutProps {
  team: TeamProps | undefined;
  targetIndex: number;
  sortIndex: number;
  selectedTeamAlt?: string;
}
