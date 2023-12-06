
//variable for the regular expression used to validate if the user only typed letters and at least 1 char 
var nameRE = new RegExp("^[A-Za-z]{1,}$");
//variable for the regular expression used to validate if the user only typed numbers and at least 9 char 
var phoneRE = new RegExp("^[0-9]{9,}$");
//start of vue js
let schoolapp = new Vue({
    el: "#app",
    data: {
        //variables
        sitename: "After School Club app",
        //products gets data in json format from products.js
        products: products,
        //used to store products in cart  
        cart: [],
        //variable that shows lesson or checkout page depending on value
        showLesson: true,
        //variable to store user input
        sortOption: "price",
        sortOrder: 1,
        searchInput: "",
        //save user details for order
        order: {
            name: "",
            phone: "",
        }
    },
    methods: {
        //when called pushes product.id to the cart[] and takes 1 from that product space
        addItemToCart: function (product) {
            this.cart.push(product.id);
            product.space--;
        },
        //function used to change from lesson and checkout page changing showLesson value through changing its last value
        showCheckout: function () {
            if (this.showLesson) {
                this.showLesson = false
            } else {
                this.showLesson = true
            }
        },
        //to enable the button to add lessons to the cart, if no space is available all button is disabled
        lessonHaveSpace(product) {
            return product.space > this.cartCount(product.id);
        },
        //function to get how many lessons a product still has
        itemsLeft(product) {
            return product.space - this.cartCount(product.id);
        },
        //function to make a counter to show number of items in cart in checkout button
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    return count++;
                }
            }
            return count;
        },
        //function to make a counter to show number of items in cart in checkout page
        lessonCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        //shows all lessons added to the cart and if the id matches is shows on the cart page
        displayCart(id) {
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    return true;
                }
            }
            return false;

        },
        //removes one of the items in the array checking if product id matches with the id in the cart
        //if it does removes 1 item starting in the index of the array and adds 1 to space of that product
        remove(product) {
            let i = this.cart.indexOf(product.id);
            if (this.cart[i] === product.id) {
                this.cart.splice(i, 1);
            }
            product.space++;
        },
        //finish order process with a notification so the user knows progress has been made and refreshes the page to start over
        finalizeOrder() {
            alert('Thank you, the order is placed!');
            location.reload();
        },
    },
    computed: {
        //counts the cart[] length and returns it
        searchedAndSortedLessons: function() {
            let result = this.products;
            let query = this.searchInput.toLowerCase();
            if(query!==""){
                result = result.filter(product => {
                    return (product.title.toLowerCase().includes(query) ||
                        product.location.toLowerCase().includes(query))
                })
            }
            return result.sort((a, b) => {
                return this.sortOrder * (a[this.sortOption] > b[this.sortOption] ? 1 : -1);
            });
        },
        itemInTheCart: function () {
            return this.cart.length || "";
        },
        //sorting price ascending
        //validate checkout inputs
        checkoutVali() {
            return (!nameRE.test(this.order.name) || !phoneRE.test(this.order.phone));
        },
        //my search but doesnt work for some reason, first I convert every string into lower cases
        //query gets input in all lowercases then with the use of filter I compare both strings and returns if they match
        

    }

});
