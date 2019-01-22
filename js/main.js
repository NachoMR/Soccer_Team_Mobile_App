Vue.component('clubs-stats', {
	template: '<table class="w-100 table-striped text-center"><thead><tr><th>TEAM</th><th>PLAYED</th><th>W</th><th>L</th><th>T</th><th>POINTS</th></tr></thead><tbody><tr v-for="item in compTeams" :class="{success: (item.name == team1ToCheck) || (item.name == team2ToCheck)}"><td>{{ capitalize(item.name) }}</td><td>{{ sumPlayed(item) }}</td><td>{{ item.wins.length }}</td><td>{{ item.losses.length }}</td><td>{{ item.ties.length }}</td><td>{{sumPoints(item) }}</td></tr></tbody></table>',
	props: ['teams_props', 'team1_props', 'team2_props'],
	data: function () {
		return {
			compTeams: this.teams_props,
//			compActive_team: this.team1_props
		}
	},
	methods: {
		//  _S stands for sort

		capitalize: function (arg) {
			//			console.log(this.compTeams.wins.length);
			return arg.charAt(0).toUpperCase() + arg.slice(1);
		},
		sumPoints: function (arg) {
			return (arg.wins.length * 3) + (arg.ties.length * 1);
		},
		sumPlayed: function (arg) {
			return (arg.wins.length + arg.losses.length + arg.ties.length);
		},
		compTeams_S: function () {
			return this.compTeams.sort((a, b) => {
				return this.sumPoints(b) - this.sumPoints(a);
			});
		}
	},
	computed: {
		team1ToCheck() {
			return this.team1_props;
		},
		team2ToCheck() {
			return this.team2_props;
		}
	}
});

Vue.component('players-stats', {
	template: '<table class="w-100 table-striped table-hover text-center"><thead><tr><th>PLAYER</th><th>GOALS</th><th>YELLOW CARDS</th><th>RED CARDS</th><th>TEAM</th></tr></thead><tbody><tr v-for="item in compPlayers"><td>{{ item.first_name+ " " +item.second_name }}</td><td>{{ item.goals }}</td><td>{{ item.yellow_cards }}</td><td>{{ item.red_cards }}</td><td>{{ item.team }}</td></tr></tbody></table>',
	props: ['players_props'],
	data: function () {
		return {
			compPlayers: this.players_props
		}
	},
	methods: {
		//   _S stands for sorted
		compPlayers_S: function () {
			return this.compPlayers.sort(function (a, b) {
				return b.goals - a.goals
			})
		}
	}
});

Vue.component('schedule-by-month', {
	template: `<div class="py-2 text-center"><p class="h6 my-2 text-center font-weight-lighter font-italic">Select a month to display games</p><button type="button" v-on:click="seen2('sep')" class="btn btn-outline-primary">SEP</button><button type="button" v-on:click="seen2('oct')" class="btn btn-outline-primary">OCT</button><button type="button" v-on:click="seen2('nov')" class="btn btn-outline-primary">NOV</button><button type="button" v-on:click="seen2('dec')" class="btn btn-outline-primary">DIC</button><button type="button" v-on:click="seen2('jan')" class="btn btn-outline-primary">JAN</button><p class="h6 mt-3 mb-0 text-center font-weight-lighter font-italic">Click on the match to see details</p><table class="w-100 table-striped table-hover text-center"><thead><tr><th>{{capitalShow(showMonth)}}</th><th>TEAMS</th><th>VENUE</th><th>TIME</th></tr></thead><tbody><tr v-for="compSched in compSchedule_S_F"  v-on:click="go(compSched)"><td>{{compSched.date}}</td><td>{{compSched.team1 + ' vs ' + compSched.team2}}</td><td>{{compSched.location}}</td><td>{{compSched.time}}</td></tr></tbody></table></div>`,
	props: ['schedule_props'],
	data: function () {
		return {
			showMonth: 'sep',
			monthCode: {
				jan: '01',
				feb: '02',
				mar: '03',
				apr: '04',
				may: '05',
				jun: '06',
				jul: '07',
				aug: '08',
				sep: '09',
				oct: '10',
				nov: '11',
				dec: '12'
			}
		}
	},
	methods: {
		go: function (arg) {
			console.log(arg);
			app.show = 'my match';
			app.matchDate = arg;
		},
		capitalShow: function (arg) {
			return arg.toUpperCase();
		},
		seen2: function (arg) {
			this.showMonth = arg;
			//			window.scrollTo(0, 0);
		}
	},
	computed: {
		compSchedule_S_F: function () {
			//		_S_F stands for Sorted and Filtered
			//			console.log('compSchedule_S_F esta funcionando');
			//			console.log('showMonth es: ' + this.showMonth);		
			return this.compSchedule.sort(function (a, b) {
				return new Date(a.date) - new Date(b.date)
			}).filter((arg) => {
				return (arg.date.substring(5, 7)) == this.monthCode[this.showMonth];
			})
		},
		compSchedule: function () {
			return this.schedule_props;
		}

	}
});

Vue.component('team-members', {
	template: '<div class="overflow-auto border border-light overflow_dimensions"><dl><dt>MANAGER</dt><dd>{{compTeams[getTeamIndex].manager}}</dd><dt>CAPTAIN</dt><dd>{{getCaptain()}}</dd><dt>PLAYERS</dt><dd v-for="item in getTeamMembers()">{{item}}</dd></dl></div>',
	props: ['players_props', 'teams_props', 'team_props'],
	data: function () {
		return {
			compPlayers: this.players_props,
			compTeams: this.teams_props,
		}
	},
	methods: {
		getCaptain: function () {
			for (var i = 0; i < this.compPlayers.length; i++) {
				if (this.compPlayers[i].team === this.compTeam && this.compPlayers[i].captain) {
					return this.compPlayers[i].first_name + ' ' + this.compPlayers[i].second_name;
				}
			}
		},
		getTeamMembers: function () {
			var arr = [];
			//			console.log('la funcion getActiveTeamMembers ha sido llamada para renderizar los miembros del activeTeam')
			for (var i = 0; i < this.compPlayers.length; i++) {
				if (this.compPlayers[i].team === this.compTeam) {
					arr.push(this.compPlayers[i].first_name + ' ' + this.compPlayers[i].second_name)
				}
			}
			return arr;
		}
	},
	computed: {
		getTeamIndex: function () {
			switch (this.compTeam) {
				case 'admirals':
					return 0;
					break;
				case 'chiefs':
					return 1;
					break;
				case 'droids':
					return 2;
					break;
				case 'emperors':
					return 3;
					break;
				case 'raiders':
					return 4;
					break;
				case 'sandcrawlers':
					return 5;
					break;
				case 'wampas':
					return 6;
					break;
				default:
					return null;
			}
		},
		compTeam: function () {
			return this.team_props;
		}
	}
});

//Firebase url
var url = "https://nysl-chat-c911d.firebaseio.com/.json";



var app = new Vue({
	el: "#app",
	data: {
		matchDate: {
			date: "2018-09-28",
			time: "11:54",
			team1: "droids",
			team2: "emperors",
			location: "AJ Katzenmaier Elementary"
		},
//		activeChat: 'droids',
		show: 'home',
		activeTeam: 'admirals',
//		activeTeamIndex: null,
		statistics: 'clubs',
		locationCode: 'gre',
				players: [
					{
						"player_id": 0,
						"first_name": "Penelope",
						"second_name": "Summers",
						"team": "admirals",
						"yellow_cards": 3,
						"red_cards": 1,
						"goals": 10,
						"captain": false
		    },
					{
						"player_id": 1,
						"first_name": "Tabatha",
						"second_name": "Holcomb",
						"team": "admirals",
						"yellow_cards": 2,
						"red_cards": 0,
						"goals": 8,
						"captain": false
		    },
					{
						"player_id": 2,
						"first_name": "Perkins",
						"second_name": "Norton",
						"team": "admirals",
						"yellow_cards": 1,
						"red_cards": 1,
						"goals": 5,
						"captain": false
		    },
					{
						"player_id": 3,
						"first_name": "Rosemary",
						"second_name": "Jones",
						"team": "admirals",
						"yellow_cards": 0,
						"red_cards": 1,
						"goals": 11,
						"captain": false
		    },
					{
						"player_id": 4,
						"first_name": "Mejia",
						"second_name": "Dudley",
						"team": "admirals",
						"yellow_cards": 1,
						"red_cards": 0,
						"goals": 11,
						"captain": false
		    },
					{
						"player_id": 5,
						"first_name": "Santos",
						"second_name": "Lancaster",
						"team": "admirals",
						"yellow_cards": 0,
						"red_cards": 0,
						"goals": 3,
						"captain": false
		    },
					{
						"player_id": 6,
						"first_name": "Kerry",
						"second_name": "Finch",
						"team": "admirals",
						"yellow_cards": 1,
						"red_cards": 1,
						"goals": 0,
						"captain": true
		    },
					{
						"player_id": 7,
						"first_name": "Paul",
						"second_name": "Patrick",
						"team": "admirals",
						"yellow_cards": 1,
						"red_cards": 2,
						"goals": 7,
						"captain": false
		    },
					{
						"player_id": 8,
						"first_name": "Faulkner",
						"second_name": "Acevedo",
						"team": "admirals",
						"yellow_cards": 4,
						"red_cards": 0,
						"goals": 0,
						"captain": false
		    },
					{
						"player_id": 9,
						"first_name": "Liza",
						"second_name": "Whitney",
						"team": "admirals",
						"yellow_cards": 4,
						"red_cards": 2,
						"goals": 10,
						"captain": false
		    },
					{
						"player_id": 10,
						"first_name": "Sarah",
						"second_name": "Combs",
						"team": "chiefs",
						"yellow_cards": 3,
						"red_cards": 0,
						"goals": 10,
						"captain": false
		    },
					{
						"player_id": 11,
						"first_name": "Kane",
						"second_name": "Peterson",
						"team": "chiefs",
						"yellow_cards": 4,
						"red_cards": 0,
						"goals": 6,
						"captain": true
		    },
					{
						"player_id": 12,
						"first_name": "Lenore",
						"second_name": "Lamb",
						"team": "chiefs",
						"yellow_cards": 3,
						"red_cards": 2,
						"goals": 7,
						"captain": false
		    },
					{
						"player_id": 13,
						"first_name": "Mullen",
						"second_name": "Christian",
						"team": "chiefs",
						"yellow_cards": 4,
						"red_cards": 2,
						"goals": 8,
						"captain": false
		    },
					{
						"player_id": 14,
						"first_name": "Amie",
						"second_name": "Compton",
						"team": "chiefs",
						"yellow_cards": 4,
						"red_cards": 2,
						"goals": 11,
						"captain": false
		    },
					{
						"player_id": 15,
						"first_name": "Robert",
						"second_name": "Waters",
						"team": "chiefs",
						"yellow_cards": 3,
						"red_cards": 2,
						"goals": 9,
						"captain": false
		    },
					{
						"player_id": 16,
						"first_name": "Lara",
						"second_name": "Duncan",
						"team": "chiefs",
						"yellow_cards": 3,
						"red_cards": 1,
						"goals": 1,
						"captain": false
		    },
					{
						"player_id": 17,
						"first_name": "Terra",
						"second_name": "Barr",
						"team": "chiefs",
						"yellow_cards": 2,
						"red_cards": 1,
						"goals": 7,
						"captain": false
		    },
					{
						"player_id": 18,
						"first_name": "Macdonald",
						"second_name": "Weber",
						"team": "chiefs",
						"yellow_cards": 0,
						"red_cards": 2,
						"goals": 6,
						"captain": false
		    },
					{
						"player_id": 19,
						"first_name": "Cecelia",
						"second_name": "Franklin",
						"team": "chiefs",
						"yellow_cards": 1,
						"red_cards": 0,
						"goals": 3,
						"captain": false
		    },
					{
						"player_id": 20,
						"first_name": "Hyde",
						"second_name": "Hunt",
						"team": "droids",
						"yellow_cards": 0,
						"red_cards": 0,
						"goals": 8,
						"captain": false
		    },
					{
						"player_id": 21,
						"first_name": "Villarreal",
						"second_name": "Lara",
						"team": "droids",
						"yellow_cards": 1,
						"red_cards": 1,
						"goals": 11,
						"captain": false
		    },
					{
						"player_id": 22,
						"first_name": "Lindsay",
						"second_name": "Delgado",
						"team": "droids",
						"yellow_cards": 4,
						"red_cards": 0,
						"goals": 3,
						"captain": false
		    },
					{
						"player_id": 23,
						"first_name": "Katrina",
						"second_name": "Chandler",
						"team": "droids",
						"yellow_cards": 2,
						"red_cards": 2,
						"goals": 5,
						"captain": false
		    },
					{
						"player_id": 24,
						"first_name": "Spears",
						"second_name": "Chang",
						"team": "droids",
						"yellow_cards": 0,
						"red_cards": 0,
						"goals": 11,
						"captain": true
		    },
					{
						"player_id": 25,
						"first_name": "Avery",
						"second_name": "Hansen",
						"team": "droids",
						"yellow_cards": 1,
						"red_cards": 1,
						"goals": 6,
						"captain": false
		    },
					{
						"player_id": 26,
						"first_name": "Vicky",
						"second_name": "Marks",
						"team": "droids",
						"yellow_cards": 1,
						"red_cards": 2,
						"goals": 10,
						"captain": false
		    },
					{
						"player_id": 27,
						"first_name": "Pate",
						"second_name": "Sims",
						"team": "droids",
						"yellow_cards": 4,
						"red_cards": 1,
						"goals": 6,
						"captain": false
		    },
					{
						"player_id": 28,
						"first_name": "Denise",
						"second_name": "Flynn",
						"team": "droids",
						"yellow_cards": 3,
						"red_cards": 0,
						"goals": 5,
						"captain": false
		    },
					{
						"player_id": 29,
						"first_name": "Singleton",
						"second_name": "Shannon",
						"team": "droids",
						"yellow_cards": 1,
						"red_cards": 2,
						"goals": 12,
						"captain": false
		    },
					{
						"player_id": 30,
						"first_name": "Brewer",
						"second_name": "Wade",
						"team": "emperors",
						"yellow_cards": 4,
						"red_cards": 2,
						"goals": 3,
						"captain": false
		    },
					{
						"player_id": 31,
						"first_name": "Francis",
						"second_name": "Durham",
						"team": "emperors",
						"yellow_cards": 4,
						"red_cards": 1,
						"goals": 12,
						"captain": false
		    },
					{
						"player_id": 32,
						"first_name": "Twila",
						"second_name": "Moore",
						"team": "emperors",
						"yellow_cards": 3,
						"red_cards": 2,
						"goals": 9,
						"captain": false
		    },
					{
						"player_id": 33,
						"first_name": "Latonya",
						"second_name": "Sanchez",
						"team": "emperors",
						"yellow_cards": 2,
						"red_cards": 1,
						"goals": 2,
						"captain": false
		    },
					{
						"player_id": 34,
						"first_name": "Stark",
						"second_name": "Barron",
						"team": "emperors",
						"yellow_cards": 2,
						"red_cards": 2,
						"goals": 2,
						"captain": false
		    },
					{
						"player_id": 35,
						"first_name": "Kelli",
						"second_name": "Howard",
						"team": "emperors",
						"yellow_cards": 1,
						"red_cards": 2,
						"goals": 9,
						"captain": false
		    },
					{
						"player_id": 36,
						"first_name": "Morales",
						"second_name": "Flores",
						"team": "emperors",
						"yellow_cards": 1,
						"red_cards": 0,
						"goals": 5,
						"captain": false
		    },
					{
						"player_id": 37,
						"first_name": "Anna",
						"second_name": "Melendez",
						"team": "emperors",
						"yellow_cards": 0,
						"red_cards": 2,
						"goals": 2,
						"captain": true
		    },
					{
						"player_id": 38,
						"first_name": "Moreno",
						"second_name": "Daniels",
						"team": "emperors",
						"yellow_cards": 3,
						"red_cards": 1,
						"goals": 12,
						"captain": false
		    },
					{
						"player_id": 39,
						"first_name": "Burke",
						"second_name": "Lloyd",
						"team": "emperors",
						"yellow_cards": 3,
						"red_cards": 2,
						"goals": 7,
						"captain": false
		    },
					{
						"player_id": 40,
						"first_name": "Katina",
						"second_name": "Oneal",
						"team": "raiders",
						"yellow_cards": 3,
						"red_cards": 0,
						"goals": 0,
						"captain": false
		    },
					{
						"player_id": 41,
						"first_name": "Graves",
						"second_name": "Rojas",
						"team": "raiders",
						"yellow_cards": 4,
						"red_cards": 0,
						"goals": 4,
						"captain": false
		    },
					{
						"player_id": 42,
						"first_name": "Colette",
						"second_name": "Blair",
						"team": "raiders",
						"yellow_cards": 2,
						"red_cards": 2,
						"goals": 5,
						"captain": false
		    },
					{
						"player_id": 43,
						"first_name": "Stokes",
						"second_name": "Faulkner",
						"team": "raiders",
						"yellow_cards": 1,
						"red_cards": 2,
						"goals": 1,
						"captain": false
		    },
					{
						"player_id": 44,
						"first_name": "Cassandra",
						"second_name": "Conrad",
						"team": "raiders",
						"yellow_cards": 2,
						"red_cards": 1,
						"goals": 10,
						"captain": false
		    },
					{
						"player_id": 45,
						"first_name": "Carly",
						"second_name": "Clarke",
						"team": "raiders",
						"yellow_cards": 2,
						"red_cards": 2,
						"goals": 6,
						"captain": false
		    },
					{
						"player_id": 46,
						"first_name": "Best",
						"second_name": "Cain",
						"team": "raiders",
						"yellow_cards": 2,
						"red_cards": 0,
						"goals": 0,
						"captain": true
		    },
					{
						"player_id": 47,
						"first_name": "Beverley",
						"second_name": "Knowles",
						"team": "raiders",
						"yellow_cards": 0,
						"red_cards": 1,
						"goals": 1,
						"captain": false
		    },
					{
						"player_id": 48,
						"first_name": "Wheeler",
						"second_name": "Sampson",
						"team": "raiders",
						"yellow_cards": 2,
						"red_cards": 0,
						"goals": 2,
						"captain": false
		    },
					{
						"player_id": 49,
						"first_name": "Shari",
						"second_name": "Roth",
						"team": "raiders",
						"yellow_cards": 4,
						"red_cards": 1,
						"goals": 12,
						"captain": false
		    },
					{
						"player_id": 50,
						"first_name": "Helga",
						"second_name": "Campos",
						"team": "sandcrawlers",
						"yellow_cards": 1,
						"red_cards": 0,
						"goals": 2,
						"captain": false
		    },
					{
						"player_id": 51,
						"first_name": "Hendricks",
						"second_name": "Mercer",
						"team": "sandcrawlers",
						"yellow_cards": 1,
						"red_cards": 1,
						"goals": 1,
						"captain": true
		    },
					{
						"player_id": 52,
						"first_name": "Iva",
						"second_name": "Mcdowell",
						"team": "sandcrawlers",
						"yellow_cards": 1,
						"red_cards": 2,
						"goals": 6,
						"captain": false
		    },
					{
						"player_id": 53,
						"first_name": "Miles",
						"second_name": "Donaldson",
						"team": "sandcrawlers",
						"yellow_cards": 3,
						"red_cards": 2,
						"goals": 5,
						"captain": false
		    },
					{
						"player_id": 54,
						"first_name": "Lane",
						"second_name": "Hatfield",
						"team": "sandcrawlers",
						"yellow_cards": 3,
						"red_cards": 1,
						"goals": 11,
						"captain": false
		    },
					{
						"player_id": 55,
						"first_name": "Padilla",
						"second_name": "Mccormick",
						"team": "sandcrawlers",
						"yellow_cards": 2,
						"red_cards": 1,
						"goals": 8,
						"captain": false
		    },
					{
						"player_id": 56,
						"first_name": "Barbra",
						"second_name": "Merritt",
						"team": "sandcrawlers",
						"yellow_cards": 0,
						"red_cards": 2,
						"goals": 4,
						"captain": false
		    },
					{
						"player_id": 57,
						"first_name": "Hollie",
						"second_name": "Norman",
						"team": "sandcrawlers",
						"yellow_cards": 3,
						"red_cards": 0,
						"goals": 3,
						"captain": false
		    },
					{
						"player_id": 58,
						"first_name": "Tracie",
						"second_name": "Nguyen",
						"team": "sandcrawlers",
						"yellow_cards": 2,
						"red_cards": 2,
						"goals": 10,
						"captain": false
		    },
					{
						"player_id": 59,
						"first_name": "Marcia",
						"second_name": "Martinez",
						"team": "sandcrawlers",
						"yellow_cards": 2,
						"red_cards": 2,
						"goals": 6,
						"captain": false
		    },
					{
						"player_id": 60,
						"first_name": "Langley",
						"second_name": "Justice",
						"team": "wampas",
						"yellow_cards": 3,
						"red_cards": 1,
						"goals": 1,
						"captain": false
		    },
					{
						"player_id": 61,
						"first_name": "Leanne",
						"second_name": "Tanner",
						"team": "wampas",
						"yellow_cards": 2,
						"red_cards": 1,
						"goals": 9,
						"captain": false
		    },
					{
						"player_id": 62,
						"first_name": "Kaitlin",
						"second_name": "Stout",
						"team": "wampas",
						"yellow_cards": 3,
						"red_cards": 0,
						"goals": 7,
						"captain": false
		    },
					{
						"player_id": 63,
						"first_name": "Suzanne",
						"second_name": "Ashley",
						"team": "wampas",
						"yellow_cards": 0,
						"red_cards": 0,
						"goals": 6,
						"captain": false
		    },
					{
						"player_id": 64,
						"first_name": "Wilkinson",
						"second_name": "Lyons",
						"team": "wampas",
						"yellow_cards": 0,
						"red_cards": 0,
						"goals": 4,
						"captain": false
		    },
					{
						"player_id": 65,
						"first_name": "Acevedo",
						"second_name": "Hess",
						"team": "wampas",
						"yellow_cards": 4,
						"red_cards": 2,
						"goals": 11,
						"captain": true
		    },
					{
						"player_id": 66,
						"first_name": "Cantrell",
						"second_name": "Diaz",
						"team": "wampas",
						"yellow_cards": 3,
						"red_cards": 2,
						"goals": 5,
						"captain": false
		    },
					{
						"player_id": 67,
						"first_name": "Rene",
						"second_name": "Bailey",
						"team": "wampas",
						"yellow_cards": 2,
						"red_cards": 1,
						"goals": 2,
						"captain": false
		    },
					{
						"player_id": 68,
						"first_name": "Joy",
						"second_name": "Mckenzie",
						"team": "wampas",
						"yellow_cards": 0,
						"red_cards": 1,
						"goals": 6,
						"captain": false
		    },
					{
						"player_id": 69,
						"first_name": "Golden",
						"second_name": "Walls",
						"team": "wampas",
						"yellow_cards": 1,
						"red_cards": 0,
						"goals": 6,
						"captain": false
		    }
		  ],
				teams: [
					{
						"name": "admirals",
						"photo": "img/admirals.jpg",
						"logo": "img/admirals_logo.jpg",
						"manager": "Phelps Steele",
						"wins": [
							{
								"date": "2018-03-25",
								"goals_in_favor": 9,
								"goals_against": 1
		        },
							{
								"date": "2018-05-11",
								"goals_in_favor": 5,
								"goals_against": 1
		        },
							{
								"date": "2018-07-11",
								"goals_in_favor": 7,
								"goals_against": 3
		        },
							{
								"date": "2018-11-17",
								"goals_in_favor": 4,
								"goals_against": 1
		        },
							{
								"date": "2018-12-17",
								"goals_in_favor": 9,
								"goals_against": 3
		        },
							{
								"date": "2018-08-29",
								"goals_in_favor": 7,
								"goals_against": 1
		        },
							{
								"date": "2018-12-18",
								"goals_in_favor": 9,
								"goals_against": 2
		        },
							{
								"date": "2018-02-16",
								"goals_in_favor": 9,
								"goals_against": 1
		        },
							{
								"date": "2018-04-30",
								"goals_in_favor": 8,
								"goals_against": 3
		        },
							{
								"date": "2018-07-16",
								"goals_in_favor": 8,
								"goals_against": 1
		        }
		      ],
						"losses": [
							{
								"date": "2018-11-17",
								"goals_in_favor": 3,
								"goals_against": 4
		        }
		      ],
						"ties": [
							{
								"date": "2018-10-08",
								"goals_in_favor": 4,
								"goals_against": 1
		        },
							{
								"date": "2018-08-28",
								"goals_in_favor": 2,
								"goals_against": 5
		        },
							{
								"date": "2018-10-04",
								"goals_in_favor": 1,
								"goals_against": 7
		        },
							{
								"date": "2018-02-06",
								"goals_in_favor": 2,
								"goals_against": 6
		        },
							{
								"date": "2018-10-28",
								"goals_in_favor": 3,
								"goals_against": 5
		        },
							{
								"date": "2018-06-01",
								"goals_in_favor": 3,
								"goals_against": 5
		        }
		      ]
		    },
					{
						"name": "chiefs",
						"photo": "img/chiefs.jpg",
						"logo": "img/chiefs_logo.jpg",
						"manager": "Beck Roach",
						"wins": [
							{
								"date": "2018-06-29",
								"goals_in_favor": 6,
								"goals_against": 2
		        },
							{
								"date": "2018-07-17",
								"goals_in_favor": 5,
								"goals_against": 1
		        },
							{
								"date": "2018-02-04",
								"goals_in_favor": 9,
								"goals_against": 3
		        },
							{
								"date": "2018-09-23",
								"goals_in_favor": 5,
								"goals_against": 3
		        },
							{
								"date": "2018-01-11",
								"goals_in_favor": 6,
								"goals_against": 2
		        },
							{
								"date": "2018-10-10",
								"goals_in_favor": 6,
								"goals_against": 2
		        }
		      ],
						"losses": [
							{
								"date": "2018-05-05",
								"goals_in_favor": 1,
								"goals_against": 4
		        },
							{
								"date": "2018-03-24",
								"goals_in_favor": 3,
								"goals_against": 4
		        },
							{
								"date": "2018-12-08",
								"goals_in_favor": 3,
								"goals_against": 7
		        },
							{
								"date": "2018-02-22",
								"goals_in_favor": 2,
								"goals_against": 6
		        },
							{
								"date": "2018-07-01",
								"goals_in_favor": 3,
								"goals_against": 7
		        },
							{
								"date": "2018-06-24",
								"goals_in_favor": 1,
								"goals_against": 6
		        },
							{
								"date": "2018-12-20",
								"goals_in_favor": 1,
								"goals_against": 6
		        },
							{
								"date": "2018-08-06",
								"goals_in_favor": 2,
								"goals_against": 6
		        },
							{
								"date": "2018-11-22",
								"goals_in_favor": 3,
								"goals_against": 6
		        }
		      ],
						"ties": [
							{
								"date": "2018-06-17",
								"goals_in_favor": 3,
								"goals_against": 2
		        },
							{
								"date": "2018-01-06",
								"goals_in_favor": 2,
								"goals_against": 3
		        }
		      ]
		    },
					{
						"name": "droids",
						"photo": "img/droids.jpg",
						"logo": "img/droids_logo.jpg",
						"manager": "Nell Goodman",
						"wins": [
							{
								"date": "2018-05-07",
								"goals_in_favor": 6,
								"goals_against": 1
		        },
							{
								"date": "2018-02-09",
								"goals_in_favor": 9,
								"goals_against": 1
		        },
							{
								"date": "2018-10-26",
								"goals_in_favor": 4,
								"goals_against": 3
		        },
							{
								"date": "2018-01-08",
								"goals_in_favor": 5,
								"goals_against": 1
		        },
							{
								"date": "2018-07-24",
								"goals_in_favor": 6,
								"goals_against": 2
		        },
							{
								"date": "2018-05-25",
								"goals_in_favor": 6,
								"goals_against": 1
		        },
							{
								"date": "2018-07-22",
								"goals_in_favor": 4,
								"goals_against": 2
		        },
							{
								"date": "2018-01-18",
								"goals_in_favor": 7,
								"goals_against": 3
		        },
							{
								"date": "2018-12-15",
								"goals_in_favor": 4,
								"goals_against": 1
		        },
							{
								"date": "2018-08-26",
								"goals_in_favor": 9,
								"goals_against": 3
		        },
							{
								"date": "2018-11-09",
								"goals_in_favor": 9,
								"goals_against": 2
		        }
		      ],
						"losses": [
							{
								"date": "2018-07-30",
								"goals_in_favor": 2,
								"goals_against": 4
		        },
							{
								"date": "2018-01-07",
								"goals_in_favor": 2,
								"goals_against": 6
		        },
							{
								"date": "2018-01-17",
								"goals_in_favor": 1,
								"goals_against": 5
		        },
							{
								"date": "2018-01-06",
								"goals_in_favor": 2,
								"goals_against": 4
		        }
		      ],
						"ties": [
							{
								"date": "2018-03-07",
								"goals_in_favor": 5,
								"goals_against": 5
		        },
							{
								"date": "2018-05-09",
								"goals_in_favor": 2,
								"goals_against": 4
		        }
		      ]
		    },
					{
						"name": "emperors",
						"photo": "img/emperors.jpg",
						"logo": "img/emperors_logo.jpg",
						"manager": "Anthony Barnett",
						"wins": [
							{
								"date": "2018-07-05",
								"goals_in_favor": 7,
								"goals_against": 1
		        },
							{
								"date": "2018-01-17",
								"goals_in_favor": 4,
								"goals_against": 1
		        },
							{
								"date": "2018-10-31",
								"goals_in_favor": 8,
								"goals_against": 2
		        },
							{
								"date": "2018-03-10",
								"goals_in_favor": 4,
								"goals_against": 2
		        },
							{
								"date": "2018-05-19",
								"goals_in_favor": 7,
								"goals_against": 2
		        },
							{
								"date": "2018-08-23",
								"goals_in_favor": 5,
								"goals_against": 1
		        },
							{
								"date": "2018-05-18",
								"goals_in_favor": 9,
								"goals_against": 2
		        },
							{
								"date": "2018-07-12",
								"goals_in_favor": 9,
								"goals_against": 3
		        }
		      ],
						"losses": [
							{
								"date": "2018-03-27",
								"goals_in_favor": 2,
								"goals_against": 4
		        },
							{
								"date": "2018-06-09",
								"goals_in_favor": 2,
								"goals_against": 5
		        },
							{
								"date": "2018-07-30",
								"goals_in_favor": 1,
								"goals_against": 5
		        },
							{
								"date": "2018-02-01",
								"goals_in_favor": 2,
								"goals_against": 6
		        },
							{
								"date": "2018-01-31",
								"goals_in_favor": 3,
								"goals_against": 5
		        },
							{
								"date": "2018-01-09",
								"goals_in_favor": 1,
								"goals_against": 6
		        },
							{
								"date": "2018-05-26",
								"goals_in_favor": 3,
								"goals_against": 7
		        }
		      ],
						"ties": [
							{
								"date": "2018-06-25",
								"goals_in_favor": 3,
								"goals_against": 1
		        },
							{
								"date": "2018-04-05",
								"goals_in_favor": 3,
								"goals_against": 1
		        },
							{
								"date": "2018-03-11",
								"goals_in_favor": 4,
								"goals_against": 4
		        }
		      ]
		    },
					{
						"name": "raiders",
						"photo": "img/raiders.jpg",
						"logo": "img/raiders_logo.jpg",
						"manager": "Hopkins Patton",
						"wins": [
							{
								"date": "2018-01-09",
								"goals_in_favor": 7,
								"goals_against": 3
		        },
							{
								"date": "2018-01-31",
								"goals_in_favor": 9,
								"goals_against": 1
		        },
							{
								"date": "2019-01-07",
								"goals_in_favor": 5,
								"goals_against": 3
		        },
							{
								"date": "2018-12-17",
								"goals_in_favor": 6,
								"goals_against": 2
		        },
							{
								"date": "2018-01-11",
								"goals_in_favor": 9,
								"goals_against": 2
		        },
							{
								"date": "2018-05-15",
								"goals_in_favor": 5,
								"goals_against": 2
		        },
							{
								"date": "2018-11-07",
								"goals_in_favor": 7,
								"goals_against": 3
		        },
							{
								"date": "2018-05-14",
								"goals_in_favor": 9,
								"goals_against": 2
		        }
		      ],
						"losses": [
							{
								"date": "2019-01-15",
								"goals_in_favor": 3,
								"goals_against": 5
		        },
							{
								"date": "2019-01-13",
								"goals_in_favor": 3,
								"goals_against": 6
		        },
							{
								"date": "2018-10-29",
								"goals_in_favor": 2,
								"goals_against": 4
		        },
							{
								"date": "2018-05-25",
								"goals_in_favor": 1,
								"goals_against": 7
		        },
							{
								"date": "2018-07-17",
								"goals_in_favor": 3,
								"goals_against": 5
		        },
							{
								"date": "2018-06-19",
								"goals_in_favor": 2,
								"goals_against": 7
		        },
							{
								"date": "2018-02-17",
								"goals_in_favor": 2,
								"goals_against": 4
		        },
							{
								"date": "2018-10-10",
								"goals_in_favor": 3,
								"goals_against": 7
		        },
							{
								"date": "2018-03-24",
								"goals_in_favor": 3,
								"goals_against": 5
		        },
							{
								"date": "2018-03-29",
								"goals_in_favor": 2,
								"goals_against": 6
		        }
		      ],
						"ties": [{}]
		    },
					{
						"name": "sandcrawlers",
						"photo": "img/sandcrawlers.jpg",
						"logo": "img/sandcrawlers_logo.jpg",
						"manager": "Zimmerman Morrison",
						"wins": [
							{
								"date": "2018-03-01",
								"goals_in_favor": 4,
								"goals_against": 2
		        },
							{
								"date": "2018-06-12",
								"goals_in_favor": 7,
								"goals_against": 1
		        },
							{
								"date": "2018-08-14",
								"goals_in_favor": 7,
								"goals_against": 2
		        },
							{
								"date": "2018-06-15",
								"goals_in_favor": 8,
								"goals_against": 3
		        },
							{
								"date": "2018-07-01",
								"goals_in_favor": 8,
								"goals_against": 3
		        },
							{
								"date": "2018-03-07",
								"goals_in_favor": 8,
								"goals_against": 1
		        },
							{
								"date": "2018-11-09",
								"goals_in_favor": 7,
								"goals_against": 3
		        },
							{
								"date": "2018-08-26",
								"goals_in_favor": 6,
								"goals_against": 3
		        },
							{
								"date": "2018-07-24",
								"goals_in_favor": 4,
								"goals_against": 3
		        }
		      ],
						"losses": [
							{
								"date": "2018-09-10",
								"goals_in_favor": 1,
								"goals_against": 7
		        },
							{
								"date": "2018-09-12",
								"goals_in_favor": 1,
								"goals_against": 6
		        },
							{
								"date": "2018-04-08",
								"goals_in_favor": 3,
								"goals_against": 7
		        },
							{
								"date": "2018-02-23",
								"goals_in_favor": 2,
								"goals_against": 6
		        },
							{
								"date": "2018-01-17",
								"goals_in_favor": 1,
								"goals_against": 6
		        },
							{
								"date": "2018-02-02",
								"goals_in_favor": 3,
								"goals_against": 7
		        }
		      ],
						"ties": [
							{
								"date": "2018-08-14",
								"goals_in_favor": 1,
								"goals_against": 4
		        },
							{
								"date": "2018-06-13",
								"goals_in_favor": 4,
								"goals_against": 3
		        }
		      ]
		    },
					{
						"name": "wampas",
						"photo": "img/wampas.jpg",
						"logo": "img/wampas_logo.jpg",
						"manager": "Teresa Harding",
						"wins": [
							{
								"date": "2018-07-13",
								"goals_in_favor": 4,
								"goals_against": 3
		        },
							{
								"date": "2018-03-03",
								"goals_in_favor": 8,
								"goals_against": 1
		        },
							{
								"date": "2018-09-17",
								"goals_in_favor": 6,
								"goals_against": 3
		        },
							{
								"date": "2019-01-08",
								"goals_in_favor": 6,
								"goals_against": 2
		        },
							{
								"date": "2018-05-08",
								"goals_in_favor": 7,
								"goals_against": 1
		        },
							{
								"date": "2018-12-22",
								"goals_in_favor": 9,
								"goals_against": 2
		        },
							{
								"date": "2018-01-22",
								"goals_in_favor": 5,
								"goals_against": 3
		        },
							{
								"date": "2018-05-16",
								"goals_in_favor": 4,
								"goals_against": 3
		        }
		      ],
						"losses": [
							{
								"date": "2018-01-18",
								"goals_in_favor": 1,
								"goals_against": 4
		        },
							{
								"date": "2018-07-05",
								"goals_in_favor": 3,
								"goals_against": 7
		        },
							{
								"date": "2018-01-19",
								"goals_in_favor": 2,
								"goals_against": 7
		        },
							{
								"date": "2018-12-21",
								"goals_in_favor": 2,
								"goals_against": 4
		        },
							{
								"date": "2018-07-20",
								"goals_in_favor": 3,
								"goals_against": 4
		        },
							{
								"date": "2018-06-23",
								"goals_in_favor": 2,
								"goals_against": 5
		        },
							{
								"date": "2018-08-22",
								"goals_in_favor": 1,
								"goals_against": 5
		        },
							{
								"date": "2018-03-03",
								"goals_in_favor": 2,
								"goals_against": 5
		        }
		      ],
						"ties": [
							{
								"date": "2018-07-24",
								"goals_in_favor": 2,
								"goals_against": 3
		        }
		      ]
		    }
		  ],
				schedule: [
					{
						"date": "2018-09-28",
						"time": "11:54",
						"team1": "droids",
						"team2": "emperors",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-11-24",
						"time": "18:34",
						"team1": "wampas",
						"team2": "raiders",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2018-11-26",
						"time": "03:40",
						"team1": "raiders",
						"team2": "emperors",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-10-16",
						"time": "10:16",
						"team1": "sandcrawlers",
						"team2": "wampas",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-09-04",
						"time": "21:54",
						"team1": "wampas",
						"team2": "admirals",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-10-11",
						"time": "14:49",
						"team1": "sandcrawlers",
						"team2": "droids",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2018-12-30",
						"time": "12:41",
						"team1": "admirals",
						"team2": "raiders",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-10-09",
						"time": "00:53",
						"team1": "admirals",
						"team2": "droids",
						"location": "North Elementary"
		    },
					{
						"date": "2019-01-08",
						"time": "18:06",
						"team1": "raiders",
						"team2": "droids",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-10-23",
						"time": "22:04",
						"team1": "droids",
						"team2": "emperors",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2019-01-01",
						"time": "19:15",
						"team1": "chiefs",
						"team2": "droids",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2019-01-08",
						"time": "17:41",
						"team1": "chiefs",
						"team2": "emperors",
						"location": "South Elementary"
		    },
					{
						"date": "2018-09-12",
						"time": "09:40",
						"team1": "droids",
						"team2": "raiders",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2018-11-29",
						"time": "09:04",
						"team1": "raiders",
						"team2": "chiefs",
						"location": "South Elementary"
		    },
					{
						"date": "2018-10-20",
						"time": "15:24",
						"team1": "admirals",
						"team2": "sandcrawlers",
						"location": "North Elementary"
		    },
					{
						"date": "2018-09-16",
						"time": "22:08",
						"team1": "chiefs",
						"team2": "wampas",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-11-05",
						"time": "12:39",
						"team1": "sandcrawlers",
						"team2": "chiefs",
						"location": "South Elementary"
		    },
					{
						"date": "2018-11-02",
						"time": "23:24",
						"team1": "raiders",
						"team2": "chiefs",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-12-14",
						"time": "02:16",
						"team1": "raiders",
						"team2": "droids",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-11-18",
						"time": "11:42",
						"team1": "emperors",
						"team2": "sandcrawlers",
						"location": "South Elementary"
		    },
					{
						"date": "2018-11-23",
						"time": "00:27",
						"team1": "raiders",
						"team2": "emperors",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-11-14",
						"time": "20:15",
						"team1": "chiefs",
						"team2": "emperors",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-09-07",
						"time": "01:22",
						"team1": "admirals",
						"team2": "raiders",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-11-24",
						"time": "09:10",
						"team1": "raiders",
						"team2": "chiefs",
						"location": "South Elementary"
		    },
					{
						"date": "2018-10-01",
						"time": "21:01",
						"team1": "droids",
						"team2": "raiders",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-12-27",
						"time": "14:02",
						"team1": "sandcrawlers",
						"team2": "emperors",
						"location": "South Elementary"
		    },
					{
						"date": "2018-11-01",
						"time": "00:16",
						"team1": "sandcrawlers",
						"team2": "raiders",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-11-13",
						"time": "04:06",
						"team1": "admirals",
						"team2": "raiders",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-11-09",
						"time": "19:37",
						"team1": "wampas",
						"team2": "emperors",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-11-30",
						"time": "19:03",
						"team1": "raiders",
						"team2": "sandcrawlers",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-09-17",
						"time": "12:00",
						"team1": "sandcrawlers",
						"team2": "emperors",
						"location": "North Elementary"
		    },
					{
						"date": "2018-09-10",
						"time": "15:45",
						"team1": "sandcrawlers",
						"team2": "raiders",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2019-01-01",
						"time": "17:33",
						"team1": "chiefs",
						"team2": "emperors",
						"location": "North Elementary"
		    },
					{
						"date": "2018-09-25",
						"time": "20:19",
						"team1": "wampas",
						"team2": "sandcrawlers",
						"location": "North Elementary"
		    },
					{
						"date": "2018-12-25",
						"time": "17:39",
						"team1": "admirals",
						"team2": "droids",
						"location": "North Elementary"
		    },
					{
						"date": "2018-09-28",
						"time": "02:22",
						"team1": "wampas",
						"team2": "emperors",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2018-12-19",
						"time": "18:08",
						"team1": "emperors",
						"team2": "droids",
						"location": "South Elementary"
		    },
					{
						"date": "2018-09-30",
						"time": "00:17",
						"team1": "droids",
						"team2": "emperors",
						"location": "South Elementary"
		    },
					{
						"date": "2018-12-01",
						"time": "19:40",
						"team1": "admirals",
						"team2": "droids",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-12-20",
						"time": "13:45",
						"team1": "raiders",
						"team2": "admirals",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-11-30",
						"time": "10:05",
						"team1": "sandcrawlers",
						"team2": "droids",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-09-20",
						"time": "01:10",
						"team1": "admirals",
						"team2": "emperors",
						"location": "North Elementary"
		    },
					{
						"date": "2018-12-02",
						"time": "05:18",
						"team1": "sandcrawlers",
						"team2": "raiders",
						"location": "South Elementary"
		    },
					{
						"date": "2018-10-21",
						"time": "14:25",
						"team1": "emperors",
						"team2": "wampas",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-10-10",
						"time": "03:17",
						"team1": "droids",
						"team2": "chiefs",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-11-11",
						"time": "20:53",
						"team1": "droids",
						"team2": "chiefs",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-09-04",
						"time": "20:42",
						"team1": "raiders",
						"team2": "wampas",
						"location": "North Elementary"
		    },
					{
						"date": "2018-11-18",
						"time": "02:00",
						"team1": "chiefs",
						"team2": "wampas",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-09-27",
						"time": "08:57",
						"team1": "admirals",
						"team2": "droids",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-11-25",
						"time": "03:53",
						"team1": "admirals",
						"team2": "raiders",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2019-01-16",
						"time": "18:32",
						"team1": "admirals",
						"team2": "chiefs",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-12-28",
						"time": "09:45",
						"team1": "droids",
						"team2": "chiefs",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-10-16",
						"time": "18:22",
						"team1": "raiders",
						"team2": "emperors",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-11-27",
						"time": "23:37",
						"team1": "admirals",
						"team2": "wampas",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-09-01",
						"time": "02:00",
						"team1": "chiefs",
						"team2": "sandcrawlers",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-11-09",
						"time": "01:30",
						"team1": "droids",
						"team2": "chiefs",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-11-24",
						"time": "20:56",
						"team1": "sandcrawlers",
						"team2": "droids",
						"location": "South Elementary"
		    },
					{
						"date": "2018-09-21",
						"time": "00:39",
						"team1": "emperors",
						"team2": "droids",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-12-05",
						"time": "01:40",
						"team1": "wampas",
						"team2": "raiders",
						"location": "South Elementary"
		    },
					{
						"date": "2018-10-03",
						"time": "01:07",
						"team1": "sandcrawlers",
						"team2": "raiders",
						"location": "North Elementary"
		    },
					{
						"date": "2018-10-23",
						"time": "05:14",
						"team1": "chiefs",
						"team2": "raiders",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-09-12",
						"time": "00:30",
						"team1": "chiefs",
						"team2": "wampas",
						"location": "South Elementary"
		    },
					{
						"date": "2019-01-12",
						"time": "01:40",
						"team1": "droids",
						"team2": "emperors",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2018-12-20",
						"time": "16:56",
						"team1": "wampas",
						"team2": "emperors",
						"location": "South Elementary"
		    },
					{
						"date": "2019-01-06",
						"time": "10:53",
						"team1": "wampas",
						"team2": "admirals",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-11-05",
						"time": "05:28",
						"team1": "chiefs",
						"team2": "droids",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-10-11",
						"time": "18:31",
						"team1": "wampas",
						"team2": "raiders",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2019-01-01",
						"time": "21:17",
						"team1": "admirals",
						"team2": "raiders",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2018-09-15",
						"time": "02:24",
						"team1": "chiefs",
						"team2": "wampas",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-12-20",
						"time": "09:33",
						"team1": "sandcrawlers",
						"team2": "raiders",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-10-22",
						"time": "13:53",
						"team1": "admirals",
						"team2": "sandcrawlers",
						"location": "North Elementary"
		    },
					{
						"date": "2018-11-16",
						"time": "04:47",
						"team1": "chiefs",
						"team2": "admirals",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-10-28",
						"time": "20:38",
						"team1": "droids",
						"team2": "emperors",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-11-14",
						"time": "15:37",
						"team1": "sandcrawlers",
						"team2": "raiders",
						"location": "South Elementary"
		    },
					{
						"date": "2018-12-23",
						"time": "18:12",
						"team1": "emperors",
						"team2": "admirals",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2018-11-29",
						"time": "07:06",
						"team1": "sandcrawlers",
						"team2": "raiders",
						"location": "North Elementary"
		    },
					{
						"date": "2018-09-08",
						"time": "20:29",
						"team1": "raiders",
						"team2": "chiefs",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-11-22",
						"time": "10:57",
						"team1": "emperors",
						"team2": "raiders",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2019-01-08",
						"time": "13:36",
						"team1": "emperors",
						"team2": "droids",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2018-12-25",
						"time": "13:04",
						"team1": "droids",
						"team2": "wampas",
						"location": "South Elementary"
		    },
					{
						"date": "2018-11-29",
						"time": "19:57",
						"team1": "droids",
						"team2": "admirals",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-11-24",
						"time": "01:30",
						"team1": "admirals",
						"team2": "wampas",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2019-01-07",
						"time": "15:19",
						"team1": "admirals",
						"team2": "emperors",
						"location": "North Elementary"
		    },
					{
						"date": "2019-01-06",
						"time": "17:50",
						"team1": "raiders",
						"team2": "sandcrawlers",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-10-18",
						"time": "15:43",
						"team1": "raiders",
						"team2": "sandcrawlers",
						"location": "South Elementary"
		    },
					{
						"date": "2018-10-18",
						"time": "14:48",
						"team1": "chiefs",
						"team2": "droids",
						"location": "Marjorie P. Hart Elementary"
		    },
					{
						"date": "2018-11-24",
						"time": "14:24",
						"team1": "wampas",
						"team2": "sandcrawlers",
						"location": "AJ Katzenmaier Elementary"
		    },
					{
						"date": "2018-10-09",
						"time": "23:16",
						"team1": "sandcrawlers",
						"team2": "droids",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2019-01-15",
						"time": "20:01",
						"team1": "chiefs",
						"team2": "raiders",
						"location": "North Elementary"
		    },
					{
						"date": "2018-09-24",
						"time": "00:32",
						"team1": "raiders",
						"team2": "droids",
						"location": "South Elementary"
		    },
					{
						"date": "2018-11-10",
						"time": "17:01",
						"team1": "wampas",
						"team2": "raiders",
						"location": "South Elementary"
		    },
					{
						"date": "2018-10-19",
						"time": "23:34",
						"team1": "wampas",
						"team2": "droids",
						"location": "North Elementary"
		    },
					{
						"date": "2018-10-22",
						"time": "18:23",
						"team1": "admirals",
						"team2": "emperors",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2018-10-15",
						"time": "16:07",
						"team1": "raiders",
						"team2": "emperors",
						"location": "South Elementary"
		    },
					{
						"date": "2018-11-09",
						"time": "00:15",
						"team1": "droids",
						"team2": "raiders",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2019-01-03",
						"time": "20:52",
						"team1": "admirals",
						"team2": "droids",
						"location": "South Elementary"
		    },
					{
						"date": "2018-12-16",
						"time": "23:33",
						"team1": "raiders",
						"team2": "emperors",
						"location": "Greenbay Elementary"
		    },
					{
						"date": "2019-01-13",
						"time": "01:50",
						"team1": "wampas",
						"team2": "chiefs",
						"location": "South Elementary"
		    },
					{
						"date": "2018-11-26",
						"time": "05:20",
						"team1": "chiefs",
						"team2": "raiders",
						"location": "Howard A. Yeager Elementary"
		    },
					{
						"date": "2018-11-02",
						"time": "18:31",
						"team1": "sandcrawlers",
						"team2": "wampas",
						"location": "Greenbay Elementary"
		    }
		  ],
				maps: [
					{
						"name": "katzenmaier",
						"address": "24 W. Walton St., Chicago, IL 6061",
						"frame": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2165.118492508806!2d-87.63092258908124!3d41.90032115714603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34e07f69da7%3A0x15e198c063fc787c!2sAJ+Katzenmaier+Elementary!5e0!3m2!1sen!2ses!4v1542890272144"
		    },
					{
						"name": "greenbay",
						"address": "1734 N. Orleans St., Chicago, IL 60614",
						"frame": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.022795992249!2d-87.64002218489757!3d41.91386867115462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3407260c45b%3A0xb351205fae50c6f3!2sGreenbay+Elementary!5e0!3m2!1sen!2ses!4v1542890628456"
		    },
					{
						"name": "howard",
						"address": "2245 N. Southport Ave., Chicago, IL 60614",
						"frame": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378805.97367068974!2d-88.03859259955114!3d42.1198553540001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2e37f852467%3A0xb6cb22b2f0358874!2sHoward+A+Yeager+Elementary!5e0!3m2!1sen!2ses!4v1542890741658"
		    },
					{
						"name": "marjorie",
						"address": "2625 N. Orchand St., Chicago, IL 60614",
						"frame": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378753.9213757168!2d-88.02602058880525!3d42.128561885599304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd30f2637f9d7%3A0xdbff5d5dfcfcfa35!2sMarjorie+P+Hart+Elementary!5e0!3m2!1sen!2ses!4v1542890828850"
		    },
					{
						"name": "north",
						"address": "1409 N. Ogden Ave., Chicago, IL 60610",
						"frame": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.335832778051!2d-87.64833373489782!3d41.90713877157602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33af14860a5%3A0x5736e62f19086c62!2sNorth+Elementary!5e0!3m2!1sen!2ses!4v1542890907587"
		    },
					{
						"name": "south",
						"address": "2101 N. Fremont St., Chicago, IL 60614",
						"frame": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20359.994773891158!2d-87.66235002008013!3d41.91832756198644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3196e269cbf%3A0x1caabcbc4893f0da!2sSt+James+Lutheran+School!5e0!3m2!1sen!2ses!4v1542890976968"
		    }
		  ]
//		players: [],
//		teams: [],
//		schedule: [],
//		maps: []
	},
	created() {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				document.getElementById("login").checked = true;
				console.log('SignIn successfull');
				document.getElementById("logInOut").innerHTML = 'Log Out';
			} else {
				document.getElementById("login").checked = false;
				console.log('SignOut successful');
				document.getElementById("logInOut").innerHTML = 'Log In';
			}
		});
	},

	methods: {
//		getData: function () {
//			fetch(url, {
//				method: 'GET',
//				headers: {
//					X-Firebase-Decoding: 1 //This workaround is temporary. An update expected in February 2019 will resolve issues with parsing URLs in query parameters.
//				}
//			}).then(function (response) {
//				if (response.ok) {
//					return response.json();
//				}
//				throw new Error('Network response was not ok.');
//			}).then(function (value) {
//				app.players = alue.players;
//				app.teams = value.teams;
//				app.schedule = value.schedule;
//				app.maps = value.maps;
//			}).catch(function (value) {
//				console.log(value);
//				alert('There was a problem fetching the data from Firebase');
//			})
//
//
//		}, //getData end

		capitalShow: function (arg) {
			return arg.toUpperCase();
		},
		seen: function (arg, argTeam) {
			this.show = arg;
			this.activeTeam = argTeam;
			console.log('El app.activeTeam es: ' + this.activeTeam);
			window.scrollTo(0, 0);
		},
		getMedia: function (arg1, arg2) {
			return this.teams[this.getTeamIndex(arg2)][arg1];
		},
		getTeamIndex: function (arg) {
			switch (arg) {
				case 'admirals':
					return 0;
					break;
				case 'chiefs':
					return 1;
					break;
				case 'droids':
					return 2;
					break;
				case 'emperors':
					return 3;
					break;
				case 'raiders':
					return 4;
					break;
				case 'sandcrawlers':
					return 5;
					break;
				case 'wampas':
					return 6;
					break;
				default:
					return null;
			}
		},
		goToVenue: function (arg1, arg2){
			this.show = arg1;
			this.locationCode = this.getVenueCode(arg2);
		},
		getVenueCode: function(arg){
			switch (arg) {
				case 'AJ Katzenmaier Elementary':
					return 'kat';
					break;
				case 'Greenbay Elementary':
					return 'gre';
					break;
				case 'Howard A. Yeager Elementary':
					return 'how';
					break;
				case 'Marjorie P. Hart Elementary':
					return 'mar';
					break;
				case 'North Elementary':
					return 'nor';
					break;
				case 'South Elementary':
					return 'sou';
					break;
				default:
					return null;
			}
		}
	},
	computed: {
		gameLocation: function () {
			switch (this.locationCode) {
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
		},
		schedule_F: function () {
			//		_F stands for Filtered
			return this.schedule.filter((arg) => {
				return (arg.team1 == this.activeTeam || arg.team2 == this.activeTeam);
			})
		}
	}
});

//app.getData();


// *****************--FIREBASE LIVE CHAT--********************
// *****************--FIREBASE LIVE CHAT--********************
// *****************--FIREBASE LIVE CHAT--********************

document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);

//getPosts();


function login() {
	// https://firebase.google.com/docs/auth/web/google-signin

	var provider = new firebase.auth.GoogleAuthProvider();
	//
	// How to Log In??
	//	Either with a popup window or redirection to the provider`s page:
	//	firebase.auth().signInWithPopup(provider);

	if (firebase.auth().currentUser == null) {
		//		alert('You are about to log in');
		//	document.getElementById("login").checked = false;

		firebase.auth().signInWithPopup(provider)
			.then(function (result) {
				//		document.getElementById("login").checked = true;
				//		console.log('SignIn successfull. Usuario logged In');
				//		document.getElementById("logInOut").innerHTML = 'Log Out';
				getPosts();
			})
			.catch(function (error) {
				//		document.getElementById("login").checked = false;
				//		checkedValue = document.getElementById("login").checked;			
				alert('SignIn failed... Try again');
			});
	} else {
		//			alert('You are about to log out');
		//		document.getElementById("login").checked = true;

		firebase.auth().signOut()
			.then(function () {
				// Sign-out successful.
				//		document.getElementById("login").checked = false;
				//		console.log('SignOut successful');
				//		document.getElementById("logInOut").innerHTML = 'Log In';
				document.getElementById("posts").innerHTML = "Log In to Start Live Chat";
			})
			.catch(function (error) {
				// An error happened.
				//		document.getElementById("login").checked = true;
				console.log('SignOut failed. You are still logged In!!');
			});
	}
}


function writeNewPost() {

	// https://firebase.google.com/docs/database/web/read-and-write

	var textToSend = document.getElementById("textInput").value;
	console.log(textToSend);
	// // Values
	var message = {
		message: textToSend,
		name: firebase.auth().currentUser.displayName
	};
	console.log(message);
	//
	//
	firebase.database().ref('NYSLchat').push(message);

	console.log("write");
	document.getElementById("textInput").value = "";

}


function getPosts() {

	firebase.database().ref('NYSLchat').on('value', function (data) {
		//
		var posts = document.getElementById("posts");
		posts.innerHTML = "";
		//		console.log('data.val() es:  ' + data.val());
		var messages = data.val();
		for (var key in messages) {
			var text = document.createElement("div");
			var element = messages[key];

			text.append(element.message);
			text.append(element.name);
			posts.append(text);
		}
		//
	});

	//	console.log("getting posts");

}









// *****************--JSON--********************
// *****************--JSON--********************
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
          captain: 'false'          
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
                return 'img/admirals.jpg';
                break;
             case 'chiefs':
                return 'img/chiefs.jpg';
                break;
             case 'droids':
                return 'img/droids.jpg';
                break;
             case 'emperors':
                return 'img/emperors.jpg';
                break;
             case 'raiders':
                return 'img/raiders.jpg';
                break;
             case 'sandcrawlers':
                return 'img/sandcrawlers.jpg';
                break;
             case 'wampas':
                return 'img/wampas.jpg';
                break;
             default:
                return 'error in the JSON geneator code';
            }
          },
           logo: function(tags, index){
            switch(this.name){
              case 'admirals':
                return 'img/admirals_logo.jpg';
                break;
             case 'chiefs':
                return 'img/chiefs_logo.jpg';
                break;
             case 'droids':
                return 'img/droids_logo.jpg';
                break;
             case 'emperors':
                return 'img/emperors_logo.jpg';
                break;
             case 'raiders':
                return 'img/raiders_logo.jpg';
                break;
             case 'sandcrawlers':
                return 'img/sandcrawlers_logo.jpg';
                break;
             case 'wampas':
                return 'img/wampas_logo.jpg';
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
              date: '{{date(new Date(2018, 8, 1), new Date(), "YYYY-MM-dd")}}',
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
