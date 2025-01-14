// mirageServer.js
import { createServer } from 'miragejs';

// Helper functions for data persistence
const Storage = {
  saveMatch: (matchData) => {
    localStorage.setItem('match_data', JSON.stringify(matchData));
  },
  
  getMatch: () => {
    return JSON.parse(localStorage.getItem('match_data') || 'null');
  },
  
  clearMatch: () => {
    localStorage.removeItem('match_data');
  }
};

// Pre-configured teams data
const TEAMS = [
  {
    id: "IND",
    name: "India",
    players: [
      { id: "IND1", name: "PlayerIND A", role: "Batsman" },
      { id: "IND2", name: "PlayerIND B", role: "Batsman" },
      { id: "IND3", name: "PlayerIND C", role: "Batsman" },
      { id: "IND4", name: "PlayerIND D", role: "Batsman" },
      { id: "IND5", name: "PlayerIND E", role: "Batsman" },
      { id: "IND6", name: "PlayerIND F", role: "Bowler" },
      { id: "IND7", name: "PlayerIND G", role: "Bowler" },
      { id: "IND8", name: "PlayerIND H", role: "Bowler" },
      { id: "IND9", name: "PlayerIND I", role: "Bowler" },
      { id: "IND10", name: "PlayerIND J", role: "AllRounder" },
      { id: "IND11", name: "PlayerIND K", role: "AllRounder" },
    ]
  },
  {
    id: "PAK",
    name: "Pakistan",
    players: [
      { id: "PAK1", name: "PlayerPAK A", role: "Batsman" },
      { id: "PAK2", name: "PlayerPAK B", role: "Batsman" },
      { id: "PAK3", name: "PlayerPAK C", role: "Batsman" },
      { id: "PAK4", name: "PlayerPAK D", role: "Batsman" },
      { id: "PAK5", name: "PlayerPAK E", role: "Batsman" },
      { id: "PAK6", name: "PlayerPAK F", role: "Bowler" },
      { id: "PAK7", name: "PlayerPAK G", role: "Bowler" },
      { id: "PAK8", name: "PlayerPAK H", role: "Bowler" },
      { id: "PAK9", name: "PlayerPAK I", role: "Bowler" },
      { id: "PAK10", name: "PlayerPAK  J", role: "AllRounder" },
      { id: "PAK11", name: "PlayerPAK  K", role: "AllRounder" },
    ]
  },
  {
    id: "AUS",
    name: "Australia",
    players: [
      { id: "AUS1", name: "PlayerAUS A", role: "Batsman" },
      { id: "AUS2", name: "PlayerAUS B", role: "Batsman" },
      { id: "AUS3", name: "PlayerAUS C", role: "Batsman" },
      { id: "AUS4", name: "PlayerAUS D", role: "Batsman" },
      { id: "AUS5", name: "PlayerAUS E", role: "Batsman" },
      { id: "AUS6", name: "PlayerAUS F", role: "Bowler" },
      { id: "AUS7", name: "PlayerAUS G", role: "Bowler" },
      { id: "AUS8", name: "PlayerAUS H", role: "Bowler" },
      { id: "AUS9", name: "PlayerAUS I", role: "Bowler" },
      { id: "AUS10", name: "PlayerAUS J", role: "AllRounder" },
      { id: "AUS11", name: "PlayerAUS K", role: "AllRounder" },
    ]
  },
  {
    id: "ENG",
    name: "England",
    players: [
      { id: "ENG1", name: "PlayerENG A", role: "Batsman" },
      { id: "ENG2", name: "PlayerENG B", role: "Batsman" },
      { id: "ENG3", name: "PlayerENG C", role: "Batsman" },
      { id: "ENG4", name: "PlayerENG D", role: "Batsman" },
      { id: "ENG5", name: "PlayerENG E", role: "Batsman" },
      { id: "ENG6", name: "PlayerENG F", role: "Bowler" },
      { id: "ENG7", name: "PlayerENG G", role: "Bowler" },
      { id: "ENG8", name: "PlayerENG H", role: "Bowler" },
      { id: "ENG9", name: "PlayerENG I", role: "Bowler" },
      { id: "ENG10", name: "PlayerENG J", role: "AllRounder" },
      { id: "ENG11", name: "PlayerENG K", role: "AllRounder" },
    ]
  },
];

export function makeServer() {
  return createServer({
    seeds(server) {
      // Load teams into server.db
      server.db.loadData({
        teams: TEAMS
      });
    },

    routes() {
      this.namespace = 'api';

      // Get all available teams
      this.get('/teams', (schema) => {
        return schema.db.teams;
      });

      // Initialize match with selected teams and toss details
      this.post('/matches', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        // Expected payload:
        // {
        //   team1Id: string,
        //   team2Id: string,
        //   tossWinner: string, // team id
        //   tossDecision: 'bat' | 'bowl'
        // }

        // TODO: Validate team selection

        const match = {
          id: `match_${Date.now()}`,
          // TODO: Set up initial match state based on toss decision
          lastUpdate: Date.now()
        };

        Storage.saveMatch(match);
        return match;
      });

      // Get current match state
      this.get('/matches/:id', () => {
        return Storage.getMatch();
      });

      // Key implementation: Update score and handle live updates
      this.put('/matches/:id/score', (schema, request) => {
        const currentMatch = Storage.getMatch();
        const update = JSON.parse(request.requestBody);
        
        // Example scoring update payload:
        // {
        //   runs: number,
        //   isExtra: boolean,
        //   isWicket: boolean,
        //   // Add any other scoring details
        // }

        if (!currentMatch) {
          return new Response(400, {}, { error: 'No active match' });
        }

        // Update match state
        const newState = {
          ...currentMatch,
          // TODO: Update score, wickets, overs based on the scoring input
          lastUpdate: Date.now()
        };

        Storage.saveMatch(newState);
        return newState;
      });

      // Key implementation: Polling endpoint with optimization
      this.get('/matches/:id/live', (schema, request) => {
        const currentMatch = Storage.getMatch();
        const lastUpdate = parseInt(request.queryParams.lastUpdate || '0');

        // Return 304 if no updates since last poll
        if (currentMatch.lastUpdate <= lastUpdate) {
          return new Response(304, {}, null);
        }

        return currentMatch;
      });
    }
  });
}