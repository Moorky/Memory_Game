class ConnectDB {

    /**
     * Gets or sets data from the server, depending on the parameter given.
     * Visit dataHandler.php for more information.
     *
     * @param str
     * @returns {string}
     */
    dataHandler(str) {
        const ajax = new XMLHttpRequest();
        ajax.open("GET", "src/php/dataHandler.php?q=" + str, false);
        ajax.send();
        return ajax.responseText;
    }
}

export default ConnectDB;