Vue.component('clubs-stats', {
	template: '<table class="w-100 table-striped text-center"><thead><tr><th>TEAM</th><th>PLAYED</th><th>W</th><th>L</th><th>T</th><th>POINTS</th></tr></thead><tbody><tr v-for="compTeam in compTeams" :class="{success: (compTeam.name == team1ToCheck) || (compTeam.name == team2ToCheck)}"><td>{{ capitalize(compTeam.name) }}</td><td>{{ sumPlayed(compTeam) }}</td><td>{{ compTeam.wins.length }}</td><td>{{ compTeam.losses.length }}</td><td>{{ compTeam.ties.length }}</td><td>{{sumPoints(compTeam)}}</td></tr></tbody></table>',
	props: ['teams_props', 'team1_props', 'team2_props'],
	data: function () {
		return {
			compTeams: this.teams_props,
			//compActive_team: this.team1_props
		}
	},
	methods: {
		capitalize: function (teamName) {
			//			console.log(this.compTeams.wins.length);
			return teamName.charAt(0).toUpperCase() + teamName.slice(1);
		},
		sumPlayed: function (team) {
			return (team.wins.length + team.losses.length + team.ties.length);
		},
		sumPoints: function (team) {
			return (team.wins.length * 3) + (team.ties.length * 1);
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
	template: `<div class="py-2 text-center"><p class="h6 my-2 text-center font-weight-lighter font-italic">Select a month to display games</p><button id="sep" type="button" class="btn btn-outline-primary" v-on:click="seen2('sep')">SEP</button><button id="oct" type="button" v-on:click="seen2('oct')" class="btn btn-outline-primary">OCT</button><button id="nov" type="button" v-on:click="seen2('nov')" class="btn btn-outline-primary">NOV</button><button id="dec" type="button" v-on:click="seen2('dec')" class="btn btn-outline-primary">DEC</button><button id="jan" type="button" v-on:click="seen2('jan')" class="btn btn-outline-primary">JAN</button><p class="h6 mt-3 mb-0 text-center font-weight-lighter font-italic">Click on the match to see details</p><table class="w-100 table-striped table-hover text-center"><thead><tr><th>{{capitalShow(showMonth)}}</th><th>TEAMS</th><th>VENUE</th><th>TIME</th></tr></thead><tbody><tr v-for="sched in compSchedule_F" v-on:click="go(sched)"><td>{{sched.date}}</td><td>{{sched.team1 + ' vs ' + sched.team2}}</td><td>{{sched.location}}</td><td>{{sched.time}}</td></tr></tbody></table></div>`,
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
//	beforeMount() {
//		document.getElementById("sep").classList.add("monthButton");
//	},
	methods: {
		go: function (sched) {
			console.log(sched.date);
			console.log(sched.time);
			console.log('team1: ' + sched.team1);
			console.log('team2: ' + sched.team2);
			console.log(sched.location);
			app.show = 'my match';
			app.matchDate = sched;
			window.scrollTo(0, 0);
		},
		capitalShow: function (arg) {
			//document.getElementById(showMonth).classList.toggle("monthButton", this.showMont)
			return arg.toUpperCase();
		},
		seen2: function (monthName) {
			this.showMonth = monthName;
			//			window.scrollTo(0, 0);
		}
	},
	computed: {
		compSchedule: function () {
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
//**********The below component is not behaving properly: TeamIndex is not working properly as the switch statement is set for the sourced teams array instead of the sorted teams array************************************
Vue.component('team-members', {
	template: '<div class="overflow-auto border border-light overflow_dimensions"><dl><dt>MANAGER</dt><dd>{{getManager()}}</dd><dt>CAPTAIN</dt><dd>{{getCaptain()}}</dd><dt>PLAYERS {{getTeamMembers.length}}</dt><dd v-for="item in getTeamMembers()">{{item}}</dd></dl></div>',
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
			for (var i = 0; i < this.compTeams.length; i++) {
				if (this.compTeams[i].name == this.compTeam) {
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
		logged_In: null,
		currentUserName: "",
		activeChat: null,
		chatPosts: [],
		statistics: '',
		locationCode: 'gre',
		players: [],
		teams: [],
		schedule: [],
		maps: []
		//arrays "[players]", "[teams]", "[schedule]" and "[maps]" are declared empty and filled un from FireBase inside the "created()" function below. After that we need to SORT "[teams]", "[players]" and "[schedule]" to get "[teams_S]", "[players_S]" and "[schedule_S]" and we also need to 

	},
	created() {
		console.log("logged_In al iniciar el CREATED: " + this.logged_In);
		//The below function is an observer/listener watching the state of the Authentication
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				document.getElementById("login").checked = true;
				console.log('SignIn successfull');
				document.getElementById("logInOut").innerHTML = 'Log Out';
				app.logged_In = true;
				console.log("logged_In justo despues del onAuthStateChanged: " + app.logged_In);
				app.currentUserName = firebase.auth().currentUser.displayName;
			} else {
				document.getElementById("login").checked = false;
				console.log('SignOut successful');
				document.getElementById("logInOut").innerHTML = 'Log In';
				app.logged_In = false;
				console.log("logged_In justo despues del onAuthStateChanged: " + app.logged_In);
				app.currentUserName = "";
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
		//Function to switch between different sections of the aplication, e.g. Home, Teams, Schedule...
		seen: function (arg, argTeam) {
			this.show = arg;
			this.activeTeam = argTeam;
			console.log('El app.activeTeam es: ' + this.activeTeam);
			window.scrollTo(0, 0);
		},
		//handler to actuate on the LogIn/LogOut Switch
		handler: function(argTeam){
			this.seen("chat", argTeam);
			this.login();
		},
		//Function to switch between the different Live Chats
		seenChat: function(teamName){			
			this.activeChat = teamName;
			console.log("this.activeChat is: " + this.activeChat);
			var arr = document.getElementsByClassName("chat_icon");					
			for(var i=0 ; i<arr.length ; i++){
				arr[i].classList.add("opacity_chat_icon");
			}
			document.getElementById(teamName + "_chat_icon").classList.toggle("opacity_chat_icon");
			app.chatPosts = [];
			this.getPosts(this.activeChat);
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
		},
		// 3 Methods related to Live Chat: login, writeNewPost and getPosts
		login: function() {
			// https://firebase.google.com/docs/auth/web/google-signin
			var provider = new firebase.auth.GoogleAuthProvider();			
			if (firebase.auth().currentUser == null) {
				firebase.auth().signInWithPopup(provider)
					.then(function (result) {
						console.log('Waiting for Posts from Firebase...');
						app.logged_In = true;
						console.log("logged_In justo despues del login: " + app.logged_In);
						app.currentUserName = firebase.auth().currentUser.displayName;
						console.log(firebase.auth().currentUser.displayName);
					})
					.catch(function (error) {
						alert(error);
						console.log(error);
					});
			} else {
				firebase.auth().signOut()
					.then(function () {
						//document.getElementById("posts").innerHTML = "Log In to Start Live Chat";
						app.logged_In = false;
						app.activeChat = null;
						console.log("logged_In justo despues del login: " + app.logged_In);
						app.currentUserName = "";
					})
					.catch(function (error) {
						console.log('SignOut failed. You are still logged In!!');
					});
			}
		},
		writeNewPost: function (activeChat) {
			// https://firebase.google.com/docs/database/web/read-and-write
			var textToSend = document.getElementById("textInput").value;
			console.log(textToSend);
			// // Values
			var message = {
				message: textToSend,
				name: firebase.auth().currentUser.displayName,
				photo: firebase.auth().currentUser.photoURL
			};
			console.log(message);			
			console.log(message.photo);
			//Now we're going to make the push to the firbase.database().ref("my_chat")
			//Remember that push() is a promise so I can add a .then(data){some code here} and extract some info like the firebase key of the message I am pushing to Firebase.
			firebase.database().ref("chats/" + activeChat).push(message)
			.then((data) => {
				console.log(data);
				console.log(data.key);
			});
			document.getElementById("textInput").value = "";
		},
		getPosts: function (activeChat) {
			
			firebase.database().ref("chats/" + activeChat).on('value', function (snapshot){
			//snapshot.val() is the object stored in the Firebase.database() at the moment of either calling the function or modifying its content in some way
			console.log(snapshot.val());
			//app.chatPosts = snapshot.val();
			app.chatPosts = [];
			//document.getElementById("posts").innerHTML = "";
			for(var key in snapshot.val()){
				app.chatPosts.push({
					message: snapshot.val()[key].message,
					name: snapshot.val()[key].name,
					photo: snapshot.val()[key].photo
				});
			}
			//app.chatPosts.reverse();
			});
//			var posts = document.getElementById("posts");
//			console.log(posts.height);
			
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

//console.log('Leyendo eventListeners del chat...');

//document.getElementById("login").addEventListener("click", login);
//document.getElementById("create-post").addEventListener("click", writeNewPost);


//getPosts();









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
