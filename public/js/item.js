$(document).ready(function() {

    getAllItems();

    $("div#share-button").on("click", function(event) {
        event.preventDefault();
    
        alert("You clicked!");
    
        var item = {
            name: $("#item-name").val().trim(),
            quantity: $(".ui.dropdown.quantity").val().trim(),
            category: $(".ui.dropdown.category").val().trim(),
            description: $("#description").val().trim()
        };
    
        console.log(item);
        callAPI.shareItem(item);
    
    });
    
    var callAPI = {

        shareItem: function(item) {
            return $.post("/api/items", item, function(result) {
                console.log("successfully shared ", result);
                location.reload();
            });
        }
    };

    function getAllItems() {
        $.ajax({
            url: "/api/items",
            type: "GET"
        }).then(function(data) {
            console.log(data);
            for(var i = 0; i < data.length; i++) {
                // var div = $("<div>");
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
                                <img src="https://images-na.ssl-images-amazon.com/images/I/613BCaoaS6L._UX385_.jpg">
                            </div>
                        </div>
                        <div class="content available">
                            <a class="header">${data[i].name}</a>
                        </div>
                    </div>
                `);

            }

        }) 
    };

    // Semantic Hover on Card
    $('.special.cards .image').dimmer({
        on: 'hover'
    });
    //Semantic activate popup (learn more btn)
    $(".learn-more").on("click", function () {
        $('.popup-avail')
            .modal('show')
            ;
    });
    $(".learn-more-taken").on("click", function () {
        $('.popup-unavail')
            .modal('show')
            ;
    });
    //Semantic activate popup (available)
    $(".available").on("click", function () {
        $('.popup-avail')
            .modal('show')
            ;
    });
    //Semantic activate popup (wait-list-btn)
    $(".wait-list-btn").on("click", function () {
        $('.waitlist')
            .modal('show')
            ;
    });
    //Semantic activate popup (add-item)
    $(".add-item").on("click", function () {
        $('.add-item-popup')
            .modal('show')
            ;
    });
    //Semantic close popup (deny button)
    $(".deny").on("click", function () {
        $('.ui.modal')
            .modal('hide')
            ;
    });
    //semantic make dropdown work in add item
    $('.selection.dropdown')
        .dropdown()
        ;
        
});
