//self executing function
var FIREBASE_UTILITY = (function(){

var userImageURL;

var config = {
  apiKey: "AIzaSyB3UAHZie5XVulHmvyFA5NvsPXZjOKnwg8",
  authDomain: "crud-ce7ea.firebaseapp.com",
  databaseURL: "https://crud-ce7ea.firebaseio.com",
  projectId: "crud-ce7ea",
  storageBucket: "crud-ce7ea.appspot.com",
  messagingSenderId: "491651899421"
};
  
firebase.initializeApp(config);

// this is a reference to Firebase storage for uploading images
var storageRef = firebase.storage().ref();

// this is used to write the users information to the database.
var _writeUserData = function(password, email, firstname, lastname) {
  var newKey = firebase
    .database()
    .ref()
    .child('users')
    .push().key;

  firebase
    .database()
    .ref('users/' + newKey)
    .set({
      password: password,
      email: email,
      firstname: firstname,
      lastname: lastname
    });
}

  var _writeData = function(name, desc, servingsize, ingredients, hour, min, instructions) {
  var newrecipeKey = firebase 
    .database() 
    .ref() 
    .child('recipes') 
    .push().key;
  firebase 
    .database() 
    .ref('recipes/'+ newrecipeKey)
    .set({ 
      image: "path", 
      name: name, 
      description: desc, 
        time: {hour, min}, 
        servingsize: servingsize, 
        ingredients: [ingredients, ingredients], 
        instructions: [instructions, instructions] 
    });
}

// this will get all the data in the database once
function getOnce() { 
  firebase
    .database()
    .ref('users/')
    .once('value')
    .then(function(snapshot) {
      // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      console.log(snapshot.val());
      var userArray = snapshot.val();

      $.each(userArray, function(idx, value) {
        $('body').append(
          '<p>Username: ' +
            value.username +
            ' Email: ' +
            value.email +
            //THIS IS HOW YOU GET PIC
            //'</p><div><img src="' +
            //value.pic
            //'"/></div>'
          'First Name:' +
            value.firstname 
        );

        console.log(value.username);
        console.log(value.email);
      });
    });
}

//show recipes on dom 
var _getAllRecipes = function(callback){
  firebase
  .database()
  .ref('recipes/')
  .once('value')
  .then(function(snapshot) {
    // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    console.log(snapshot.val());
    var recipeArray = snapshot.val();
    return callback(recipeArray);
    // $.each(userArray, function(idx, value) {
    //   $('body').append(
    //     '<p>Username: ' +
    //       value.username +
    //       ' Email: ' +
    //       value.email +
    //       '</p><div><img src="' +
    //       value.profile_picture +
    //       '"/></div>'
    //   );

      // console.log(value.profile_picture);
      // console.log(value.username);
      // console.log(value.email);
    //});
  });
}
// this will delete a user. You will need the key reference
function deleteUser() {
  firebase
    .database()
    .ref('users/1234')
    .remove();
}

  var _deleteRecipe = function(recipeKey){
  firebase
  .database()
  .ref('recipes/' + recipeKey)
  .remove();
}

// function used to update a user
function _updateUsers(userKey, user) {
 /*  var user = {
    username: 'Tom',
    email: 'tom@tom.com',
    profile_picture: 'images/tom.jpg'
  }; */

  var newKey = firebase.database().ref().child('users').push().key;

  firebase
    .database()
    .ref('users/' + userKey)
    .update(user);
}

var _updateRecipe = function(recipeKey, editObj) {
  firebase
  .database()
    .ref(`recipes/` + recipeKey)
  .update(editObj);
}

// this function will create the user. You will need the full name and email as well as their password and callback.
function createUser(name, email, pw, callback) {
  console.log(name);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pw)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      $('.error').html(errorMessage);
    })
    .then(function(res) {
      console.log(res);
      firebase
        .database()
        .ref('users/' + res.user.uid)
        .set({
          username: name,
          email: email,
          profile_picture: ''
        });
    });
}

// This will login a user and store their info locally. You will need email and password and callback.
function loginUser(email, pw, callback) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      $('.error').html('This email is not signed up');
    })
    .then(function(res) {
      console.log(res);
    });
}
//runs through the function without user making it 
  return {
    writeUserData: _writeUserData,
    writeData: _writeData,
    deleteRecipe: _deleteRecipe,
    updateUsers: _updateUsers,
    updateRecipe: _updateRecipe,
    getAllRecipes: _getAllRecipes, 
    getOnce: getOnce,
  };

}) ();
