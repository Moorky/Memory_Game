class Card {

    /**
     * Creates a card instance.
     *
     * @param {int} id number that matches with others card(s), which build a pair
     * @param {object} img image that will be shown once card is selected, has to be the same for each ID
     */
    constructor(id, img) {
        this.id = id;
        this.img = img;
    }

    /**
     * Getter for ID.
     *
     * @returns {int}
     */
    getID() {
        return this.id;
    }

    /**
     * Getter for IMG.
     *
     * @returns {object}
     */
    getImg() {
        return this.img;
    }

    /**
     * Flip and show card image.
     */
    show() {

    }

    /**
     * Flip and hide card image.
     */
    hide() {

    }
}