
//create object called user. Can add more attributes as functionality changes.
var user = {
    isSpeaking: true
};

var userInput, replyInput = "";
var secReply = "";

//make sure the page is loaded before accessing any elements on the page.
$(document).ready(function(){

  //when the user click the send button
  $("#sendBtn").click(function(){
    userInput=$("#mainInput").val() + "";
    $("#mainInput").val("");

    //print the user input to the view.
    if (user.isSpeaking){
        replyInput = "User: " + userInput + "\n";
        $('#chat').val( $('#chat').val() + replyInput);
    }

    //get the bot reply by making a post request.
    $.ajax({
        url: "/",
        type: "POST",
        dataType: "json",
        data: {usrInput: userInput},
        //contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
          console.log('process complete');
        },

        success: function(data) {
            //test to see if the appropriate data is recieved from the bot.
          console.log(data['reply'][0]);
          console.log(data['reply'][1]);

          //UGLY: Primarily used to make the bot wait a bit before outputting result to emulate a "thinking" effect.
          setTimeout(function(){
              if (data['reply'][0] !== ""){
                  replyInput = "Bot: " + data['reply'][0] + '\n';
              }
              secReply = "Bot: " + data['reply'][1] + '\n';
              $('#chat').val( $('#chat').val() + replyInput);

          }, 1300);

          if (data['reply'][1] !== '') {
              if (data['reply'][1] === 'start_to_clear'){
                  $('#chat').val('');
              } else {
                  setTimeout(function(){
                      $('#chat').val( $('#chat').val() + secReply);
                  }, 3000);
              }
          }

          console.log('process sucess');
        },

        error: function() {
          console.log('process error');
        },
      });

    });
    console.log(replyInput);

});
