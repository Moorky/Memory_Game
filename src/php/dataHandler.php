<?php
session_start();
require_once 'connectDB.php';

// get the q parameter from URL
$q = $_REQUEST["q"];

// Data cases
switch ($q) {

    case "username":
        echo $_SESSION["username"];
        break;

    case "highscore":
        echo $_SESSION["highscore"];
        break;

    default:
        // Create connection to database
        $conn = connectDB();

        // save highscore in database if the query contains "score="
        if (strpos($q, "score:") !== false) {

            $_SESSION["highscore"] = explode(':', $q)[1];
            $sql = "UPDATE UserData SET Score = ? WHERE Username = ?";

            if ($stmt = mysqli_prepare($conn, $sql)) {
                // Bind variables to the prepared statement as parameters
                mysqli_stmt_bind_param($stmt, "ss", $_SESSION["highscore"], $_SESSION["username"]);

                if (!mysqli_stmt_execute($stmt)) {
                    echo "Could not save highscore!";
                }

                // Close statement
                mysqli_stmt_close($stmt);
            }
        }

        // for wrong parameter input
        else {
            echo "invalid parameters";
        }
}