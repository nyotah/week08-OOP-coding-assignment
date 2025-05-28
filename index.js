//INSTRUCTIONS
//create a menu app as seen in this week's video
//use at least one array
//use at least two classes
//menu should have the options to create, view, and delete elements 

//MY MENU
//I've chosen to make a menu app that displays a cart and lets users create new shopping carts, add items, delete items, and view the carts 

class Item { //creating a class to compose each item within the cart, assigning a name and quantity to each item
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    describe() {
        return `${this.quantity} x ${this.name}`;
    }
}

class Cart { //creating a class to hold all of the items in my cart 
    constructor(name) {
        this.name = name;
        this.items = []; //creating an empty array to hold new items 
    }

    addItem(item) {
        if (item instanceof Item) {
            this.items.push(item); //adding new items to the empty array 
        } else {
            throw new Error('Only instances of Item can be added.');
        }
    }

    describe() {
        return `${this.name} has ${this.items.length} item(s).`;
    }
}

class Menu { // creating the main menu - allows users to start the app, view the menu, and then view/delete/add carts and items. 
    constructor() {
        this.carts = [];
        this.selectedCart = null;
    }

    start() {
        let selection = this.showMainMenuOptions(); //creating the main menu
        while (selection != '0') {
            switch (selection) {
                case '1':
                    this.createCart(); //adding cases to represent the selection options on the manu menu
                    break;
                case '2':
                    this.viewCart();
                    break;
                case '3':
                    this.deleteCart();
                    break;
                case '4':
                    this.displayCarts();
                    break;
                default:
                    selection = '0';
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() { //uses "prompt" to accept input from the user about where they want to navigate regarding carts and uses indexes to do so. 
        return prompt(` 
0) Exit
1) Create new cart
2) View cart
3) Delete cart
4) Display all carts
        `);
    }

    showCartMenuOptions(cartInfo) { // uses "prompt" to accept input from user about what they want to do regarding items. 
        return prompt(`
0) Back
1) Add item
2) Delete item
-------------------
${cartInfo}
        `);
    }

    createCart() {
        let name = prompt('Enter a name for the new cart:');
        this.carts.push(new Cart(name)); // create cart by adding a new name and then pushing it aka creating a new instance of the Cart class. 
    }

    displayCarts() { 
        let cartString = ''; //creating empty string 
        for (let i = 0; i < this.carts.length; i++) { //using a for loop to iterate through the length of the this.carts array in Menu class. 
            cartString += i + ') ' + this.carts[i].name + '\n'; // adding the cart as well as it's index number to the list of current carts to display. 
        }
        alert(cartString); 
    }

    viewCart() { //viewing a specific cart
        let index = prompt('Enter the index of the cart you want to view:');
        if (index > -1 && index < this.carts.length) {
            this.selectedCart = this.carts[index];
            let description = 'Cart Name: ' + this.selectedCart.name + '\n';

            for (let i = 0; i < this.selectedCart.items.length; i++) {
                description += i + ') ' + this.selectedCart.items[i].describe() + '\n';
            }

            let selection = this.showCartMenuOptions(description); 
            switch (selection) {
                case '1':
                    this.addItem();
                    break;
                case '2':
                    this.deleteItem();
                    break;
            }
        }
    }

    deleteCart() {
        let index = prompt('Enter the index of the cart you wish to delete:');
        if (index > -1 && index < this.carts.length) {
            this.carts.splice(index, 1);
        }
    }

    addItem() {
        let name = prompt('Enter item name:');
        let quantity = prompt('Enter quantity:');
        this.selectedCart.addItem(new Item(name, quantity));
    }

    deleteItem() {
        let index = prompt('Enter the index of the item to delete:');
        if (index > -1 && index < this.selectedCart.items.length) {
            this.selectedCart.items.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();