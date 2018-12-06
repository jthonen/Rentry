// Get references to page elements
var $exampleText = $("#example-text");
var $email = $("#email-home");
var $emailSignUp = $("#email-signup");
var $password = $("#password-home");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

//select books category function
$(".books-select").on("click", function() {
  $(".tool").hide();
        $(".clothing").hide();
        $(".book").show();
});
    //select tools category function
    $(".tools-select").on("click", function() {
      $(".book").hide();
        $(".clothing").hide();
        $(".tool").show();
    });
    //select clothing category function
    $(".clothing-select").on("click", function() {
      $(".book").hide();
        $(".tool").hide();
        $(".clothing").show();
    });
    //select all items category funciton
    $(".all-select").on("click", function() {
      $(".book").show();
        $(".tool").show();
        $(".clothing").show();
    });
    //select available now function
    $(".available-select").on("click", function() {
      $(".unavailable").hide();
        $(".available").show();
    }); 

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/examples",
      data: example
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "/api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "/api/examples/" + id,
      type: "DELETE"
    });
  },
  //Items
  // saveItem: function(item){
  //   return $.ajax({
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     type: "POST",
  //     url: "/api/items",
  //     data: item
  //   });
  // },
  // getItems: function(){
  //   return $.ajax({
  //     url: "/api/items",
  //     type: "GET"
  //   });
  // },
  // getItem: function(id){
  //   return $.ajax({
  //     url: "/api/items/" + id,
  //     type: "GET"
  //   });
  // },
  // deleteItem: function(id){
  //   return $.ajax({
  //     url: "/api/items/" + id,
  //     type: "DELETE"
  //   });
  // },
  //may need to be updated to pass in object
  updateItem: function(id){
    return $.ajax({
      url: "/api/items/" + id,
      type: "PUT" 
    });
  },
  //begin groups
  saveGroup: function(group){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/groups",
      data: group
    });
  },
  getGroup: function(){
    return $.ajax({
      url: "/api/groups",
      type: "GET"
    });
  },
  deleteGroup: function(id){
    return $.ajax({
      url: "/api/groups/" + id,
      type: "DELETE"
    });
  },
  //may need to be updated to pass in object
  updateGroup: function(id){
    return $.ajax({
      url: "/api/groups/" + id,
      type: "PUT" 
    });
  },
  //Users
  saveUser: function(user){
     return $.post(
      // headers: {
      //   "Content-Type": "application/json"
      // },
      "/api/users", user, function(result) {
        localStorage.userID = result.id;
        console.log(result);
        window.location.href="/mainPage";
      }
    );
  },
  getUsers: function(){
    return $.ajax({
      url: "/api/users",
      type: "GET"
    });
  },
  checkCredential: function(login){
    return $.post(
      "/api/users/login/" + login.email, login, function(result, status) {
        if (status !== 'success') throw status;
        console.log(result);
        if(result.isValid === true ){
          setCookie(result.userID);
          console.log("this is cookie: ", document.cookie);
          window.location.href="/mainPage";
        } else {
          alert("Your email or password does not match.");
        }
        
      });
  },
  deleteUser: function(id){
    return $.ajax({
      url: "/api/users/" + id,
      type: "DELETE"
    });
  },
  //may need to be updated to pass in object
  updateUser: function(id){
    return $.ajax({
      url: "/api/users/" + id,
      type: "PUT" 
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  
  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// loginHandler is called whenever we submit a new example
// Login to see matching credentials
var loginHandler = function(event) {
  event.preventDefault();
  
  // alert("hello");

  var login = {
    email: $email.val().trim(),
    password: $password.val().trim()
  };
  // console.log("This is json stringify of login")
  // console.log(JSON.stringify(login));

  if (login.email==="" || login.password ==="") {
    alert("You must enter an email and password!");
    return;
  }

  API.checkCredential(login).then(function() {
    //Run successful login or not logic
    console.log("Ran check Crednetial Login");
  });

  $email.val("");
  $password.val("");
};

// New Sign up
var signUpHandler = function(event) {
  event.preventDefault();
  
  // alert("hello");

  if ($("#password-signup").val().trim() !== $("#confirm-password-signup").val().trim()){
    alert("Passwords do not match");
    return;
  }
  var signup = {
    email: $("#email-signup").val().trim(),
    password: $("#password-signup").val().trim(),
    firstName: $("#first-name-signup").val().trim(),
    lastName: $("#last-name-signup").val().trim()
  };
  console.log("this is the json signup object");
  console.log(JSON.stringify(signup));

  if (signup.email==="" || signup.password ==="") {
    alert("You must enter an email and password!");
    return;
  }


  API.saveUser(signup).then(function(res) {
    //Run successful login or not logic
    // alert("ran");
    console.log(res);
    if(res === true){
      console.log("Success");
      window.location.href = "/mainPage";
    } 
    else console.log("failure");
    
  });

  $("#email-signup").val("");
  $("#password-signup").val("");
  $("#first-name-signup").val("");
  $("#last-name-signup").val("");
  $("#confirm-password-signup").val("");
};


// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

//login and sign in buttons
$(document).on("click", "#login", loginHandler);
$("#yes-signup").on("click", signUpHandler);

// set cookies
function setCookie(currUID) {
  var d = new Date();
  var userID = "userID";
  d.setTime(d.getTime() + 60*60*1000);
  var expires = "expires="+ d.toUTCString();
  document.cookie = userID + "=" + currUID + ";" + expires + "; path=/";
  console.log(document.cookie);
};