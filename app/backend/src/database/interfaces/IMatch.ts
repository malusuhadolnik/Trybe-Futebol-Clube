import ITeam from "./ITeam";

export default interface IMatch {
 id: number,
 homeTeamId: number,
 homeTeamGoals: number,
 awayTeamId: number,
 awayTeamGoals: number,
 inProgress: boolean,
 homeTeam: Omit<ITeam, 'id'>,
 awayTeam: Omit<ITeam, 'id'>,
}