// Get references to page elements
var $exampleText = $("#example-text");
var $email = $("#email-text");
var $password = $("#pass-text");
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
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  //Items
  saveItem: function(item){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/items",
      data: JSON.stringify(item)
    });
  },
  getItems: function(){
    return $.ajax({
      url: "api/items",
      type: "GET"
    });
  },
  deleteItem: function(id){
    return $.ajax({
      url: "api/items/" + id,
      type: "DELETE"
    });
  },
  //may need to be updated to pass in object
  updateItem: function(id){
    return $.ajax({
      url: "api/items/" + id,
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
      url: "api/groups",
      data: JSON.stringify(group)
    });
  },
  getGroup: function(){
    return $.ajax({
      url: "api/groups",
      type: "GET"
    });
  },
  deleteGroup: function(id){
    return $.ajax({
      url: "api/groups/" + id,
      type: "DELETE"
    });
  },
  //may need to be updated to pass in object
  updateGroup: function(id){
    return $.ajax({
      url: "api/groups/" + id,
      type: "PUT" 
    });
  },
  //Users
  saveUser: function(user){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  },
  getUsers: function(){
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteUser: function(id){
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  },
  //may need to be updated to pass in object
  updateUser: function(id){
    return $.ajax({
      url: "api/users/" + id,
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
  
  var login = {
    email: $email.val().trim(),
    password: $password.val().trim()
  };

  if (!(login.email && login.password)) {
    alert("You must enter an email and password!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
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
$("$login").on("click", loginHandler);
$("$sign-up").on("click", signUpHandler);
