<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="assets/style/style.css">
    <script src="assets/src/Game.js" defer></script>

    <title>Memory</title>
</head>

<body>

<!-- CENTER BOX -->
<div class="center-screen">
    <div class="mainFrame">

        <div class="data">
            <div class="score">Score : <span class="scoreBoard">0</span></div>
            <div class="click">Click : <span class="clickBoard">0</span></div>
        </div>
        <div class="grid">
            <div class="popup">
                <button class="play" onclick="new Game(2, 2)">Play</button>
            </div>
        </div>

    </div>
</div>

</body>

</html>