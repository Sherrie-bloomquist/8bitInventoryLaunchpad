//-----properties by which searches can be done------//
var sizes = [ 'small', 'medium', 'large' ];
var colors = [ 'red', 'orange', 'yellow', 'green', 'mermaid treasure', 'blue', 'purple' ];

//----global array of items in inventory----//
var items = [];
var matches = [];

//----document ready function------//
$( document ).ready( function(){


  //----searchButton on click appends search results to DOM-----//
    $('#searchButton').on('click', function(){
      console.log('seach button clicked');

      for ( var i = 0; i < items.length; i++ ) {
        if( items[i].color == $('#searchColorIn').val() && items[i].size == $('#searchSizeIn').val() ){
          // match, add to array
          matches.push( items[i] );
          $('#appendToDom').append(matches[i]);
        } // end if
      } // end for
    });//end searchButton on click




//---------get response from database/server and push into items array----//
  var getObjects = function(){
    console.log( 'in getObjects');

    $.ajax ({
      url: '/getInventory',
      type: 'GET',
      success: function(response){
        console.log('response from db', response);
        items.push(response);
      }//end success function
    });//end ajax call
  };//end getObjects function


//-------create the dropdown options in the selector fields-------//
    var selectorOptions = function(){
      for (var i = 0; i < sizes.length; i++) {
        $('#sizeIn').append( '<option>' + sizes[i] + '</option>' );
      }// end sizeIn for loop
      for (var i = 0; i < colors.length; i++) {
        $('#colorIn').append( '<option>' + colors[i] + '</option>' );
      }// end colorIn for loop

      for (var i = 0; i < sizes.length; i++) {
        $('#searchSizeIn').append( '<option>' + sizes[i] + '</option>' );
      }// end searchSizeIn for loop
      for (var i = 0; i < colors.length; i++) {
        $('#searchColorIn').append( '<option>' + colors[i] + '</option>' );
      }// end searchColorIn for loop
    };


//--------addItem button click, sends values entered to server----//
    $('#addItem').on('click', function(){
      sendObjects();
    });//end addItem on click

    var sendObjects = function(){
      var objectToSend = {
        size: $('#sizeIn').val(),
        color: $('#colorIn').val(),
        name: $('#itemName').val(),
      }; //end objectToSend

      $.ajax({
        url: '/addItem',
        type: 'POST',
        data: objectToSend,
        success: function(response){
          console.log('response from server', response);
        }//end success function
      });//end ajax call
    };//end sendObjects function




//-----run these function on page load-----//
  selectorOptions();
  getObjects();

}); // end doc ready
