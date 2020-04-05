/****************************
 * Filename: karateIsland.js
 * Purpose: Learning Javascript
 * Author: YS
 * Date: 5.4.2020
 ****************************/

class Weapon {
    attackSound = "Hit";

    constructor(type, damage) {
        this.type = type;
        this.damage = damage;
    }

    attack() {
        return this.attackSound;
    }
}

class Wand extends Weapon {
    attackSound = "Fshhhh";
}

class Sword extends Weapon {
    attackSound = "Swinggg";
}

class Axe extends Weapon {
    attackSound = "Achtshhhh";
}

class Hammer extends Weapon {
    attackSound = "Boomm";
}

class BowAndArrow extends Weapon {
    attackSound = "Shboinggg";
}

class Player {
    static validWeaponTypes = [Weapon];

    constructor(name, gender, weapon) {
        this.name = name;
        this.gender = gender;
        this.checkWeapon(weapon);
        this.weapon = weapon;
    }

    checkWeapon(weapon) {
        for (let weaponType of this.constructor.validWeaponTypes) {
            console.log(weaponType);
            if(weapon instanceof weaponType) {
                return;
            }
        }
        throw new Error("Invalid weapon type!");
    }

    attack(){
        return `${this.name} Attacked with ${this.weapon.damage} Damage! ${this.weapon.attack()}`
    }
}

class ClassPlayer extends Player {
    attack() {
        return `The ${this.constructor.name} ${super.attack()}`;
    }
}

class Warrior extends ClassPlayer {
    static validWeaponTypes = [Hammer, Axe, Sword];
}

class Mage extends ClassPlayer {
    static validWeaponTypes = [Wand];
}

class Archer extends ClassPlayer {
    static validWeaponTypes = [BowAndArrow];
}