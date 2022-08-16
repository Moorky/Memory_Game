class ConnectDB {
    getData(str) {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "src/php/getData.php?q=" + str, false);
        ajax.send();
        return ajax.responseText;
    }

    sendData() {

    }
}

export default ConnectDB;