class Card {

    /**
     * Creates a card instance.
     *
     * @param id number that matches with others card(s), which build a pair
     * @param img image that will be shown once card is selected, has to be the same for each ID
     */
    constructor(id, img) {
        this.id = id;
        this.img = img;
    }

    /**
     * Getter for ID
     *
     * @returns {*}
     */
    getID() {
        return this.id;
    }

    /**
     * Getter for IMG
     *
     * @returns {*}
     */
    getImg() {
        return this.img;
    }

    /**
     * Flip and show card image
     */
    show() {

    }

    /**
     * Flip and hide card image
     */
    hide() {

    }
}