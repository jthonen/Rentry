$(document).ready(function() {

    getAllItems();

    $("div#share-button").on("click", function(event) {
        event.preventDefault();
    
        alert("Success!");
    
        var item = {
            name: $("#item-name").val().trim(),
            quantity: $(".ui.dropdown.quantity").val().trim(),
            category: $(".ui.dropdown.category").val().trim(),
            description: $("#description").val().trim(),
            pic: $("#item-img").val().trim(),
            ownerID: localStorage.userID,
            userID: localStorage.userID,
            currentUserID: localStorage.userID
        };
    
        console.log(item);
        callAPI.shareItem(item);
    
    });
    
    var callAPI = {

        shareItem: function(item) {
            return $.post("/api/items", item, function(result) {
                // console.log("successfully shared ", result);
                location.reload();
            });
        }
    };

    function getAllItems() {
        $.ajax({
            url: "/api/items",
            type: "GET"
        }).then(function(data) {
            // console.log(data);
            for(var i = 0; i < data.length; i++) {
                if(data[i].available === true) {
                    $(".ui.stackable.special.centered.cards").append(`
                        <div class="card clothing available">
                            <div class="blurring dimmable image">
                                <div class="ui inverted dimmer">
                                    <div class="content">
                                        <div class="center">
                                            <div class="ui primary button learn-more">Learn More</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ui fluid image">
                                    <div class="ui green ribbon label">
                                        <i class="thumbs up outline icon"></i> Available
                                    </div>
                                    <img src="${data[i].pic}">
                                </div>
                            </div>
                            <div class="content available">
                                <a class="header">${data[i].name}</a>
                            </div>
                        </div>
                    `);
                }
                else {
                    $(".ui.stackable.special.centered.cards").append(`
                        <div class="card book unavailable">
                            <div class="blurring dimmable image">
                                <div class="ui inverted dimmer">
                                    <div class="content">
                                        <div class="center">
                                            <!--learn more button learn-more-taken-->
                                            <div class="ui primary button learn-more-taken">Learn More</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ui fluid image">
                                    <div class="ui red ribbon label">
                                        <i class="thumbs down outline icon"></i> Unavailable
                                    </div>
                                    <!--product-img div-->
                                    <div class="product-img">
                                        <img src="https://images-na.ssl-images-amazon.com/images/I/51OORp1XD1L._SX258_BO1,204,203,200_.jpg"
                                            alt="product image">
                                    </div>
                                </div>
                            </div>
                            <!--wait-list-btn button-->
                            <div class="content wait-list-btn">
                                <a class="header">Get on the Wait List</a>
                            </div>
                        </div>
                    `);
                }

            };
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
        }) 
    };


        
});
