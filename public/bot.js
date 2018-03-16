
//send the bot reply back to the view
//this is me just playing around and trying to learn JavaScript. Proceed with danger. 
module.exports = function(){
    //var regex = new RegExp("(h+e+l+o+)$|(h+e+y+)$, i");

    //some basic regex to capture basic conv.
    this.replyBot = function(input){
        if (/(h+e+l+o+)$|(h+e+y+)$/i.test(input)) {  //hello
            return ['Hey!!!', '']
        } else if (/image/i.test(input)) { //I wanted to implement a image search functionality, but didnt get around to it
            return ['Searching for Image...', 'Not found :(']
        } else if (/story/i.test(input)){ //Have the bot repond with a story. I only had one.
            return ["Let's see..", 'Once upon a time . . . a widow had an only son whose name was Aladdin. They were very poor and lived from hand to mouth, though Aladdin did what he could to earn some pennies, by picking bananas in faraway places. SORRY, THATS ALL I GOT']
        } else if (/clear/i.test(input)){ //clear chat
            return ['', 'start_to_clear']
        }
        else {
            return ['Bye!!','']
        }
    }
}
