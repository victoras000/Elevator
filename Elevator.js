//Elevators A and B are created at their designated place using the CreateElevator function which is descirbed below

a = createElevator('A', 0)
b = createElevator('B', 6)

//CallElevator function is basicly the buttons in each floor that will call the elevator

function callElevator(f) {
    console.log('Elevator called from floor ' + f)
//st is the state, I is idle, D is down, U is up
    if (a.st == 'I' && b.st == 'I') {
//f is floor that has been called, cf is current floor, da/db distance from the floor to the destination, ce is which elevator is going
        da = Math.abs(f-a.cf);
        db = Math.abs(f-b.cf)
        if (da != db) {
            if (da < db) {
                ce = a;
            } else {ce = b;}
        } else {
            if (a.cf < b.cf) {
                ce = a;
            } else {ce = b;}
        }
    } else if (a.st == 'I' || b.st == 'I') {
        ce = a.st = 'I' ? a : b;
    } else {
        
        console.log('busy');
    }
    //a display button is in each floor indicating where the elevator is coming from up or down
    update_button(f, ce.cf < f ? 'U' : 'D');
    console.log('Elevator ' + ce.name + ' goes to ' + 'floor ' + f);
    //elevator moves to the destination
    ce.move(f);
    //display button goes idle
    update_button(f, '');
}
//CreaterElevator creates elevators with a certain name and a starting floor
function createElevator(name, cf) {
    const obj = {};
//elevator is given name, curent floor, state, and a move function
    obj.name = name;
    obj.cf = cf;
    obj.st = 'I';
    obj.move = function(f) {
        if (f < obj.cf) {
//changes the state from idle to down if condition is met while updating the display and logs for each floor
            obj.st = 'D';
            console.log(obj.name + ' goes down');
            while (obj.cf != f) {
                obj.cf -= 1;
                update_display(obj, obj.cf);
                console.log(obj.name + ' is at ' + obj.cf);
            }
//state is back to idle after reaching destination
            obj.st = 'I';
        } else {
//changes the state from idle to up...
            obj.st = 'U';
            console.log(obj.name + ' goes up');
            while (obj.cf != f) {
                obj.cf += 1;
                update_display(obj, obj.cf);
                console.log(obj.name + ' is at ' + obj.cf);
            }
            obj.st = 'I';
        }
      console.log('Elevator ' + obj.name + ' is at ' + f);
    };
    return obj;
  }
//update_display updates the display inside the elevator in order to display the current floor everytime it it changing
function update_display(elevator, cf) {
    document.getElementById("display" + elevator.name).getElementsByClassName("cf")[0].classList.remove('cf');
    document.getElementById("d" + elevator.name + cf).classList.add('cf');
}
//updates the buttons to display the direction from which the elevator is coming from or nothing if the elevator is idle
function update_button(f, st) {
    document.getElementById('f' + f + 'd').innerText = st;
}
//unfortunately I wasn't able to get a proper delay function to work in order for the transition of the elevators to be seen :(
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
