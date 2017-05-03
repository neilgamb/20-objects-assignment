//// TRAVELERS ///////////////////////////////////////////////////////////////////////////////////////

function Traveler (){

}

// Hunter | Has an 80% chance of a successful hunt, but eats 2x more food than a base traveler.

function Hunter(name){
    // hunter properties
    this.name = name;
    this.hunger = 50;
    this.home = null;
    this.sick = false;
    this.alive = true;
    this.heal = 0;
    this.ammoAdd = 0;
    this.huntProb = .8;
    this.eatRate = 2;

    return this;
}

Hunter.prototype = new Traveler();  


// Doctor | Gives sick people a 50% chance of recovering from illness each day, but consumes 3x more 
//          food than usual.

function Doctor(name){
    // doctor traveler properties
    this.name = name;
    this.hunger = 50;
    this.home = null;
    this.sick = false;
    this.alive = true;
    this.huntProb = .6;
    this.ammoAdd = 0;
    this.eatRate = 3;
    this.heal = .5;

    return this;
}

Doctor.prototype = new Traveler();  


// Gunsmith | Creates one new piece of ammo per day and consumes a normal amount of food.

function Gunsmith(name){
    // gunsmith traveler properties
    this.name = name;
    this.hunger = 50;
    this.home = null;
    this.sick = false;
    this.alive = true;
    this.huntProb = .6;
    this.eatRate = 1;
    this.heal = 0;
    this.ammoAdd = 1;

    return this;
}

Gunsmith.prototype = new Traveler();  

// Monk | Consumes half the food of a normal person but has a 0% chance of succeeding at a hunt.

function Monk(name){
    // monk traveler properties
    this.name = name;
    this.hunger = 50;
    this.home = null;
    this.sick = false;
    this.alive = true;
    this.heal = 0;
    this.ammoAdd = 0;
    this.eatRate = .5;
    this.huntProb = 0;

    return this;
}

Monk.prototype = new Traveler();  


// Traveler Functions

    // 1. hunt | Uses 5 ammo from the wagon. There's an [huntProb]% chance of getting 200 food and 
    //           [100-huntProb]% chance of getting nothing. If you don't have ammo, you don't get to hunt.

    Traveler.prototype.hunt = function(){
        if (this.home === null){console.log('sorry, ' + this.name + ' does not belong to a wagon'); return}
            else if(this.home.ammo < 5){return}
                else if (Math.random() <= this.huntProb){this.home.food = this.home.food + 200} 

        this.home.ammo = this.home.ammo - 5;

        if(this.home.food > this.home.maxFood){this.home.food = this.home.maxFood};
    };

    // 2. eat | Consumes [10 * eatRate] of the wagon's food if the person is healthy or [20 * eatRate] if 
    //          they're sick. Decreases hunger by 25.

    Traveler.prototype.eat = function(){
        if (this.home === null){
            console.log('sorry, ' + this.name + ' does not belong to a wagon'); 
            return
        }
            else if (this.sick === true && this.home.food < (20 * this.eatRate)){
                this.hunger = this.hunger + 10; 
                return
            }
                else if (this.sick === false && this.home.food < (10 * this.eatRate)){
                    this.hunger = this.hunger + 10; 
                    return
                }
                    else if (this.sick === true){
                        this.home.food = this.home.food - (20 * this.eatRate);
                    }
                        else {this.home.food = this.home.food - (10 * this.eatRate);}

        this.hunger = this.hunger - 25;
        if(this.hunger < 0){this.hunger = 0};
    }

    // 3. sidekicks | Returns the number of members in the wagon not counting the current person.

    Traveler.prototype.sidekicks = function(){
        if (this.home === null){console.log('sorry, ' + this.name + ' does not belong to a wagon'); return}
            else { return this.home.travelers.length - 1};
    }


//// WAGONS ///////////////////////////////////////////////////////////////////////////////////////////

function Wagon(){

}

// Light | Only capable of carrying 250lbs of food but covers 3x miles per day.

function LightWagon(capacity){

    // light wagon properties
    this.day = 1,
    this.miles = 0,
    this.capacity = capacity,
    this.food = 100,
    this.ammo = 40,
    this.travelers = [];
    this.mileRate = 3;
    this.maxFood = 250;

    return this;
}

LightWagon.prototype = new Wagon();  

// Heavy | Capable of carrying 600lbs of food but only covers 3x miles per day.

function HeavyWagon(capacity){

    // heavy wagon properties
    this.day = 1,
    this.miles = 0,
    this.capacity = capacity,
    this.food = 200,
    this.ammo = 80,
    this.travelers = [];
    this.mileRate = 1;
    this.maxFood = 600;

    return this;
}

HeavyWagon.prototype = new Wagon();  

// Wagon Functions

    // 1. join | adds traveler to the wagon, assuming there's enough space

    Wagon.prototype.join = function(traveler){
        if(this.capacity - this.travelers.length > 0){
            this.travelers.push(traveler);
            traveler.home = this;
        } else {console.log("Sorry, no room for " + traveler.name)}
    };

    // 2. quarantine | returns true if anyone is sick

    Wagon.prototype.quarantine = function(){
        let anySick = false;

        for(let i = 0; i < this.travelers.length; i++){
            if(this.travelers[i].sick === true){
                anySick = true;   
            }
        }

        return anySick;
    }

    // 3. ready | returns the number of travelers that are alive and ready to travel

    Wagon.prototype.ready = function(){
        let readyCount = 0;
        
        for(let i = 0; i < this.travelers.length; i++){
            if(this.travelers[i].alive === true){
                readyCount++;    
            }
        }
        
        return readyCount;
    }

    // 4. checkDoc | checks to see if there is a doctor on board

    Wagon.prototype.checkDoc = function (){
        let doc = false;

        for (let i = 0; i < this.travelers.length; i++){
            if(this.travelers[i].heal === .5){
                doc = true;
        }
    }
            return doc;

    }

    // 5. checkGS | checks to see if there is a gunsmith on board

    Wagon.prototype.checkGS = function (){
        let gs = false;

        for (let i = 0; i < this.travelers.length; i++){
            if(this.travelers[i].ammoAdd === 1){
                gs = true;
        }
    }
            return gs;

    }

    // 6. next | advances time to the next 'day', and the following occurs:

    Wagon.prototype.next = function (){
        // + The wagon's day increases by one and miles by [mileRate * 30]
             this.day = this.day + 1;
             this.miles = this.miles + (this.mileRate * 30);

        // + If there is a doctor on board the wagon, cycle through each traveler
        //   to find anyone that is sick.  If no sick people, return.  If there are 
        //   any sick travelers, Doctor will use his 50% healing power to try and heal them.

            // if(this.checkDoc() === true){
            //     for(let i = 0; i < this.travelers.length; i++){
            //         if(this.travelers[i].sick === false){}
            //             else if(Math.random() <= 0.5){this.travelers[i].sick = false}
            //     }
            // }

        // + If there is a gunsmith on board, adds 1 ammo to wagon's ammo stock

            if(this.checkGS() === true){
                this.ammo = this.ammo + 1;
            }
            
             for(let i = 0; i < this.travelers.length; i++){
                     // + Try to eat, adjust hunger accordingly
                     this.travelers[i].eat();

                     // + If any traveler's hunger reaches 100, that person dies (alive = false)
                     if(this.travelers[i].hunger >= 100){
                         this.travelers[i].alive = false}

                     // + If anyone is sick on the wagon, there's a 15% chance each other person will get sick. 
                    if(this.quarantine() === true){
                        if (Math.random() >= 0.15){this.travelers[i].sick = true}

                    //   If not, there's a 5% chance each other person will get sick.
                    } else if (Math.random() >= 0.05){this.travelers[i].sick = true}
                    
                    // + If someone is sick, they have a 20% chance of becoming healthy.
                    if(this.travelers[i].sick === true && this.checkDoc() === true){
                            if(Math.random() <= 0.50){this.travelers[i].sick = false}
                    }
                    else if (this.travelers[i].sick === true && this.checkDoc() === false){
                            if(Math.random() <= 0.20){this.travelers[i].sick = false}
                    }

                }  

                // this.travelers[(Math.)].hunt();  // NEEDS TO BE RANDOM   

                this.travelers[Math.floor(Math.random() * this.travelers.length)].hunt();
    }

// Run / play function

function play() {
  for (; wagon1.ready() !== 0;) {
    wagon1.next();
  }

  for (; wagon2.ready() !== 0;) {
    wagon2.next();
  }
}


//// GAMEPLAY ///////////////////////////////////////////////////////////////////////////////////////////

// Create Wagons
let wagon1 = new LightWagon(4);
let wagon2 = new HeavyWagon(6);

// Load Wagon 1
let wiley = new Hunter('Wiley');
let bill = new Doctor('Bill');
let sarah = new Gunsmith('Sarah');
let bonnie = new Monk('Bonnie');

wagon1.join(wiley);
wagon1.join(bill);
wagon1.join(sarah);
wagon1.join(bonnie);

// Load Wagon 2
let butch = new Gunsmith('Butch');
let jack = new Monk('Jack');
let buck = new Hunter('Buck');
let jessie = new Doctor('Jessie');
let jill = new Hunter('Jill');
let will = new Gunsmith('Will');

wagon2.join(butch);
wagon2.join(jack);
wagon2.join(buck);
wagon2.join(jessie);
wagon2.join(jill);
wagon2.join(will);

// Run Game
play();
console.log('')
console.log('=========================== RESULTS ============================')
console.log('')
console.log('--------------------------- WAGON 1 ----------------------------')
console.log("Everyone perished on day " + wagon1.day + " of Wagon 1's voyage.  They made it " + wagon1.miles + " miles before succumbing to the many deadly realities of the infamous Oregon Trail...");
console.log('')
console.log('--------------------------- WAGON 2 ----------------------------')
console.log("Everyone perished on day " + wagon2.day + " of Wagon 2's voyage.  They made it " + wagon2.miles + " miles before succumbing to the many deadly realities of the infamous Oregon Trail...");
