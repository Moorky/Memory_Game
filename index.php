<?php
session_start();
include 'src/php/connectDB.php';
include 'src/php/signup.php';
include 'src/php/login.php';
include 'src/php/scoreboard.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="src/css/style.css">

    <title>Memory</title>

    <?php
    // Connect to Database
    connectDB();
    ?>
</head>

<body>

<!-- CENTER BOX (GAME) -->
<div class="center-screen">
    <div class="mainFrame" id="login">

        <form action="" method="POST">
            <!-- Content when not logged in -->
            <div id="login">
                <!-- INPUT FIELD -->
                <label>
                    <input type="text" name="username" placeholder="Username" class="input" style="margin-bottom: 10px"><br>
                    <input type="password" name="password" placeholder="Password" class="input"
                           style="margin-bottom: 10px"><br>
                </label>

                <!-- SUBMIT BUTTON -->
                <button type="submit" name="signup" class="button" style="width: 50%; float: left">Signup</button>
                <button type="submit" name="login" class="button" style="width: 50%; float: right">Login</button>
            </div>
        </form>

    </div>

    <div class="mainFrame" id="logged">


        <!-- PREGAME INPUT -->
        <div class="popup">
            <label>

                <select id="mode">
                    <option value="pvp">PvP</option>
                    <option value="pvc">PvC</option>
                </select>

                <input type="text" id="cardCount" placeholder="Amount of cards" class="input">
                <input type="text" id="copyCount" placeholder="Amount of copies" class="input">

                <input type="text" id="player2" placeholder="Player two name" class="input">

            </label>

            <button class="play" id="play">Play</button>
        </div>

        <!-- CARD BOARD -->
        <div class="grid">
        </div>

    </div>
</div>

<!-- TOP RIGHT BOX (LOGIN) -->
<div class="topright-screen">
    <div class="mainFrame" style="min-width: 200px" id="logged">
        <!-- SIGNUP AND LOGIN -->
        <div class="fancyText1">
            <?php

            // SIGNUP
            if (isset($_POST['signup'])) {
                signup();
            }

            // LOGIN
            if (isset($_POST['login'])) {
                login();
            }

            // LOGOUT
            if (isset($_POST['logout'])) {
                session_start();
                $_SESSION = array();
                session_destroy();
            }

            // TOGGLE LOGIN BOX
            //
            // SIGNUP & LOGIN BOX
            if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] === false) {
                ?>
                <style>
                    #logged {
                        display: none;
                    }

                    #login {
                        display: block;
                    }
                </style>
                <?php
            }
            //
            // LOGGED IN BOX
            if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
                ?>
                <style>
                    #login {
                        display: none;
                    }

                    #logged {
                        display: block;
                    }
                </style>
                <?php
            }
            //

            ?>
        </div>

        <form action="" method="POST">

            <!-- Content when logged in -->
            <div style="flex-direction: column">
                <!-- WELCOME MESSAGE -->
                <h1 class="fancyText1" style="font-size: 24px">Welcome, <?= $_SESSION["username"] ?></h1>

                <!-- LOGOUT BUTTON -->
                <button type="submit" name="logout" class="button"
                        style="-ms-transform: translateX(42%); transform: translateX(42%)">Logout
                </button>
            </div>

        </form>
    </div>
</div>

<!-- TOP LEFT BOX (SCOREBOARD) -->
<div class="topleft-screen">
    <div class="mainFrame" id="logged">

        <!-- TITLE -->
        <h1 class="fancyText1" style="font-size: 34px">SCOREBOARD</h1>

        <!-- DATABASE ENTRIES -->
        <div class="fancyText1">
            <?php
            // GETTING SCORES FROM DATABASE IN scoreboard.php
            getScoresFromDB();
            ?>
        </div>
    </div>
</div>

<!-- TOP CENTER BOX (SCORE) -->
<div class="topcenter-screen">
    <div class="mainFrame" id="logged">

        <!-- DATA -->
        <div class="data">
            <div class="fancyText2" style="margin-right: 1em"><span class="scoreBoard_1"></span></div>
            <div class="fancyText3"><span class="scoreBoard_2"></span></div>
        </div>
        <div class="fancyText2"><span class="scoreBoard_turn"></span></div>

    </div>
</div>

<!-- JAVASCRIPT -->
<script src="src/js/initGame.js" type="module"></script>

</body>

</html>