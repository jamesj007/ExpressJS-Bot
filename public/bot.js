
//send the bot reply back to the view
module.exports = function(){
    //var regex = new RegExp("(h+e+l+o+)$|(h+e+y+)$, i");

    this.replyBot = function(input){
        if (/(h+e+l+o+)$|(h+e+y+)$/i.test(input)) {
            return ['Hey!!!', '']
        } else if (/image/i.test(input)) {
            return ['Searching for Image...', 'Not found :(']
        } else if (/story/i.test(input)){
            return ["Let's see..", 'Once upon a time . . . a widow had an only son whose name was Aladdin. They were very poor and lived from hand to mouth, though Aladdin did what he could to earn some pennies, by picking bananas in faraway places. SORRY, THATS ALL I GOT']
        } else if (/clear/i.test(input)){
            return ['', 'start_to_clear']
        }
        else {
            return ['Bye!!','']
        }
    }
}
