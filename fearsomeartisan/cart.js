$( "#cartNo" ).hide();

$( function() {
    $( "#addtoCart" ).on( "click", function() {
        $( "#cartNo" ).show( "fade" );
        console.log("added!");
        $( "#addtoCart" ).addClass( "disabled" ).text("Added!");
        console.log("disabled!")
    });

  } );
  