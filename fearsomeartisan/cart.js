$( "#cartNo" ).hide();

$( function() {
    $( "#addtoCart" ).on( "click", function() {
        $( "#cartNo" ).show( "fade" );
        console.log("added!");
        $( "#addtoCart" ).addClass( "disabled" ).text("Added!");
        console.log("disabled!")
    });

  } );
  

  $( function() {
    $( "#dropdown1" ).on( "click", function() {
        $( "#cartNo" ).show( "fade" ).text("1");
        console.log("1!");
    });

    $( "#dropdown2" ).on( "click", function() {
        $( "#cartNo" ).show( "fade" ).text("2");
        console.log("2!");
    });

    $( "#dropdown3" ).on( "click", function() {
        $( "#cartNo" ).show( "fade" ).text("3");
        console.log("3!");
    });

  } );