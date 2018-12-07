$(document).ready(function() {

    $("div#share-button").on("click", function(event) {
        event.preventDefault();

        var cookie = document.cookie;
        var splitCookie = cookie.split("=");
        var owner = splitCookie[1];
    
        var item = {
            name: $("#item-name").val().trim(),
            quantity: $(".ui.dropdown.quantity").val().trim(),
            category: $(".ui.dropdown.category").val().trim(),
            description: $("#description").val().trim(),
            pic: $("#item-img").val().trim(),
            ownerID: owner,
            currentUserID: 0
        };
    
        console.log(item);
        callAPI.shareItem(item);
    
    });
    
    var callAPI = {

        shareItem: function(item) {
            console.log(item);
            return $.ajax({
                url: "/api/items",
                type: "POST",
                data: item
            }).then(function(result) {
                alert("Success!");
                location.reload();
            })
        }
    };

    var category = $("#category").val();

    var available = "";
    var currentUser = "";

    if(category === "borrowed") {
        var cookie = document.cookie;
        var splitCookie = cookie.split("=");
        var category = splitCookie[1];
    };
    
    $.ajax({
        url: "/api/category/" + category,
        type: "GET"
    }).then(function(result) {

        console.log("\nresult here: \n", result);

        $(".ui.stackable.special.centered.cards").empty();

        for(i = 0; i < result.length; i++) {

            // check availability
            if(result[i].available) {
                available = " This item is available";
            }
            else {
                available = " Not available";
            }

            console.log(result[i].currentUserID);
            // check current user
            if(result[i].currentUserID === 0 ) {
                currentUser = " No one has borrowed it";
            }
            else {
                currentUser = result[i].currentUserID;
            }
            console.log(currentUser);
            console.log(result[i].available);

            $(".ui.stackable.special.centered.cards").append(`
                <div class="card">
                    <div class="blurring dimmable image">
                        <div class="ui inverted dimmer">
                            <div class="content">
                                <div class="center">
                                    <div class="ui primary button learn-more" data-id="${result[i].id}" data-name="${result[i].name}" data-description="${result[i].description}"
                                        data-quantity="${result[i].quantity}" data-category="${result[i].category}" data-currentuser="${currentUser}"
                                        data-image="${result[i].pic}" data-available="${result[i].available}" data-owner="${result[i].ownerID}"}>Details</div>
                                </div>
                            </div>
                        </div>
                    <img src="${result[i].pic}">
                    </div>
                <div class="content">
                    <a class="header">${result[i].name}</a>
                    <div class="meta">
                        <span class="date">${result[i].description}</span>
                    </div>
                </div>
                <div class="extra content">
                    Availablity:  ${available}
                </div>
            `);
        };

        // Semantic Hover on Card
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    });
        //Semantic activate popup (learn more btn)
        $(document).on("click", ".learn-more", function (event) {
            event.preventDefault();

            // console.log($(this));

            $(".ui.modal.popup-avail").html(`
                <i class="close icon"></i>
                <div class="header product-name">
                    ${$(this).data("name")}
                </div>
                <div class="image content">
                    <div class="ui medium image product-img">
                        <img src="${$(this).data("image")}"
                            alt="product image">
                    </div>
                    <div class="description">
                        <div class="ui header">Description</div>
                        <!--Description div-->
                        <p class="description">${$(this).data("description")}</p>
                        <!--quantity div-->
                        <div class="ui header quantity">Quantity: ${$(this).data("quantity")}</div>
                        <!--category div-->
                        <div class="ui header categories">Category: ${$(this).data("category")}</div>
                        <!--current-user div-->
                        <h3 class="current-user">Current User: ${$(this).data("currentuser")}</h3>
                        <h3 class="owner">Owner: ${$(this).data("owner")}</h3>
                    </div>
                </div>
                <!--borrow or deny buttons-->
                <div class="actions">
                    <div class="ui black deny button">
                        Cancel
                    </div><br><br>
                    <div class="interchangeable">
                        <div class="ui positive right labeled icon button borrowItem" data-id="${$(this).data("id")}">
                            Borrow it!
                            <i class="checkmark icon"></i>
                        </div>
                    </div>
                </div>
            `);

            
            // console.log($(this).data("available"));
            if($(this).data("available") === false) {
                $(".interchangeable").html(`
                    <div class="ui positive right labeled icon button returnItem" data-id="${$(this).data("id")}">
                        Return This Item
                        <i class="checkmark icon"></i>
                    </div>
                `);
            }
            $('.popup-avail').modal('show');
        });

        $(document).on("click", ".borrowItem", function(event){
            //borrow item

            var cookie = document.cookie;
            // console.log(cookie);
            var splitCookie = cookie.split("=");
            // console.log(splitCookie);
            var uid = splitCookie[1];
            // console.log("user id is: " + uid);

            var itemID = $(this).data("id");
            var item = {
                currentUserID: uid,
                available: false
            };
            $.ajax({
                url: "/api/items/" + itemID,
                type: "PUT",
                data: item
                }).then(function(result){
                    //  console.log(result);
                    //  $(".currentUser").text("Current User: " + result.firstName);
                    location.reload();
                    alert("Successfully claimed the item! Please contact the owner.");
                });
        });

        $(document).on("click", ".returnItem", function(event) {
            event.preventDefault();

            var itemID = $(this).data("id");
            var item = {
                currentUserID: 0,
                available: true
            };
            $.ajax({
                url: "/api/items/" + itemID,
                type: "PUT",
                data: item
            }).then(function(result) {
                location.reload();
                alert("Successfully returned the item. Please contact the owner.");
            })
        });

        

        $(document).on("click", "#search-submit", function(event) {
            var userinput = $()
        });

        // Semantic Hover on Card
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
        //Semantic activate popup (learn more btn)
        $(".learn-more").on("click", function () {
            $('.popup-avail').modal('show');
        });
        $(".learn-more-taken").on("click", function () {
            $('.popup-unavail').modal('show');
        });
        //Semantic activate popup (available)
        $(".available").on("click", function () {
            $('.popup-avail').modal('show');
        });
        //Semantic activate popup (wait-list-btn)
        $(".wait-list-btn").on("click", function () {
            $('.waitlist').modal('show');
        });
        //Semantic activate popup (add-item)
        $(".add-item").on("click", function () {
            $('.add-item-popup').modal('show');
        });
        //Semantic close popup (deny button)
        $(".deny").on("click", function () {
            $('.ui.modal').modal('hide');
        });
        //semantic make dropdown work in add item
        $('.selection.dropdown').dropdown();
        
});
