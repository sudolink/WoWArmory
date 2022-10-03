
function resolveBindingText(bindingInt){        
    let bondingTable = {
        zero: null,
        one: "Binds when picked up",
        two: "Binds when equipped",
        three: "Binds when used",
        four: "Quest Item"
    }
    let bindingText = null
    switch(bindingInt){
        case 0:
            bindingText = bondingTable.zero;
            break;
        case 1:
            bindingText = bondingTable.one;
            break;
        case 2:
            bindingText = bondingTable.two;
            break;
        case 3:
            bindingText = bondingTable.three;
            break;
        case 4:
            bindingText = bondingTable.four;
            break;
        case (bindingInt > 4 || bindingInt < 0):
            bindingText = "unrecognized binding setting"
            break;
    }
    return bindingText;
}

function resolveInvType(invInt){
//     Value	Slot name	       Value	Slot name
//      0	    Not equipable	    15	    Ranged
//      1	    Head	            16	    Cloak
//      2	    Neck	            17	    2H weapon
//      3	    Shoulders	        18	    Bag
//      4	    Body	            19  	Tabard
//      5	    Chest	            20  	Robe
//      6	    Waist	            21  	Weapon, main hand
//      7	    Legs	            22  	Weapon, offhand
//      8	    Feet	            23  	Holdable
//      9	    Wrists	            24  	Ammo
//      10	    Hands	            25  	Thrown
//      11	    Finger	            26  	Ranged, right
//      12	    Trinket	            27  	Quiver
//      13	    Weapon	            28  	Relic
//      14	    Shield
    let invTypePairs = ["Not Equipable","Head","Neck","Shoulders","Shirt","Chest","Waist","Legs","Feet","Wrists","Hands","Finger","Trinket","One-Hand","Off-Hand","Ranged","Cloak","Two-Hand","Bag","Tabard","Robe","Main Hand","Off-Hand","Holdable","Ammo","Thrown","Ranged","Quiver","Relic"]	 	 
    return invTypePairs[invInt];
}

function resolveSubClass(classInt,  subClassInt){
// 0	0	Consumable
// 1	0	Container, Bag
// 1	1	Container, Soul bag
// 1	2	Container, Herb bag
// 1	3	Container, Enchanting bag
// 1	4	Container, Engineering bag
// 2	0	Weapon, Axe 1H
// 2	1	Weapon, Axe 2H
// 2	2	Weapon, Bow
// 2	3	Weapon, Gun
// 2	4	Weapon, Mace 1H
// 2	5	Weapon, Mace 2H
// 2	6	Weapon, Polearm
// 2	7	Weapon, Sword 1H
// 2	8	Weapon, Sword 2H
// 2	10	Weapon, Staff
// 2	13	Weapon, Fist weapon
// 2	14	Weapon, Miscellaneous
// 2	15	Weapon, Dagger
// 2	16	Weapon, Thrown
// 2	17	Weapon, Spear
// 2	18	Weapon, Crossbow
// 2	19	Weapon, Wand
// 2	20	Weapon, Fishing pole
// 4	0	Armor, Miscellaneous
// 4	1	Armor, Cloth
// 4	2	Armor, Leather
// 4	3	Armor, Mail
// 4	4	Armor, Plate
// 4	6	Armor, Shield
// 4	7	Armor, Libram
// 4	8	Armor, Idol
// 4	9	Armor, Totem
// 5	0	Reagent
// 6	2	Projectile, Arrow
// 6	3	Projectile, Bullet
// 7	0	Trade goods, Trade goods
// 7	1	Trade goods, Parts
// 7	2	Trade goods, Explosives
// 7	3	Trade goods, Devices
// 9	0	Recipe, Book
// 9	1	Recipe, Leatherworking
// 9	2	Recipe, Tailoring
// 9	3	Recipe, Engineering
// 9	4	Recipe, Blacksmithing
// 9	5	Recipe, Cooking
// 9	6	Recipe, Alchemy
// 9	7	Recipe, First aid
// 9	8	Recipe, Enchanting
// 9	9	Recipe, Fishing
// 11	2	Quiver
// 11	3	Ammo pouch
// 12	0	Quest
// 13	0	Key
// 13	1	Lockpick
// 15	0	Miscellaneous, Junk
    let items = [
        {"Consumable": [{}]},
        {"Container": ["Bag","Soul Bag", "Herb Bag", "Enchanting Bag", "Engineering bag"]},
        {"Weapon": ["Axe","Axe","Bow","Gun","Mace","Mace","Polearm","Sword","Sword", "empty","Staff","empty","empty","Fist weapon","Miscellaneous","Dagger","Thrown","Spear","Crossbow","Wand","Fishing pole"]},
        {"EMPTY": []},
        {"Armor" : ["Miscellaneous","Cloth","Leather","Mail","Plate","empty","Shield","Libram","Idol","Totem"]},
        {"NO IDENTIFIER" : ["Reagent"]},
        {"Projectile" : ["Arrow","Bullet"]},
        {"Trade goods" : ["Trade goods","Parts","Explosives","Devices"]},
        {"EMPTY": []},
        {"Recipe" : ["Book","Leatherworking","Tailoring","Engineering","Blacksmithing","Cooking","Alchemy","First Aid","Enchanting","Fishing"]},
        {"EMPTY": []},
        {"NO IDENTIFIER" : [null, null, "Quiver","Ammo pouch"]},
        {"NO IDENTIFIER" : ["Quest"]},
        {"NO IDENTIFIER" : ["Key","Lockpick"]},
        {"EMPTY": []},
        {"Miscellaneous" : ["Junk"]}
    ]
    let classType = Object.values(items)[classInt];
    let subclass = Object.values(classType)[0][subClassInt];
    return subclass
}

export {
    resolveBindingText,
    resolveInvType,
    resolveSubClass
}