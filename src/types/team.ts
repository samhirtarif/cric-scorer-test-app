export type Team = {
  id:      string;
  name:    string;
  players: Player[];
}

export type Player = {
  id:   string;
  name: string;
  role: string;
}