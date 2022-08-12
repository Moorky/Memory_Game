<?php

function getScoresFromDB () {
    // Get Userdata
    $sql = "SELECT Username, Score FROM UserData WHERE Score IS NOT NULL ORDER BY Score DESC";
    $result = $_SESSION['conn']->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            echo $row["Username"] . " " . $row["Score"] . "<br>";
        }
    } else {
        echo "No entries.";
    }
    $_SESSION['conn']->close();
}