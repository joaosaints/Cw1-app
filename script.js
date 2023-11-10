let schoolapp = new Vue({
    el: "#app",
    data: {
        sitename: "After School Club app",
        lesson: {
            id: 1,
            title: "Maths",
            location: "London",
            price: 50,
            space: 10,
            image: ""
        },
        cart: [],
        showLesson: true,
        order: {
            name: "",
            surname: "",
            zip: "",
        }
    },
    methods: {
        addItemToCart: function () {
            this.cart.push(this.lesson.id);
        },

        showCheckout: function () {
            if (this.showLesson) {
                this.showLesson = false
            } else {
                this.showLesson = true
            }
        }
    },
    computed: {
        itemInTheCart: function () {
            return this.cart.length || "";
        },

        lessonHaveSpace() {
            return this.lesson.space > this.itemInTheCart;
        },

        itemsLeft() {
            return this.lesson.space - this.itemInTheCart;
        }
    }
});