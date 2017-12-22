# Express-Bot
Simple bot that is implemented through Express. Primarily for learning JavaScript in my free time.

It was another attempt to learn ExpressJS as well as JavaScript. Some clean-up and commenting is necessary as of now. 

Typing in stuff like "Hey" or "Hello" are recognized by the bot through regexes and the appropriate response is given. 

Also note that the bot uses Google Directions API to tell the user how much time it will take the user to get to his home. 

Essentially type in "home" into the chatbox to have the bot respond by saying how much time it will take you to get home from work. 

Adjust the configs.json file in the public directory with your home address and your work longitude and work latitude (there is an option for work address but that is optional. For some reason if the first parameter is in the form of a string, the call to the API does not work). 

The latitude and the longitude are just numerical values, however, for the address it should be formatted correctly in order for the call to work correctly. 

For example, if your address is 111 N. John Doe St. Phoenix AZ, then the home_address would be formatted likewise (the input for the other values are shown as well):

    "home_address": "111+North+John+Doe+Street+Phoenix+AZ",
    "work_lat" : "35.090898",
    "work_long" : "-105.238488",
