Vue.component('cstats', {
	template: '<table class="w-100 table-striped table-hover text-center"><thead><tr><td>TEAM</td><td>PLAYED</td><td>WINS</td><td>LOSSES</td><td>TIES</td><td>POINTS</td></tr></thead><tbody><tr v-for="compTeam in compTeams"><td>{{ capitalize(compTeam.name) }}</td><td>{{ sumPlayed(compTeam) }}</td><td>{{ compTeam.wins.length }}</td><td>{{ compTeam.losses.length }}</td><td>{{ compTeam.ties.length }}</td><td>{{sumPoints(compTeam) }}</td></tr></tbody></table>',
	props: ['teams_props'],
	data: function () {
		return {
			compTeams: this.teams_props
		}
	},
	methods: {
		capitalize: function (arg) {
			//			console.log(this.compTeams.wins.length);
			return arg.charAt(0).toUpperCase() + arg.slice(1);
		},
		sumPoints: function (arg) {
			return (arg.wins.length * 3) + (arg.ties.length * 1);
		},
		sumPlayed: function (arg) {
			return (arg.wins.length + arg.losses.length + arg.ties.length);
		}
	},
});
	
Vue.component('pstats', {
	template: '<table class="w-100 table-striped table-hover text-center"><thead><tr><td>PLAYER</td><td>GOALS</td><td>YELLOW CARDS</td><td>RED CARDS</td><td>TEAM</td></tr></thead><tbody><tr v-for="compPlayer in compPlayers"><td>{{ compPlayer.first_name+ " " +compPlayer.second_name }}</td><td>{{ compPlayer.goals }}</td><td>{{ compPlayer.yellow_cards }}</td><td>{{ compPlayer.red_cards }}</td><td>{{ compPlayer.team }}</td></tr></tbody></table>',
	props: ['players_props'],
	data: function(){
		return{
			compPlayers: this.players_props
		}
	}
})





var app = new Vue({
	el: "#app",
	data: {
		show: 'venues',
		statistics: 'clubs',		/*either 'players' or 'clubs'*/
		location: 'gre',
  players: [
    {
      "player_id": 0,
      "first_name": "Celina",
      "second_name": "Rowland",
      "team": "admirals",
      "yellow_cards": 1,
      "red_cards": 1,
      "goals": 11,
      "rank": false
    },
    {
      "player_id": 1,
      "first_name": "Earnestine",
      "second_name": "Patel",
      "team": "admirals",
      "yellow_cards": 1,
      "red_cards": 1,
      "goals": 8,
      "rank": false
    },
    {
      "player_id": 2,
      "first_name": "Jodi",
      "second_name": "Spence",
      "team": "admirals",
      "yellow_cards": 0,
      "red_cards": 0,
      "goals": 10,
      "rank": false
    },
    {
      "player_id": 3,
      "first_name": "Jeanette",
      "second_name": "Rodgers",
      "team": "admirals",
      "yellow_cards": 3,
      "red_cards": 2,
      "goals": 1,
      "rank": false
    },
    {
      "player_id": 4,
      "first_name": "Schmidt",
      "second_name": "Levy",
      "team": "admirals",
      "yellow_cards": 3,
      "red_cards": 2,
      "goals": 11,
      "rank": false
    },
    {
      "player_id": 5,
      "first_name": "Charlene",
      "second_name": "Heath",
      "team": "admirals",
      "yellow_cards": 2,
      "red_cards": 1,
      "goals": 3,
      "rank": false
    },
    {
      "player_id": 6,
      "first_name": "Robles",
      "second_name": "Schwartz",
      "team": "admirals",
      "yellow_cards": 3,
      "red_cards": 1,
      "goals": 5,
      "rank": false
    },
    {
      "player_id": 7,
      "first_name": "Daniels",
      "second_name": "Yang",
      "team": "admirals",
      "yellow_cards": 2,
      "red_cards": 1,
      "goals": 6,
      "rank": false
    },
    {
      "player_id": 8,
      "first_name": "Chavez",
      "second_name": "Rojas",
      "team": "admirals",
      "yellow_cards": 4,
      "red_cards": 1,
      "goals": 6,
      "rank": false
    },
    {
      "player_id": 9,
      "first_name": "Dee",
      "second_name": "Sanders",
      "team": "admirals",
      "yellow_cards": 2,
      "red_cards": 1,
      "goals": 1,
      "rank": false
    },
    {
      "player_id": 10,
      "first_name": "Callie",
      "second_name": "Pitts",
      "team": "chiefs",
      "yellow_cards": 4,
      "red_cards": 0,
      "goals": 1,
      "rank": false
    },
    {
      "player_id": 11,
      "first_name": "Hancock",
      "second_name": "Rollins",
      "team": "chiefs",
      "yellow_cards": 3,
      "red_cards": 1,
      "goals": 9,
      "rank": false
    },
    {
      "player_id": 12,
      "first_name": "Wanda",
      "second_name": "Contreras",
      "team": "chiefs",
      "yellow_cards": 3,
      "red_cards": 1,
      "goals": 11,
      "rank": false
    },
    {
      "player_id": 13,
      "first_name": "Sharpe",
      "second_name": "Anderson",
      "team": "chiefs",
      "yellow_cards": 2,
      "red_cards": 1,
      "goals": 8,
      "rank": false
    },
    {
      "player_id": 14,
      "first_name": "Bowers",
      "second_name": "Carr",
      "team": "chiefs",
      "yellow_cards": 3,
      "red_cards": 1,
      "goals": 12,
      "rank": false
    },
    {
      "player_id": 15,
      "first_name": "Olive",
      "second_name": "Floyd",
      "team": "chiefs",
      "yellow_cards": 3,
      "red_cards": 0,
      "goals": 1,
      "rank": false
    },
    {
      "player_id": 16,
      "first_name": "Macdonald",
      "second_name": "Henderson",
      "team": "chiefs",
      "yellow_cards": 4,
      "red_cards": 1,
      "goals": 12,
      "rank": false
    },
    {
      "player_id": 17,
      "first_name": "Morrison",
      "second_name": "Mayo",
      "team": "chiefs",
      "yellow_cards": 3,
      "red_cards": 2,
      "goals": 7,
      "rank": false
    },
    {
      "player_id": 18,
      "first_name": "Trevino",
      "second_name": "Hodge",
      "team": "chiefs",
      "yellow_cards": 2,
      "red_cards": 0,
      "goals": 1,
      "rank": false
    },
    {
      "player_id": 19,
      "first_name": "Eloise",
      "second_name": "Sellers",
      "team": "chiefs",
      "yellow_cards": 0,
      "red_cards": 0,
      "goals": 6,
      "rank": false
    },
    {
      "player_id": 20,
      "first_name": "Tran",
      "second_name": "Morgan",
      "team": "droids",
      "yellow_cards": 4,
      "red_cards": 1,
      "goals": 7,
      "rank": false
    },
    {
      "player_id": 21,
      "first_name": "Dorthy",
      "second_name": "Cain",
      "team": "droids",
      "yellow_cards": 4,
      "red_cards": 2,
      "goals": 4,
      "rank": false
    },
    {
      "player_id": 22,
      "first_name": "Francesca",
      "second_name": "Schmidt",
      "team": "droids",
      "yellow_cards": 2,
      "red_cards": 0,
      "goals": 4,
      "rank": false
    },
    {
      "player_id": 23,
      "first_name": "Kitty",
      "second_name": "Collins",
      "team": "droids",
      "yellow_cards": 0,
      "red_cards": 1,
      "goals": 4,
      "rank": false
    },
    {
      "player_id": 24,
      "first_name": "Christensen",
      "second_name": "Lindsay",
      "team": "droids",
      "yellow_cards": 1,
      "red_cards": 1,
      "goals": 6,
      "rank": false
    },
    {
      "player_id": 25,
      "first_name": "Ethel",
      "second_name": "Jennings",
      "team": "droids",
      "yellow_cards": 3,
      "red_cards": 0,
      "goals": 10,
      "rank": false
    },
    {
      "player_id": 26,
      "first_name": "Mckinney",
      "second_name": "Fernandez",
      "team": "droids",
      "yellow_cards": 0,
      "red_cards": 0,
      "goals": 10,
      "rank": false
    },
    {
      "player_id": 27,
      "first_name": "Norman",
      "second_name": "Bass",
      "team": "droids",
      "yellow_cards": 2,
      "red_cards": 2,
      "goals": 5,
      "rank": false
    },
    {
      "player_id": 28,
      "first_name": "Neva",
      "second_name": "Holder",
      "team": "droids",
      "yellow_cards": 2,
      "red_cards": 1,
      "goals": 5,
      "rank": false
    },
    {
      "player_id": 29,
      "first_name": "Lottie",
      "second_name": "Horton",
      "team": "droids",
      "yellow_cards": 0,
      "red_cards": 0,
      "goals": 6,
      "rank": false
    },
    {
      "player_id": 30,
      "first_name": "Michael",
      "second_name": "Branch",
      "team": "emperors",
      "yellow_cards": 0,
      "red_cards": 2,
      "goals": 8,
      "rank": false
    },
    {
      "player_id": 31,
      "first_name": "Church",
      "second_name": "Moody",
      "team": "emperors",
      "yellow_cards": 2,
      "red_cards": 0,
      "goals": 4,
      "rank": false
    },
    {
      "player_id": 32,
      "first_name": "Shepard",
      "second_name": "Morrow",
      "team": "emperors",
      "yellow_cards": 1,
      "red_cards": 1,
      "goals": 11,
      "rank": false
    },
    {
      "player_id": 33,
      "first_name": "Burns",
      "second_name": "Mcmillan",
      "team": "emperors",
      "yellow_cards": 2,
      "red_cards": 1,
      "goals": 10,
      "rank": false
    },
    {
      "player_id": 34,
      "first_name": "Lesley",
      "second_name": "English",
      "team": "emperors",
      "yellow_cards": 0,
      "red_cards": 0,
      "goals": 11,
      "rank": false
    },
    {
      "player_id": 35,
      "first_name": "Linda",
      "second_name": "Joyce",
      "team": "emperors",
      "yellow_cards": 4,
      "red_cards": 2,
      "goals": 1,
      "rank": false
    },
    {
      "player_id": 36,
      "first_name": "Juliana",
      "second_name": "Caldwell",
      "team": "emperors",
      "yellow_cards": 1,
      "red_cards": 1,
      "goals": 2,
      "rank": false
    },
    {
      "player_id": 37,
      "first_name": "Estella",
      "second_name": "Ashley",
      "team": "emperors",
      "yellow_cards": 4,
      "red_cards": 1,
      "goals": 5,
      "rank": false
    },
    {
      "player_id": 38,
      "first_name": "Hale",
      "second_name": "Gregory",
      "team": "emperors",
      "yellow_cards": 0,
      "red_cards": 1,
      "goals": 10,
      "rank": false
    },
    {
      "player_id": 39,
      "first_name": "Martina",
      "second_name": "Barrera",
      "team": "emperors",
      "yellow_cards": 0,
      "red_cards": 1,
      "goals": 8,
      "rank": false
    },
    {
      "player_id": 40,
      "first_name": "Roberson",
      "second_name": "Owen",
      "team": "raiders",
      "yellow_cards": 4,
      "red_cards": 2,
      "goals": 2,
      "rank": false
    },
    {
      "player_id": 41,
      "first_name": "Isabel",
      "second_name": "Long",
      "team": "raiders",
      "yellow_cards": 2,
      "red_cards": 1,
      "goals": 10,
      "rank": false
    },
    {
      "player_id": 42,
      "first_name": "Thompson",
      "second_name": "Daniels",
      "team": "raiders",
      "yellow_cards": 2,
      "red_cards": 2,
      "goals": 0,
      "rank": false
    },
    {
      "player_id": 43,
      "first_name": "Olson",
      "second_name": "Carver",
      "team": "raiders",
      "yellow_cards": 0,
      "red_cards": 2,
      "goals": 6,
      "rank": false
    },
    {
      "player_id": 44,
      "first_name": "Kelsey",
      "second_name": "Petersen",
      "team": "raiders",
      "yellow_cards": 0,
      "red_cards": 2,
      "goals": 6,
      "rank": false
    },
    {
      "player_id": 45,
      "first_name": "Justine",
      "second_name": "Anthony",
      "team": "raiders",
      "yellow_cards": 2,
      "red_cards": 2,
      "goals": 0,
      "rank": false
    },
    {
      "player_id": 46,
      "first_name": "Barrett",
      "second_name": "Mccarty",
      "team": "raiders",
      "yellow_cards": 4,
      "red_cards": 0,
      "goals": 2,
      "rank": false
    },
    {
      "player_id": 47,
      "first_name": "Staci",
      "second_name": "Griffith",
      "team": "raiders",
      "yellow_cards": 2,
      "red_cards": 0,
      "goals": 4,
      "rank": false
    },
    {
      "player_id": 48,
      "first_name": "Snyder",
      "second_name": "Avila",
      "team": "raiders",
      "yellow_cards": 0,
      "red_cards": 1,
      "goals": 9,
      "rank": false
    },
    {
      "player_id": 49,
      "first_name": "Sharron",
      "second_name": "Thornton",
      "team": "raiders",
      "yellow_cards": 3,
      "red_cards": 0,
      "goals": 6,
      "rank": false
    },
    {
      "player_id": 50,
      "first_name": "Cameron",
      "second_name": "Dixon",
      "team": "sandcrawlers",
      "yellow_cards": 3,
      "red_cards": 2,
      "goals": 11,
      "rank": false
    },
    {
      "player_id": 51,
      "first_name": "Maritza",
      "second_name": "Maldonado",
      "team": "sandcrawlers",
      "yellow_cards": 1,
      "red_cards": 1,
      "goals": 7,
      "rank": false
    },
    {
      "player_id": 52,
      "first_name": "Mays",
      "second_name": "Franklin",
      "team": "sandcrawlers",
      "yellow_cards": 0,
      "red_cards": 0,
      "goals": 12,
      "rank": false
    },
    {
      "player_id": 53,
      "first_name": "Fields",
      "second_name": "Moore",
      "team": "sandcrawlers",
      "yellow_cards": 1,
      "red_cards": 0,
      "goals": 5,
      "rank": false
    },
    {
      "player_id": 54,
      "first_name": "Howe",
      "second_name": "Haley",
      "team": "sandcrawlers",
      "yellow_cards": 2,
      "red_cards": 0,
      "goals": 2,
      "rank": false
    },
    {
      "player_id": 55,
      "first_name": "Matilda",
      "second_name": "Pickett",
      "team": "sandcrawlers",
      "yellow_cards": 0,
      "red_cards": 0,
      "goals": 5,
      "rank": false
    },
    {
      "player_id": 56,
      "first_name": "Russo",
      "second_name": "Sherman",
      "team": "sandcrawlers",
      "yellow_cards": 3,
      "red_cards": 2,
      "goals": 7,
      "rank": false
    },
    {
      "player_id": 57,
      "first_name": "Gilbert",
      "second_name": "Mcpherson",
      "team": "sandcrawlers",
      "yellow_cards": 0,
      "red_cards": 2,
      "goals": 8,
      "rank": false
    },
    {
      "player_id": 58,
      "first_name": "Henderson",
      "second_name": "Mcfarland",
      "team": "sandcrawlers",
      "yellow_cards": 1,
      "red_cards": 1,
      "goals": 9,
      "rank": false
    },
    {
      "player_id": 59,
      "first_name": "Fry",
      "second_name": "Valdez",
      "team": "sandcrawlers",
      "yellow_cards": 1,
      "red_cards": 2,
      "goals": 7,
      "rank": false
    },
    {
      "player_id": 60,
      "first_name": "Preston",
      "second_name": "Madden",
      "team": "wampas",
      "yellow_cards": 3,
      "red_cards": 1,
      "goals": 8,
      "rank": false
    },
    {
      "player_id": 61,
      "first_name": "Bishop",
      "second_name": "Patrick",
      "team": "wampas",
      "yellow_cards": 3,
      "red_cards": 2,
      "goals": 11,
      "rank": false
    },
    {
      "player_id": 62,
      "first_name": "Contreras",
      "second_name": "Landry",
      "team": "wampas",
      "yellow_cards": 0,
      "red_cards": 2,
      "goals": 6,
      "rank": false
    },
    {
      "player_id": 63,
      "first_name": "Larsen",
      "second_name": "Willis",
      "team": "wampas",
      "yellow_cards": 1,
      "red_cards": 0,
      "goals": 12,
      "rank": false
    },
    {
      "player_id": 64,
      "first_name": "Arline",
      "second_name": "Klein",
      "team": "wampas",
      "yellow_cards": 4,
      "red_cards": 1,
      "goals": 4,
      "rank": false
    },
    {
      "player_id": 65,
      "first_name": "Amy",
      "second_name": "Lewis",
      "team": "wampas",
      "yellow_cards": 2,
      "red_cards": 2,
      "goals": 10,
      "rank": false
    },
    {
      "player_id": 66,
      "first_name": "Viola",
      "second_name": "Hawkins",
      "team": "wampas",
      "yellow_cards": 0,
      "red_cards": 2,
      "goals": 0,
      "rank": false
    },
    {
      "player_id": 67,
      "first_name": "Pittman",
      "second_name": "Shelton",
      "team": "wampas",
      "yellow_cards": 0,
      "red_cards": 1,
      "goals": 7,
      "rank": false
    },
    {
      "player_id": 68,
      "first_name": "Bernadine",
      "second_name": "Marquez",
      "team": "wampas",
      "yellow_cards": 2,
      "red_cards": 0,
      "goals": 12,
      "rank": false
    },
    {
      "player_id": 69,
      "first_name": "Daphne",
      "second_name": "Dean",
      "team": "wampas",
      "yellow_cards": 3,
      "red_cards": 0,
      "goals": 9,
      "rank": false
    }
  ],
  teams: [
    {
      "name": "admirals",
      "photo": "/img/admirals.jpg",
      "logo": "/img/admirals_logo.jpg",
      "manager": "Snider Dickson",
      "wins": [
        {
          "date": "2018-01-21",
          "goals_in_favor": 6,
          "goals_against": 3
        },
        {
          "date": "2018-07-21",
          "goals_in_favor": 8,
          "goals_against": 2
        },
        {
          "date": "2018-10-24",
          "goals_in_favor": 6,
          "goals_against": 1
        },
        {
          "date": "2018-07-08",
          "goals_in_favor": 6,
          "goals_against": 1
        },
        {
          "date": "2018-03-04",
          "goals_in_favor": 9,
          "goals_against": 3
        },
        {
          "date": "2018-03-14",
          "goals_in_favor": 8,
          "goals_against": 3
        },
        {
          "date": "2018-08-07",
          "goals_in_favor": 9,
          "goals_against": 2
        }
      ],
      "losses": [
        {
          "date": "2018-11-14",
          "goals_in_favor": 2,
          "goals_against": 7
        },
        {
          "date": "2018-05-13",
          "goals_in_favor": 2,
          "goals_against": 7
        },
        {
          "date": "2018-07-15",
          "goals_in_favor": 1,
          "goals_against": 6
        },
        {
          "date": "2018-03-02",
          "goals_in_favor": 1,
          "goals_against": 6
        },
        {
          "date": "2018-11-05",
          "goals_in_favor": 3,
          "goals_against": 7
        },
        {
          "date": "2018-05-09",
          "goals_in_favor": 1,
          "goals_against": 7
        },
        {
          "date": "2018-03-01",
          "goals_in_favor": 3,
          "goals_against": 4
        }
      ],
      "ties": [
        {
          "date": "2018-05-27",
          "goals_in_favor": 2,
          "goals_against": 5
        },
        {
          "date": "2018-08-04",
          "goals_in_favor": 2,
          "goals_against": 3
        },
        {
          "date": "2018-07-19",
          "goals_in_favor": 1,
          "goals_against": 2
        }
      ]
    },
    {
      "name": "chiefs",
      "photo": "/img/chiefs.jpg",
      "logo": "/img/chiefs_logo.jpg",
      "manager": "Diana Mercado",
      "wins": [
        {
          "date": "2018-04-02",
          "goals_in_favor": 5,
          "goals_against": 1
        },
        {
          "date": "2018-04-01",
          "goals_in_favor": 7,
          "goals_against": 2
        },
        {
          "date": "2018-05-20",
          "goals_in_favor": 8,
          "goals_against": 3
        },
        {
          "date": "2018-10-10",
          "goals_in_favor": 6,
          "goals_against": 2
        },
        {
          "date": "2018-11-24",
          "goals_in_favor": 4,
          "goals_against": 1
        },
        {
          "date": "2018-05-28",
          "goals_in_favor": 8,
          "goals_against": 2
        },
        {
          "date": "2018-09-23",
          "goals_in_favor": 8,
          "goals_against": 2
        }
      ],
      "losses": [
        {
          "date": "2018-01-26",
          "goals_in_favor": 3,
          "goals_against": 7
        },
        {
          "date": "2018-03-07",
          "goals_in_favor": 1,
          "goals_against": 6
        },
        {
          "date": "2018-11-10",
          "goals_in_favor": 3,
          "goals_against": 7
        },
        {
          "date": "2018-02-05",
          "goals_in_favor": 1,
          "goals_against": 5
        },
        {
          "date": "2018-12-05",
          "goals_in_favor": 2,
          "goals_against": 6
        },
        {
          "date": "2018-08-19",
          "goals_in_favor": 3,
          "goals_against": 7
        },
        {
          "date": "2018-11-07",
          "goals_in_favor": 2,
          "goals_against": 6
        },
        {
          "date": "2018-07-16",
          "goals_in_favor": 2,
          "goals_against": 4
        },
        {
          "date": "2018-02-22",
          "goals_in_favor": 2,
          "goals_against": 7
        }
      ],
      "ties": [
        {
          "date": "2018-04-16",
          "goals_in_favor": 2,
          "goals_against": 4
        }
      ]
    },
    {
      "name": "droids",
      "photo": "/img/droids.jpg",
      "logo": "/img/droids_logo.jpg",
      "manager": "Raymond Roberson",
      "wins": [
        {
          "date": "2018-01-20",
          "goals_in_favor": 9,
          "goals_against": 2
        },
        {
          "date": "2018-05-05",
          "goals_in_favor": 7,
          "goals_against": 2
        },
        {
          "date": "2018-05-20",
          "goals_in_favor": 9,
          "goals_against": 2
        },
        {
          "date": "2018-02-11",
          "goals_in_favor": 8,
          "goals_against": 2
        },
        {
          "date": "2018-09-02",
          "goals_in_favor": 6,
          "goals_against": 3
        },
        {
          "date": "2018-10-09",
          "goals_in_favor": 4,
          "goals_against": 2
        },
        {
          "date": "2018-09-14",
          "goals_in_favor": 4,
          "goals_against": 1
        },
        {
          "date": "2018-09-27",
          "goals_in_favor": 8,
          "goals_against": 2
        },
        {
          "date": "2018-06-13",
          "goals_in_favor": 7,
          "goals_against": 2
        },
        {
          "date": "2018-07-25",
          "goals_in_favor": 5,
          "goals_against": 2
        },
        {
          "date": "2018-07-20",
          "goals_in_favor": 3,
          "goals_against": 0
        }
      ],
      "losses": [
        {
          "date": "2018-04-03",
          "goals_in_favor": 1,
          "goals_against": 4
        },
        {
          "date": "2018-07-08",
          "goals_in_favor": 1,
          "goals_against": 4
        },
        {
          "date": "2018-08-23",
          "goals_in_favor": 1,
          "goals_against": 4
        },
        {
          "date": "2018-10-18",
          "goals_in_favor": 1,
          "goals_against": 6
        },
        {
          "date": "2018-11-01",
          "goals_in_favor": 3,
          "goals_against": 5
        }
      ],
      "ties": [
        {
          "date": "2018-08-11",
          "goals_in_favor": 2,
          "goals_against": 4
        }
      ]
    },
    {
      "name": "emperors",
      "photo": "/img/emperors.jpg",
      "logo": "/img/emperors_logo.jpg",
      "manager": "Maryellen Michael",
      "wins": [
        {
          "date": "2018-05-30",
          "goals_in_favor": 5,
          "goals_against": 2
        },
        {
          "date": "2018-12-19",
          "goals_in_favor": 6,
          "goals_against": 2
        },
        {
          "date": "2018-06-08",
          "goals_in_favor": 8,
          "goals_against": 2
        },
        {
          "date": "2018-04-18",
          "goals_in_favor": 4,
          "goals_against": 3
        },
        {
          "date": "2018-08-02",
          "goals_in_favor": 5,
          "goals_against": 2
        },
        {
          "date": "2018-07-22",
          "goals_in_favor": 9,
          "goals_against": 2
        }
      ],
      "losses": [
        {
          "date": "2018-08-03",
          "goals_in_favor": 3,
          "goals_against": 7
        },
        {
          "date": "2018-08-13",
          "goals_in_favor": 2,
          "goals_against": 6
        },
        {
          "date": "2018-11-16",
          "goals_in_favor": 2,
          "goals_against": 6
        },
        {
          "date": "2018-05-20",
          "goals_in_favor": 3,
          "goals_against": 7
        },
        {
          "date": "2018-12-17",
          "goals_in_favor": 3,
          "goals_against": 7
        },
        {
          "date": "2018-07-17",
          "goals_in_favor": 1,
          "goals_against": 6
        },
        {
          "date": "2018-07-20",
          "goals_in_favor": 3,
          "goals_against": 5
        },
        {
          "date": "2018-10-18",
          "goals_in_favor": 3,
          "goals_against": 4
        },
        {
          "date": "2018-03-23",
          "goals_in_favor": 1,
          "goals_against": 6
        },
        {
          "date": "2019-01-03",
          "goals_in_favor": 2,
          "goals_against": 5
        }
      ],
      "ties": [
        {
          "date": "2018-04-19",
          "goals_in_favor": 2,
          "goals_against": 4
        }
      ]
    },
    {
      "name": "raiders",
      "photo": "/img/raiders.jpg",
      "logo": "/img/raiders_logo.jpg",
      "manager": "Key Bauer",
      "wins": [
        {
          "date": "2018-10-31",
          "goals_in_favor": 5,
          "goals_against": 2
        },
        {
          "date": "2018-09-26",
          "goals_in_favor": 9,
          "goals_against": 3
        },
        {
          "date": "2018-09-11",
          "goals_in_favor": 7,
          "goals_against": 3
        },
        {
          "date": "2018-05-04",
          "goals_in_favor": 5,
          "goals_against": 2
        },
        {
          "date": "2018-05-22",
          "goals_in_favor": 6,
          "goals_against": 2
        },
        {
          "date": "2018-09-11",
          "goals_in_favor": 4,
          "goals_against": 1
        }
      ],
      "losses": [
        {
          "date": "2018-02-03",
          "goals_in_favor": 1,
          "goals_against": 4
        },
        {
          "date": "2018-04-21",
          "goals_in_favor": 3,
          "goals_against": 7
        },
        {
          "date": "2018-02-17",
          "goals_in_favor": 3,
          "goals_against": 4
        },
        {
          "date": "2018-08-05",
          "goals_in_favor": 3,
          "goals_against": 4
        },
        {
          "date": "2018-06-05",
          "goals_in_favor": 3,
          "goals_against": 6
        },
        {
          "date": "2018-12-21",
          "goals_in_favor": 3,
          "goals_against": 6
        },
        {
          "date": "2018-12-08",
          "goals_in_favor": 1,
          "goals_against": 5
        },
        {
          "date": "2018-03-13",
          "goals_in_favor": 1,
          "goals_against": 4
        },
        {
          "date": "2018-01-17",
          "goals_in_favor": 1,
          "goals_against": 7
        },
        {
          "date": "2018-05-27",
          "goals_in_favor": 1,
          "goals_against": 5
        }
      ],
      "ties": []
    },
    {
      "name": "sandcrawlers",
      "photo": "/img/sandcrawlers.jpg",
      "logo": "/img/sandcrawlers_logo.jpg",
      "manager": "Nichols Robbins",
      "wins": [
        {
          "date": "2018-01-27",
          "goals_in_favor": 4,
          "goals_against": 1
        },
        {
          "date": "2019-01-07",
          "goals_in_favor": 9,
          "goals_against": 1
        },
        {
          "date": "2018-08-16",
          "goals_in_favor": 4,
          "goals_against": 1
        },
        {
          "date": "2018-06-27",
          "goals_in_favor": 9,
          "goals_against": 1
        }
      ],
      "losses": [
        {
          "date": "2018-05-03",
          "goals_in_favor": 3,
          "goals_against": 4
        },
        {
          "date": "2018-09-29",
          "goals_in_favor": 3,
          "goals_against": 5
        },
        {
          "date": "2018-10-06",
          "goals_in_favor": 1,
          "goals_against": 4
        },
        {
          "date": "2018-10-06",
          "goals_in_favor": 3,
          "goals_against": 6
        },
        {
          "date": "2019-01-04",
          "goals_in_favor": 2,
          "goals_against": 7
        },
        {
          "date": "2018-08-10",
          "goals_in_favor": 1,
          "goals_against": 4
        },
        {
          "date": "2018-01-30",
          "goals_in_favor": 2,
          "goals_against": 6
        },
        {
          "date": "2018-05-03",
          "goals_in_favor": 2,
          "goals_against": 5
        },
        {
          "date": "2018-05-08",
          "goals_in_favor": 1,
          "goals_against": 6
        },
        {
          "date": "2018-09-17",
          "goals_in_favor": 2,
          "goals_against": 4
        },
        {
          "date": "2018-03-10",
          "goals_in_favor": 3,
          "goals_against": 4
        },
        {
          "date": "2018-07-26",
          "goals_in_favor": 3,
          "goals_against": 6
        }
      ],
      "ties": [
        {
          "date": "2018-12-09",
          "goals_in_favor": 3,
          "goals_against": 5
        }
      ]
    },
    {
      "name": "wampas",
      "photo": "/img/wampas.jpg",
      "logo": "/img/wampas_logo.jpg",
      "manager": "Campbell Lucas",
      "wins": [        
        {
          "date": "2018-01-14",
          "goals_in_favor": 4,
          "goals_against": 1
        },
        {
          "date": "2018-08-11",
          "goals_in_favor": 8,
          "goals_against": 3
        },
        {
          "date": "2018-03-13",
          "goals_in_favor": 6,
          "goals_against": 1
        },
        {
          "date": "2018-01-08",
          "goals_in_favor": 5,
          "goals_against": 1
        },
        {
          "date": "2018-04-07",
          "goals_in_favor": 9,
          "goals_against": 2
        },
        {
          "date": "2018-12-19",
          "goals_in_favor": 6,
          "goals_against": 3
        },
        {
          "date": "2018-01-26",
          "goals_in_favor": 8,
          "goals_against": 2
        }
      ],
      "losses": [        
        {
          "date": "2018-07-29",
          "goals_in_favor": 2,
          "goals_against": 7
        },
        {
          "date": "2018-01-23",
          "goals_in_favor": 3,
          "goals_against": 5
        },
        {
          "date": "2018-12-26",
          "goals_in_favor": 2,
          "goals_against": 7
        },
        {
          "date": "2018-10-07",
          "goals_in_favor": 1,
          "goals_against": 5
        },
        {
          "date": "2018-04-20",
          "goals_in_favor": 3,
          "goals_against": 5
        },
        {
          "date": "2018-02-06",
          "goals_in_favor": 3,
          "goals_against": 4
        },
        {
          "date": "2018-07-11",
          "goals_in_favor": 3,
          "goals_against": 5
        },
        {
          "date": "2018-09-16",
          "goals_in_favor": 1,
          "goals_against": 6
        }
      ],
      "ties": [
        {
          "date": "2019-01-09",
          "goals_in_favor": 2,
          "goals_against": 3
        },
        {
          "date": "2018-03-21",
          "goals_in_favor": 3,
          "goals_against": 1
        }
      ]
    }
  ],
  schedule: [
    {
      "date": "2018-10-07",
      "time": "03:21",
      "team1": "admirals",
      "team2": "wampas",
      "location": "North Elementary"
    },
    {
      "date": "2018-11-14",
      "time": "17:32",
      "team1": "sandcrawlers",
      "team2": "wampas",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-12-08",
      "time": "09:20",
      "team1": "chiefs",
      "team2": "raiders",
      "location": "South Elementary"
    },
    {
      "date": "2018-10-02",
      "time": "18:32",
      "team1": "emperors",
      "team2": "droids",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-28",
      "time": "11:08",
      "team1": "admirals",
      "team2": "droids",
      "location": "North Elementary"
    },
    {
      "date": "2018-11-18",
      "time": "11:09",
      "team1": "wampas",
      "team2": "droids",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-23",
      "time": "08:36",
      "team1": "chiefs",
      "team2": "admirals",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-26",
      "time": "22:10",
      "team1": "chiefs",
      "team2": "droids",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-12-11",
      "time": "01:27",
      "team1": "emperors",
      "team2": "chiefs",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-11-07",
      "time": "03:34",
      "team1": "droids",
      "team2": "droids",
      "location": "South Elementary"
    },
    {
      "date": "2018-12-06",
      "time": "22:21",
      "team1": "sandcrawlers",
      "team2": "droids",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-11-19",
      "time": "20:29",
      "team1": "emperors",
      "team2": "raiders",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-11-29",
      "time": "04:37",
      "team1": "sandcrawlers",
      "team2": "raiders",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-12-07",
      "time": "04:15",
      "team1": "droids",
      "team2": "droids",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-28",
      "time": "15:22",
      "team1": "sandcrawlers",
      "team2": "chiefs",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-11-21",
      "time": "13:25",
      "team1": "emperors",
      "team2": "admirals",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-10-19",
      "time": "16:02",
      "team1": "wampas",
      "team2": "admirals",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2019-01-06",
      "time": "23:10",
      "team1": "sandcrawlers",
      "team2": "raiders",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-04",
      "time": "23:33",
      "team1": "raiders",
      "team2": "droids",
      "location": "North Elementary"
    },
    {
      "date": "2018-12-23",
      "time": "23:07",
      "team1": "droids",
      "team2": "raiders",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-11-25",
      "time": "22:44",
      "team1": "admirals",
      "team2": "wampas",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-25",
      "time": "02:52",
      "team1": "chiefs",
      "team2": "admirals",
      "location": "South Elementary"
    },
    {
      "date": "2018-11-10",
      "time": "16:34",
      "team1": "admirals",
      "team2": "droids",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-13",
      "time": "23:12",
      "team1": "wampas",
      "team2": "droids",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-12-31",
      "time": "05:20",
      "team1": "sandcrawlers",
      "team2": "raiders",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-11-02",
      "time": "09:04",
      "team1": "droids",
      "team2": "raiders",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-11-26",
      "time": "08:03",
      "team1": "raiders",
      "team2": "emperors",
      "location": "South Elementary"
    },
    {
      "date": "2018-12-09",
      "time": "19:26",
      "team1": "raiders",
      "team2": "admirals",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-11-23",
      "time": "15:30",
      "team1": "admirals",
      "team2": "droids",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-25",
      "time": "15:36",
      "team1": "chiefs",
      "team2": "sandcrawlers",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-08",
      "time": "11:17",
      "team1": "raiders",
      "team2": "raiders",
      "location": "South Elementary"
    },
    {
      "date": "2018-10-27",
      "time": "02:14",
      "team1": "chiefs",
      "team2": "wampas",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-12-10",
      "time": "04:35",
      "team1": "emperors",
      "team2": "raiders",
      "location": "South Elementary"
    },
    {
      "date": "2018-10-26",
      "time": "21:30",
      "team1": "emperors",
      "team2": "sandcrawlers",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-11-11",
      "time": "19:15",
      "team1": "admirals",
      "team2": "emperors",
      "location": "North Elementary"
    },
    {
      "date": "2018-11-22",
      "time": "20:55",
      "team1": "wampas",
      "team2": "admirals",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-12",
      "time": "01:18",
      "team1": "sandcrawlers",
      "team2": "emperors",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-11-24",
      "time": "04:46",
      "team1": "sandcrawlers",
      "team2": "wampas",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-12-06",
      "time": "22:19",
      "team1": "sandcrawlers",
      "team2": "chiefs",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-12-18",
      "time": "21:41",
      "team1": "raiders",
      "team2": "droids",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-11-09",
      "time": "06:12",
      "team1": "chiefs",
      "team2": "raiders",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-12-21",
      "time": "16:02",
      "team1": "chiefs",
      "team2": "emperors",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-12-17",
      "time": "08:33",
      "team1": "droids",
      "team2": "raiders",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-12-03",
      "time": "11:12",
      "team1": "emperors",
      "team2": "chiefs",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-24",
      "time": "14:10",
      "team1": "chiefs",
      "team2": "droids",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-11-10",
      "time": "20:06",
      "team1": "emperors",
      "team2": "wampas",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-30",
      "time": "03:30",
      "team1": "emperors",
      "team2": "wampas",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2019-01-12",
      "time": "00:31",
      "team1": "raiders",
      "team2": "wampas",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-10-29",
      "time": "10:25",
      "team1": "sandcrawlers",
      "team2": "emperors",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-11-20",
      "time": "19:06",
      "team1": "sandcrawlers",
      "team2": "droids",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-18",
      "time": "22:40",
      "team1": "raiders",
      "team2": "emperors",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-10",
      "time": "06:04",
      "team1": "raiders",
      "team2": "raiders",
      "location": "North Elementary"
    },
    {
      "date": "2018-12-01",
      "time": "18:54",
      "team1": "chiefs",
      "team2": "raiders",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-12-16",
      "time": "17:14",
      "team1": "emperors",
      "team2": "droids",
      "location": "North Elementary"
    },
    {
      "date": "2019-01-13",
      "time": "15:10",
      "team1": "wampas",
      "team2": "sandcrawlers",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-12-23",
      "time": "13:56",
      "team1": "emperors",
      "team2": "raiders",
      "location": "North Elementary"
    },
    {
      "date": "2018-11-07",
      "time": "17:00",
      "team1": "raiders",
      "team2": "wampas",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-11-12",
      "time": "23:05",
      "team1": "sandcrawlers",
      "team2": "raiders",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-10-16",
      "time": "03:56",
      "team1": "sandcrawlers",
      "team2": "raiders",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-12-06",
      "time": "15:56",
      "team1": "raiders",
      "team2": "admirals",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-10-08",
      "time": "08:08",
      "team1": "chiefs",
      "team2": "sandcrawlers",
      "location": "South Elementary"
    },
    {
      "date": "2018-11-26",
      "time": "17:51",
      "team1": "admirals",
      "team2": "droids",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-20",
      "time": "08:09",
      "team1": "droids",
      "team2": "admirals",
      "location": "South Elementary"
    },
    {
      "date": "2018-11-21",
      "time": "21:24",
      "team1": "admirals",
      "team2": "chiefs",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-27",
      "time": "16:47",
      "team1": "emperors",
      "team2": "wampas",
      "location": "South Elementary"
    },
    {
      "date": "2018-11-16",
      "time": "23:58",
      "team1": "raiders",
      "team2": "sandcrawlers",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-10-05",
      "time": "19:30",
      "team1": "sandcrawlers",
      "team2": "raiders",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-12-26",
      "time": "23:01",
      "team1": "wampas",
      "team2": "wampas",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2019-01-14",
      "time": "06:46",
      "team1": "emperors",
      "team2": "sandcrawlers",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-12-03",
      "time": "09:33",
      "team1": "droids",
      "team2": "wampas",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-10-29",
      "time": "22:48",
      "team1": "raiders",
      "team2": "emperors",
      "location": "South Elementary"
    },
    {
      "date": "2019-01-09",
      "time": "04:03",
      "team1": "droids",
      "team2": "emperors",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-02",
      "time": "03:15",
      "team1": "raiders",
      "team2": "emperors",
      "location": "South Elementary"
    },
    {
      "date": "2018-10-18",
      "time": "19:12",
      "team1": "emperors",
      "team2": "emperors",
      "location": "South Elementary"
    },
    {
      "date": "2018-12-09",
      "time": "11:51",
      "team1": "admirals",
      "team2": "droids",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-10-13",
      "time": "22:50",
      "team1": "droids",
      "team2": "sandcrawlers",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-01",
      "time": "20:49",
      "team1": "emperors",
      "team2": "raiders",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-10-21",
      "time": "10:09",
      "team1": "emperors",
      "team2": "raiders",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-10-02",
      "time": "07:48",
      "team1": "emperors",
      "team2": "emperors",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-11-10",
      "time": "07:37",
      "team1": "admirals",
      "team2": "raiders",
      "location": "South Elementary"
    },
    {
      "date": "2018-11-10",
      "time": "15:23",
      "team1": "droids",
      "team2": "admirals",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-11-07",
      "time": "15:19",
      "team1": "chiefs",
      "team2": "sandcrawlers",
      "location": "South Elementary"
    },
    {
      "date": "2018-12-30",
      "time": "20:29",
      "team1": "chiefs",
      "team2": "wampas",
      "location": "North Elementary"
    },
    {
      "date": "2018-10-11",
      "time": "04:03",
      "team1": "raiders",
      "team2": "droids",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2018-10-22",
      "time": "10:45",
      "team1": "admirals",
      "team2": "emperors",
      "location": "AJ Katzenmaier Elementary"
    },
    {
      "date": "2019-01-14",
      "time": "15:05",
      "team1": "admirals",
      "team2": "admirals",
      "location": "North Elementary"
    },
    {
      "date": "2018-11-19",
      "time": "01:59",
      "team1": "chiefs",
      "team2": "chiefs",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-11-11",
      "time": "04:09",
      "team1": "emperors",
      "team2": "droids",
      "location": "South Elementary"
    },
    {
      "date": "2018-12-09",
      "time": "10:54",
      "team1": "sandcrawlers",
      "team2": "wampas",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-11-11",
      "time": "04:06",
      "team1": "sandcrawlers",
      "team2": "chiefs",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-11-27",
      "time": "17:53",
      "team1": "admirals",
      "team2": "chiefs",
      "location": "Greenbay Elementary"
    },
    {
      "date": "2018-12-01",
      "time": "20:56",
      "team1": "sandcrawlers",
      "team2": "droids",
      "location": "South Elementary"
    },
    {
      "date": "2018-10-29",
      "time": "20:51",
      "team1": "emperors",
      "team2": "sandcrawlers",
      "location": "South Elementary"
    },
    {
      "date": "2018-11-13",
      "time": "10:40",
      "team1": "wampas",
      "team2": "chiefs",
      "location": "South Elementary"
    },
    {
      "date": "2018-12-25",
      "time": "18:03",
      "team1": "sandcrawlers",
      "team2": "admirals",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2019-01-01",
      "time": "06:04",
      "team1": "wampas",
      "team2": "emperors",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-11-30",
      "time": "02:43",
      "team1": "admirals",
      "team2": "raiders",
      "location": "North Elementary"
    },
    {
      "date": "2018-10-23",
      "time": "12:59",
      "team1": "chiefs",
      "team2": "emperors",
      "location": "Marjorie P. Hart Elementary"
    },
    {
      "date": "2018-10-22",
      "time": "21:50",
      "team1": "raiders",
      "team2": "raiders",
      "location": "Howard A. Yeager Elementary"
    },
    {
      "date": "2018-11-30",
      "time": "17:51",
      "team1": "droids",
      "team2": "raiders",
      "location": "AJ Katzenmaier Elementary"
    }
  ],
  maps: [
    {
			name: 'katzenmaier',
			address: '24 W. Walton St., Chicago, IL 6061',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2165.118492508806!2d-87.63092258908124!3d41.90032115714603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34e07f69da7%3A0x15e198c063fc787c!2sAJ+Katzenmaier+Elementary!5e0!3m2!1sen!2ses!4v1542890272144"
    },
    {
			name: 'greenbay',
			address: '1734 N. Orleans St., Chicago, IL 60614',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.022795992249!2d-87.64002218489757!3d41.91386867115462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3407260c45b%3A0xb351205fae50c6f3!2sGreenbay+Elementary!5e0!3m2!1sen!2ses!4v1542890628456"
    },
    {
			name: 'howard',
			address: '2245 N. Southport Ave., Chicago, IL 60614',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378805.97367068974!2d-88.03859259955114!3d42.1198553540001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2e37f852467%3A0xb6cb22b2f0358874!2sHoward+A+Yeager+Elementary!5e0!3m2!1sen!2ses!4v1542890741658"
    },
    {
			name: 'marjorie',
			address: '2625 N. Orchand St., Chicago, IL 60614',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378753.9213757168!2d-88.02602058880525!3d42.128561885599304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd30f2637f9d7%3A0xdbff5d5dfcfcfa35!2sMarjorie+P+Hart+Elementary!5e0!3m2!1sen!2ses!4v1542890828850"
    },
    {
			name: 'north',
			address: '1409 N. Ogden Ave., Chicago, IL 60610',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.335832778051!2d-87.64833373489782!3d41.90713877157602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33af14860a5%3A0x5736e62f19086c62!2sNorth+Elementary!5e0!3m2!1sen!2ses!4v1542890907587"
    },
    {
			name: 'south',
			address: '2101 N. Fremont St., Chicago, IL 60614',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20359.994773891158!2d-87.66235002008013!3d41.91832756198644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3196e269cbf%3A0x1caabcbc4893f0da!2sSt+James+Lutheran+School!5e0!3m2!1sen!2ses!4v1542890976968"
    }
  ]		
	},
	methods: {
		capitalShow: function () {
			return this.show.toUpperCase();
		},
		seen: function (arg) {
			this.show = arg;
			window.scrollTo(0, 0);
		}
	},
	computed: {
		gameLocation: function(){
			switch(this.location){
              case 'kat':
                return this.maps[0];
                break;
             case 'gre':
               return this.maps[1];
                break;
             case 'how':
               return this.maps[2];
                break;
             case 'mar':
               return this.maps[3];
                break;
             case 'nor':
              return this.maps[4];
                break;
             case 'sou':
              return this.maps[5];
                break;
             default:
                return 'error';               
            }
		}
	}
});





// *****************--JSON--********************

//JSON was generated with www.json-generator.com  with the following code:
/*
{
  players: [
    	'{{repeat(70)}}',
    	{
          player_id:'{{index()}}',
      		first_name: '{{firstName()}}',
            second_name: '{{surname()}}',
          team: function(tags, index){
            var arr = ['admirals','chiefs','droids','emperors','raiders','sandcrawlers','wampas'];
            switch(Math.floor(index/10)+1){
              case 1:
                return arr[0];
                break;
             case 2:
                return arr[1];
                break;
             case 3:
                return arr[2];
                break;
             case 4:
                return arr[3];
                break;
             case 5:
                return arr[4];
                break;
             case 6:
                return arr[5];
                break;
             case 7:
                return arr[6];
                break;
            }
           },
             yellow_cards: '{{random([0],[1],[2],[3],[4])}}',
             red_cards: '{{random([0],[1],[2])}}',
             goals: '{{random([0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12])}}',
          rank: 'false'          
           }
  		],
  teams: ['{{repeat(7)}}',{
          name:function(tags, index){
          var arr = ['admirals','chiefs','droids','emperors','raiders','sandcrawlers','wampas'];
            return arr[index];
        },
          photo: function(tags, index){
            switch(this.name){
              case 'admirals':
                return '/img/admirals.jpg';
                break;
             case 'chiefs':
                return '/img/chiefs.jpg';
                break;
             case 'droids':
                return '/img/droids.jpg';
                break;
             case 'emperors':
                return '/img/emperors.jpg';
                break;
             case 'raiders':
                return '/img/raiders.jpg';
                break;
             case 'sandcrawlers':
                return '/img/sandcrawlers.jpg';
                break;
             case 'wampas':
                return '/img/wampas.jpg';
                break;
             default:
                return 'error in the JSON geneator code';
            }
          },
           logo: function(tags, index){
            switch(this.name){
              case 'admirals':
                return '/img/admirals_logo.jpg';
                break;
             case 'chiefs':
                return '/img/chiefs_logo.jpg';
                break;
             case 'droids':
                return '/img/droids_logo.jpg';
                break;
             case 'emperors':
                return '/img/emperors_logo.jpg';
                break;
             case 'raiders':
                return '/img/raiders_logo.jpg';
                break;
             case 'sandcrawlers':
                return '/img/sandcrawlers_logo.jpg';
                break;
             case 'wampas':
                return '/img/wampas_logo.jpg';
                break;
             default:
                return 'error in the JSON geneator code';
            }
          },
           manager: '{{firstName()}} {{surname()}}',
    wins: ['{{repeat(12)}}',
             {
             date: '{{date(new Date(2018, 0, 1), new Date(), "YYYY-MM-dd")}}',
          goals_in_favor: '{{random([4],[5],[6],[7],[8],[9])}}',
        goals_against: '{{random([1],[2],[3])}}'
           }           
           ],
           losses: ['{{repeat(12)}}',
           {
             date: '{{date(new Date(2018, 0, 1), new Date(), "YYYY-MM-dd")}}',
          goals_in_favor: '{{random([1],[2],[3])}}',
        goals_against: '{{random([4],[5],[6],[7])}}'
           }
           ],
           ties: ['{{repeat(5)}}',
            {
             date: '{{date(new Date(2018, 0, 1), new Date(), "YYYY-MM-dd")}}',
          goals_in_favor: '{{random([1],[2],[3],[4],[5])}}',
        goals_against: '{{random([1],[2],[3],[4],[5])}}'
           }
           ]
          }],
  schedule: ['{{repeat(100)}}',{
              date: '{{date(new Date(2018, 9, 1), new Date(), "YYYY-MM-dd")}}',
              time: '{{date(new Date(2014, 0, 1), new Date(), "HH:mm")}}',
              team1: '{{random(["admirals"],["chiefs"],["droids"],["emperors"],["raiders"],["sandcrawlers"],["wampas"])}}',
             team2: function(tags, index){
       var arr2 = ['admirals','chiefs','droids','emperors','raiders','sandcrawlers','wampas','droids','raiders','emperors'];                
               return arr2[Math.floor(10*Math.random())];
    },
              location: '{{random(["AJ Katzenmaier Elementary"],["Greenbay Elementary"],["Howard A. Yeager Elementary"],["Marjorie P. Hart Elementary"],["North Elementary"],["South Elementary"])}}'
             }],
  maps:[
    {
			name: 'katzenmaier',
			address: '24 W. Walton St., Chicago, IL 6061',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2165.118492508806!2d-87.63092258908124!3d41.90032115714603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34e07f69da7%3A0x15e198c063fc787c!2sAJ+Katzenmaier+Elementary!5e0!3m2!1sen!2ses!4v1542890272144"
    },
    {
			name: 'greenbay',
			address: '1734 N. Orleans St., Chicago, IL 60614',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.022795992249!2d-87.64002218489757!3d41.91386867115462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3407260c45b%3A0xb351205fae50c6f3!2sGreenbay+Elementary!5e0!3m2!1sen!2ses!4v1542890628456"
    },
    {
			name: 'howard',
			address: '2245 N. Southport Ave., Chicago, IL 60614',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378805.97367068974!2d-88.03859259955114!3d42.1198553540001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2e37f852467%3A0xb6cb22b2f0358874!2sHoward+A+Yeager+Elementary!5e0!3m2!1sen!2ses!4v1542890741658"
    },
    {
			name: 'marjorie',
			address: '2625 N. Orchand St., Chicago, IL 60614',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378753.9213757168!2d-88.02602058880525!3d42.128561885599304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd30f2637f9d7%3A0xdbff5d5dfcfcfa35!2sMarjorie+P+Hart+Elementary!5e0!3m2!1sen!2ses!4v1542890828850"
    },
    {
			name: 'north',
			address: '1409 N. Ogden Ave., Chicago, IL 60610',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.335832778051!2d-87.64833373489782!3d41.90713877157602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33af14860a5%3A0x5736e62f19086c62!2sNorth+Elementary!5e0!3m2!1sen!2ses!4v1542890907587"
    },
    {
			name: 'south',
			address: '2101 N. Fremont St., Chicago, IL 60614',
      frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20359.994773891158!2d-87.66235002008013!3d41.91832756198644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3196e269cbf%3A0x1caabcbc4893f0da!2sSt+James+Lutheran+School!5e0!3m2!1sen!2ses!4v1542890976968"
    }
  ]
}
 */



