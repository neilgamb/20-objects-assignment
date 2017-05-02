
// Traveler Constructor /////////

function Traveler(name){
    // properties
    this.name = name,
    this.hunger = 0;
    this.home = null;
    this.sick = false,
    this.alive = true,

    // functions
    // 1. hunt | uses 5 ammo from the wagon. There's a 60% chance of getting 200 food and 40% chance of getting nothing. 
    //           If you don't have ammo, you don't get to hunt.
    this.hunt = function(){
        if (this.home === null){console.log('sorry, ' + this.name + ' does not belong to a wagon'); return}
            else if(this.home.ammo < 5){return}
                else if (Math.random() >= 0.6){this.home.food = this.home.food + 200} 
                    else {this.home.food = this.home.food + 0};

        this.home.ammo = this.home.ammo - 5;
    };

    // 2. eat | consumes 10 of the wagon's food if the person is healthy or 20 if they're sick. Decreases hunger by 25.
    this.eat = function(){
        if (this.home === null){console.log('sorry, ' + this.name + ' does not belong to a wagon'); return}
            else if (this.sick === true && this.home.food < 20){this.hunger = this.hunger + 10; return}
                else if (this.sick === false && this.home.food < 10){this.hunger = this.hunger + 10; return}
                    else if (this.sick === true){this.home.food = this.home.food - 20}
                        else {this.home.food = this.home.food - 10} 

        this.hunger = this.hunger - 25;
    };

    // 3. sidekicks | returns the number of members in the wagon not counting the current person
    this.sidekicks = function(){
        if (this.home === null){console.log('sorry, ' + this.name + ' does not belong to a wagon'); return}
            else {console.log(this.home.travelers.length - 1)};
    };

}

// Wagon Constructor /////////

function Wagon(capacity){

    // properties
    this.day = 1,
    this.capacity = capacity,
    this.food = 500,
    this.ammo = 500,
    this.travelers = [];

    // functions
    // 1. join | adds traveler to the wagon, assuming there's enough space
    this.join = function(traveler){
        if(this.capacity - this.travelers.length > 0){
            this.travelers.push(traveler);
            traveler.home = this;
        } else {console.log("Sorry, no room for " + traveler.name)}
    };

    // 2. quarantine | returns true if anyone is sick
    this.quarantine = function(){
        let anySick = false;

        for(let i = 0; i < this.travelers.length; i++){
            if(this.travelers[i].sick === true){
                anySick = true;   
            }
        }

        // console.log(anySick);
        return anySick;

    };

    // 3. ready | returns the number of travelers that are alive and ready to travel
    this.ready = function(){
        let readyCount = 0;
        
        for(let i = 0; i < this.travelers.length; i++){
            if(this.travelers[i].alive === true){
                readyCount++; 
            }
        }
        
        // console.log(readyCount);
        return readyCount;
    };

    // 4. next | advances time to the next 'day', and the following occurs:
    this.next = function(){
        // + The wagon's day increases by one.
             this.day = this.day + 1;

             for(let i = 0; i < this.travelers.length; i++){
                     // + Try to eat, adjust hunger accordingly
                     this.travelers[i].eat();
                    //  this.travelers[i].hunger = this.travelers[i].hunger + 10;   

                     // + If any traveler's hunger reaches 100, that person dies (alive = false)
                     if(this.travelers[i].hunger >= 100){
                         this.travelers[i].alive = false}

                     // + If anyone is sick on the wagon, there's a 15% chance each other person will get sick. 
                    if(this.quarantine() === false){
                        if (Math.random() >= 0.15){this.travelers[i].sick = true}

                    //   If not, there's a 5% chance each other person will get sick.
                    } else if (Math.random() >= 0.05){this.travelers[i].sick = true}
                
                    // + If someone is sick, they have a 20% chance of becoming healthy.
                    if(this.travelers[i].sick === true){
                            if (Math.random() >= 0.20){this.travelers[i].sick = false}
                    }

                }  

                this.travelers[0].hunt();     
             }
    };



function play() {
  /* no need for an i variable -- semicolons are still important */
  for (; wagon1.ready() !== 0;) {
    wagon1.next();
  }

  
}



// GAMEPLAY TESTING
let wagon1 = new Wagon(6);

let wiley = new Traveler('Wiley');
let buck = new Traveler('Buck');
let bill = new Traveler('Bill');
let butch = new Traveler('Butch');
let jack = new Traveler('Jack');

let sarah = new Traveler('Sarah');
let bonnie = new Traveler('Bonnie');
let jessie = new Traveler('Jessie');
let jill = new Traveler('Jill');




wagon1.join(wiley);
wagon1.join(buck);
wagon1.join(bill);
wagon1.join(butch);
wagon1.join(jack);
wagon1.join(sarah);


play();
console.log(wagon1.day);






