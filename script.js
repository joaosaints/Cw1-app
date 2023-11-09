let schoolapp = new Vue({
    el: "#app",
    data: {
        sitename: "After School Club app",
        lesson: {
            id: 1,
            title: "Maths",
            location: "London",
            price: 50,
            space: 5,
            image: ""
        },
        cart: [],
    },
    methods: {
        addItemToCart: function () {
            this.cart.push(this.lesson.id);
        }
    },
    computed: {
        itemInTheCart: function () {
            return this.cart.lenght || "";
        }
    }
});