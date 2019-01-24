Vue.component('clubs-stats', {
	template: '<table class="w-100 table-striped text-center"><thead><tr><th>TEAM</th><th>PLAYED</th><th>W</th><th>L</th><th>T</th><th>POINTS</th></tr></thead><tbody><tr v-for="item in compTeams" :class="{success: (item.name == team1ToCheck) || (item.name == team2ToCheck)}"><td>{{ capitalize(item.name) }}</td><td>{{ sumPlayed(item) }}</td><td>{{ item.wins.length }}</td><td>{{ item.losses.length }}</td><td>{{ item.ties.length }}</td><td>{{sumPoints(item)}}</td></tr></tbody></table>',
	props: ['teams_props', 'team1_props', 'team2_props'],
	data: function () {
		return {
			compTeams: this.teams_props,
			//compActive_team: this.team1_props
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
		//		,
		//		compTeams_S: function () {
		//					//  _S stands for sort
		//			return this.compTeams.sort((a, b) => {
		//				return this.sumPoints(b) - this.sumPoints(a);
		//			});
		//		}
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
//*******************************************************
Vue.component('players-stats', {
	template: '<table class="w-100 table-striped table-hover text-center"><thead><tr><th>PLAYER</th><th>GOALS</th><th>YELLOW CARDS</th><th>RED CARDS</th><th>TEAM</th></tr></thead><tbody><tr v-for="item in compPlayers"><td>{{ item.first_name+ " " +item.second_name }}</td><td>{{ item.goals }}</td><td>{{ item.yellow_cards }}</td><td>{{ item.red_cards }}</td><td>{{ item.team }}</td></tr></tbody></table>',
	props: ['players_props'],
	data: function () {
		return {
			compPlayers: this.players_props
		}
	}
	//	,
	//	methods: {
	//		//   _S stands for sorted
	//		compPlayers_S: function () {
	//			return this.compPlayers.sort(function (a, b) {
	//				return b.goals - a.goals
	//			})
	//		}
	//	}
});
//*******************************************************
Vue.component('schedule-by-month', {
	template: `<div class="py-2 text-center"><p class="h6 my-2 text-center font-weight-lighter font-italic">Select a month to display games</p><button type="button" v-on:click="seen2('sep')" class="btn btn-outline-primary">SEP</button><button type="button" v-on:click="seen2('oct')" class="btn btn-outline-primary">OCT</button><button type="button" v-on:click="seen2('nov')" class="btn btn-outline-primary">NOV</button><button type="button" v-on:click="seen2('dec')" class="btn btn-outline-primary">DIC</button><button type="button" v-on:click="seen2('jan')" class="btn btn-outline-primary">JAN</button><p class="h6 mt-3 mb-0 text-center font-weight-lighter font-italic">Click on the match to see details</p><table class="w-100 table-striped table-hover text-center"><thead><tr><th>{{capitalShow(showMonth)}}</th><th>TEAMS</th><th>VENUE</th><th>TIME</th></tr></thead><tbody><tr v-for="item in compSchedule_F"  v-on:click="go(item)"><td>{{item.date}}</td><td>{{item.team1 + ' vs ' + item.team2}}</td><td>{{item.location}}</td><td>{{item.time}}</td></tr></tbody></table></div>`,
	props: ['schedule_props'],
	data: function () {
		return {
//			compSchedule: this.schedule_props,
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
			console.log(arg.date);
			console.log(arg.time);
			console.log('team1: ' + arg.team1);
			console.log('team2: ' + arg.team2);
			console.log(arg.location);
			app.show = 'my match';
			app.matchDate = arg;
		},
		capitalShow: function (arg) {
			return arg.toUpperCase();
		},
		seen2: function (arg) {
			this.showMonth = arg;
			window.scrollTo(0, 0);
		}
	},
	computed: {
		compSchedule: function(){
			return this.schedule_props;
		},
		compSchedule_F: function () {
			//		_F stands for Filtered(by month)

			return this.compSchedule.filter((arg) => {
				return (arg.date.substring(5, 7)) == this.monthCode[this.showMonth];
			})
		}
	}
	//		compSchedule_S_F: function () {
	//			return this.compSchedule.sort(function (a, b) {
	//				return new Date(a.date) - new Date(b.date)
	//			}).filter((arg) => {
	//				return (arg.date.substring(5, 7)) == this.monthCode[this.showMonth];
	//			})
	//		},
	//		compSchedule: function () {
	//			return this.schedule_props;
	//		}
	//	}
});
//**********The below component is not behaving properly: TeamIndex is not working properly as the switch statement is set for the sourced teams array instead of the sorte teams array************************************
Vue.component('team-members', {
	template: '<div class="overflow-auto border border-light overflow_dimensions"><dl><dt>MANAGER</dt><dd>{{getManager()}}</dd><dt>CAPTAIN</dt><dd>{{getCaptain()}}</dd><dt>PLAYERS</dt><dd v-for="item in getTeamMembers()">{{item}}</dd></dl></div>',
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
		},
		getManager: function () {
			for(var i=0 ; i<this.compTeams.length; i++){
				if(this.compTeams[i].name == this.compTeam){
					return this.compTeams[i].manager;
				}
			}
		}
	},
	computed: {
		compTeam: function () {
			return this.team_props;
		}
		
//		,
//		getTeamIndex: function () {
//			switch (this.compTeam) {
//				case 'admirals':
//					return 0;
//					break;
//				case 'chiefs':
//					return 1;
//					break;
//				case 'droids':
//					return 2;
//					break;
//				case 'emperors':
//					return 3;
//					break;
//				case 'raiders':
//					return 4;
//					break;
//				case 'sandcrawlers':
//					return 5;
//					break;
//				case 'wampas':
//					return 6;
//					break;
//				default:
//					return null;
//			}
//		}
		
	}
});
//*******************************************************
//Firebase url
//var url = "https://nysl-chat-c911d.firebaseio.com/.json";



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
		show: 'home',
		activeTeam: 'admirals',
		statistics: 'clubs',
		locationCode: 'gre',
		players: [],
		teams: [],
		schedule: [],
		maps: []
		//arrays "[players]", "[teams]", "[schedule]" and "[maps]" are declared empty and filled un from FireBase inside the "created()" function below. After that we need to SORT "[teams]", "[players]" and "[schedule]" to get "[teams_S]", "[players_S]" and "[schedule_S]" and we also need to 

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
		this.getData('players');
		this.getData('teams');
		this.getData('schedule');
		this.getData('maps');
	},
	methods: {
		getData(arg) {
			firebase.database().ref(arg).once('value', function (data) {
				switch (arg) {
					case 'players':
						app.players = data.val();
						break;
					case 'teams':
						app.teams = data.val();
						break;
					case 'schedule':
						app.schedule = data.val();
						break;
					case 'maps':
						app.maps = data.val();
						break;
					default:
						return alert('Error retrieving data from FIREBASE. Check the method getData() in your javascript!!');
				}
			})
		},
		capitalShow: function (arg) {
			return arg.toUpperCase();
		},
		seen: function (arg, argTeam) {
			this.show = arg;
			this.activeTeam = argTeam;
			console.log('El app.activeTeam es: ' + this.activeTeam);
			window.scrollTo(0, 0);
		},
		goToVenue: function (arg1, arg2) {
			this.show = arg1;
			this.locationCode = this.getVenueCode(arg2);
		},
		getVenueCode: function (arg) {
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
		teams_S: function () {
			//		_S stands for Sorted
			return this.teams.sort((a, b) => {
				return (b.wins.length * 3 + b.ties.length * 1) - (a.wins.length * 3 + a.ties.length * 1)
			});
		},
		players_S: function () {
			//		_S stands for Sorted
			return this.players.sort((a, b) => {
				return (b.goals) - (a.goals)
			});
		},
		schedule_S: function () {
			//		_S stands for Sorted
			return this.schedule.sort(function (a, b) {
				return new Date(a.date) - new Date(b.date)
			})
		},
		schedule_S_F: function () {
			//		_S stands for Sorted
			//		_F stands for Filtered(by activeTeam)
			return this.schedule_S.filter((arg) => {
				return (arg.team1 == this.activeTeam || arg.team2 == this.activeTeam);
			})
		},
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
		}
	}
});


// *****************--FIREBASE LIVE CHAT--********************
// *****************--FIREBASE LIVE CHAT--********************
// *****************--FIREBASE LIVE CHAT--********************

//waiting for data to be loaded from "created" so I need an if to check on it
if (app.schedule.length != 0 || app.players.length != 0 || app.teams.length != 0 || app.maps.length != 0) {
	console.log('Leyendo eventListeners del chat...');
	document.getElementById("login").addEventListener("click", login);
	document.getElementById("create-post").addEventListener("click", writeNewPost);
};

//getPosts();


function login() {
	// https://firebase.google.com/docs/auth/web/google-signin

	var provider = new firebase.auth.GoogleAuthProvider();
	//
	// How to Log In??
	//	Either with a popup window or redirection to the provider`s page:
	//	firebase.auth().signInWithPopup(provider);

	if (firebase.auth().currentUser == null) {
		alert('You are about to log in');
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
		alert('You are about to log out');
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
