<?php
session_start();

// get the q parameter from URL
$q = $_REQUEST["q"];

// Data cases
if ($q == "username") {
    echo $_SESSION["username"];
} elseif ($q == "highscore") {
    echo $_SESSION["highscore"];
} else {
    echo "unknown parameters";
}
