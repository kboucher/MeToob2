var MeToob = function () {};

MeToob.prototype = {
    
    dialogClosed: function ( formDiv ) {
        
        $( formDiv ).find( "#SuccessMessage" ).remove();
        $( formDiv ).find( "form" ).show();
        $( formDiv ).find( "form input:text" ).val("");
        $( formDiv ).parents( ".ui-dialog" ).find( ".ui-dialog-buttonpane" ).show();
        
    },

    init: function () {
        this.setSelectedListing();
        this.moveShareButtons();
        this.initSendToFriendForm();
        this.initResponsive();

        // Initialize details/summary polyfill
        $( "details" ).details();
    },

    initResponsive: function() {

        this.setVideoSize();
        $( window ).on( "resize", this.setVideoSize );

    },

    initSendToFriendForm: function() {
    
        $( "#send-to-friend-btn" ).on( "click", { instance: this }, function( e ) {
            
            var formDiv = $( "#send-to-friend-form" ),
                instance = e.data.instance;
                
            // Reset error message
            $( formDiv ).find( "p.error" ).remove();
            
            $( formDiv ).dialog (
                {
                    close:          instance.dialogClosed( $( formDiv ) ),
                    closeText:      "",
                    dialogClass:    "dialog",
                    modal:          true,
                    title:          "Send This Video to a Friend",
                    width:          "480px",
                    buttons: {
                                "Send": function() {
                                    if ( instance.isValid_SendToFriend() ) { 
                                        instance.sendToFriend();
                                    } else {
                                        // TODO: Handle error
                                        $( formDiv ).find( "*:first" ).before( "<p class=\"error\">Please provide at least two valid email addresses. (Yours and a friend's.)</p>" );
                                    }
                                },
                                "Cancel": function() {$( this ).dialog( "close" );}
                             }
                }
            );
            
            $( ".ui-dialog-buttonset button:first" ).css( "font-weight", "bold" );
            
            e.preventDefault();
            e.stopPropagation();
            
        });

        $( "#close-send-to-friend" ).on( "click", function () {

            $( "#send-to-friend-form" ).dialog( "close" );

        } );
        
    },

    isValid_SendToFriend: function () {

        var correctedToList = [],
            fromField = $( "#email" ),
            fromAddress = $( fromField ).val(),
            formDiv = $( "#send-to-friend-form" ),
            isFromValid = true,
            isToValid = true,
            toField = $( "#email-to" ),
            toAddresses = $( toField ).val().replace( " ", "" ).replace( ";", "," ).split( "," ),
            i;

        // Clear previous errors
        $( formDiv ).find( "p.error" ).remove();
        $( formDiv ).find( "input.error" ).removeClass( "error" );

        // Check users email first
        if ( ! Utils.EmailRegEx.test( fromAddress ) ) {
            isFromValid = false;
        }

        // Now check friends' addresses
        if ( toAddresses.length < 1 ) {
            isToValid = false;
        }

        // Check each comma-delimited friends' address
        for ( i = 0; i < toAddresses.length; i++ ) {

            if ( Utils.EmailRegEx.test( toAddresses[i] ) ) {
                correctedToList.push( toAddresses[i] );
            }

        }

        // If no valid to email addresses ...
        if ( correctedToList.length < 1 ) {
            isToValid = false;
        }

        // Show from field error
        if ( !isFromValid ) {
            $( fromField ).addClass( "error" );
        }

        // Show to field error
        if ( !isToValid ) {
            $( toField ).addClass( "error" );
        }

        // Validation failed
        if ( !isFromValid || !isToValid ) { return false; }

        // Validation succeeded
        // ---------------------
        // Update to field with corrected address list
        $( toField ).val( correctedToList.join( "," ) );

        return true;

    },

    moveShareButtons: function () {
    
        var shareButtons = $( "#share-buttons" );
        $( "#video-div" ).after( $( shareButtons ) );
        $( "#wp_fb_like_button" ).appendTo( $( shareButtons ) );
        $( ".addthis_toolbox" ).appendTo( $( shareButtons ) );
        
    },
    
    sendToFriend: function () {
    
        var formDiv = $( "#send-to-friend-form" ),
            blogUrl = $( "#blog-url" ).val();
    
        $.ajax({
            contentType: "text/plain",
            data: 'json={ "email_to" : "' + $( "#email-to" ).val() + '", "email" : "' + $( "#email" ).val()
                + '", "postId" : ' + $( "#current-post-id-hidden" ).val() + ' }',
            url: blogUrl + "/wp-content/themes/metoob2/functions/sendtofriend.php",
            success: function ( data ) {
                
                try {
                
                    data = data.substring( data.indexOf( '{' ), data.lastIndexOf( '}' ) + 1 );

                    var response = JSON.parse( data );

                    // Hide form
                    $( formDiv ).find( "form" ).hide();
                    $( formDiv ).parents( ".ui-dialog" ).find( ".ui-dialog-buttonpane" ).hide();

                    // Show success message
                    $( formDiv ).append(
                        "<div id=\"success-message\" class=\"clearfix\">" +
                        "<p class=\"success-title\">Video Message Sent!</p>" +
                        "<p class=\"success\">We have forwarded this video to " + response.SentTo.replace( ",", ", " ) + ".</p>" +
                        "<a id=\"close-send-to-friend\" class=\"close-button\">Close</a>" +
                        "</div>"
                    );
                        
                } catch ( error ) {
                    
                    // Hide form
                    $( formDiv ).find( "form" ).hide();
                    $( formDiv ).parents( ".ui-dialog" ).find( ".ui-dialog-buttonpane" ).hide();

                    // Show error message
                    $( formDiv ).append(
                        "<div id=\"success-message\" class=\"clearfix\">" +
                        "<p class=\"success-title\">We're sorry</p>" +
                        "<p class=\"success\">We were unable to forward this video at this time. (" + error + ")</p>" +
                        "<a id=\"close-send-to-friend\" class=\"close-button\">Close</a>" +
                        "</div>"
                    );
                        
                }
                
                    
            },
            error: function (jqXHR, textStatus, errorThrown) {

                // Hide form
                $( formDiv ).find( "form" ).hide();
                $( formDiv ).parents( ".ui-dialog" ).find( ".ui-dialog-buttonpane" ).hide();

                // Show error message
                $( formDiv ).append(
                    "<div id=\"success-message\" class=\"clearfix\">" +
                    "<p class=\"success-title\">We're sorry</p>" +
                    "<p class=\"success\">We were unable to forward this video at this time. (" + errorThrown + ")</p>" +
                    "<a id=\"close-send-to-friend\" class=\"close-button\">Close</a>" +
                    "</div>"
                );

            }
        });
    
    },

    setVideoSize: function() {

        var div = $( "#video-div" ),
            offset = $( div ).offset().left,
            ratio = 9 / 16,
            video = $( "iframe", div ),
            outerWidth = $( window ).width(),
            innerWidth = outerWidth
                - (offset * 2)
                - parseInt( $( "iframe", div ).css( "borderLeftWidth" ), 10)
                - parseInt( $( "iframe", div ).css( "borderLeftWidth" ), 10); // offset accounts for padding then subtract two for border

        if ( div.length === 0  || outerWidth < 321 ) return;

        if ( innerWidth < 600 ) {

            video.width( innerWidth );
            video.height( innerWidth * ratio );
        } else {
            video.width( 640 );
            video.height( 360 );
        }

    },
    
    setSelectedListing: function() {
        
        var currentPostId = $( "#current-post-id-hidden" ).val();
        $( "#listing-" + currentPostId ).addClass( "selected" );
    
    }

};

var MeToobPage;
$( document ).ready( function() {
    MeToobPage = new MeToob();
    MeToobPage.init();
} );