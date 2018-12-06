$(document).ready(function() {
    $("#searchCategory").on("click", function(event) {
        event.preventDefault();

        var category = $("#category").val();

        var available = "";
        var currentUser = "";
        
        $.ajax({
            url: "/api/category/" + category,
            type: "GET"
        }).then(function(result) {
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
                if(result[i].currentUserID === null ) {
                    currentUser = " No one has borrowed it";
                }
                else {
                    currentUser = result[i].currentUserID;
                }
                console.log(currentUser);

                $(".ui.stackable.special.centered.cards").append(`
                    <div class="card">
                        <div class="blurring dimmable image">
                            <div class="ui inverted dimmer">
                                <div class="content">
                                    <div class="center">
                                        <div class="ui primary button learn-more" data-name="${result[i].name}" data-description="${result[i].description}"
                                            data-quantity="${result[i].quantity}" data-category="${result[i].category}" data-currentUser="${currentUser}"
                                            data-image="${result[i].pic}"}>Details</div>
                                    </div>
                                </div>
                            </div>
                        <img src="../images/unavailable.png">
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
            //Semantic activate popup (learn more btn)
            $(document).on("click", ".learn-more", function (event) {
                event.preventDefault();

                console.log($(this));

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
                            <h3 class="current-user">Current User: ${$(this).data("currentUser")}</h3>
                        </div>
                    </div>
                    <!--borrow or deny buttons-->
                    <div class="actions">
                        <div class="ui black deny button">
                            Cancel
                        </div>
                        <div class="ui positive right labeled icon button">
                            Borrow it!
                            <i class="checkmark icon"></i>
                        </div>
                    </div>
            `)
                $('.popup-avail').modal('show');
            });
        });
    })
});