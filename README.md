An attempt to emulate World of Warcraft's Armory functionality. Needs an API server that feeds it data from a mysql db (built for the vmangos emulation pack), the wowarmoryapiserver in my repos was made for this.

Basic functionality available right now. It probably breaks easily with unintended use at the moment.

Character profession/talent/skill processing is currently in the works. Since I didn't find an embeddable version of a simple character talent display, I'll have to make it myself.  The define files (.dbc) are currently client side and make the website load very sluggishly (some files are several dozen MBs large). Will have to move all those to the API server repo and port the resolve defines logic to there.

Outdated demo available @ http://139.177.183.157/