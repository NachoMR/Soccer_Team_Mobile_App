document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);


getPosts();


function login() {

	// https://firebase.google.com/docs/auth/web/google-signin

	var provider = new firebase.auth.GoogleAuthProvider();
	//
	// How to Log In??
	//	Either with a popup window:
	firebase.auth().signInWithPopup(provider);
	// or a redirection to goggle's sign-in page:
//		firebase.auth().signInWithRedirect(provider);
//		firebase.auth().getRedirectResult()

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
	firebase.database().ref('spiderman').push(message);
	
	console.log("write");
	document.getElementById("textInput").value = "";

}


function getPosts() {

	firebase.database().ref('spiderman').on('value', function (data) {
		//
		var posts = document.getElementById("posts");
		posts.innerHTML = "";
		console.log('data.val() es:  ' + data.val());
		var messages = data.val();
		//
		for (var key in messages) {
			var text = document.createElement("div");
			var element = messages[key];

			text.append(element.message);
			text.append(element.name);
			posts.append(text);
		}
		//
	})

	console.log("getting posts");

}
