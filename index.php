<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="assets/style/style.css">

    <title>Memory</title>
</head>

<body>

<!-- TOP RIGHT BOX (LOGIN) -->
<div class="topright-screen">
    <div class="mainFrame">
        <form action="" method="POST">

            <!-- Content when not logged in -->
            <div id="login">
                <!-- INPUT FIELD -->
                <form>
                    <input type="text" name="username" placeholder="Username" class="input" style="margin-bottom: 10px"><br>
                    <input type="password" name="password" placeholder="Password" class="input"
                           style="margin-bottom: 10px"><br>
                </form>

                <!-- SUBMIT BUTTON -->
                <button type="submit" name="signup" class="button" style="width: 50%; float: left">Signup</button>
                <button type="submit" name="login" class="button" style="width: 50%; float: right">Login</button>
            </div>

            <!-- Content when logged in -->
            <div id="logged" style="flex-direction: column">
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

<!-- CENTER BOX (GAME) -->
<div class="center-screen">
    <div class="mainFrame">


        <!-- PREGAME INPUT -->
        <div class="popup">
            <label>

                <select id="mode">
                    <option value="solo">Solo</option>
                    <option value="pvp">PvP</option>
                    <option value="pvc">PvC</option>
                </select>

                <input type="text" id="cardCount" placeholder="Amount of cards" class="input">
                <input type="text" id="copyCount" placeholder="Amount of copies" class="input">

            </label>

            <button class="play" id="play">Play</button>
        </div>

        <!-- DATA -->
        <div class="data">

        </div>

        <!-- CARD BOARD -->
        <div class="grid">
        </div>

    </div>
</div>

<script src="./assets/src/initGame.js" type="module"></script>

</body>

</html>