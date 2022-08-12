<?php

function connectDB()
{
    // Create connection to database
    $_SESSION['conn'] = new mysqli("localhost", "admin", "Admin-123", "MemoryUserData", "3306");

            // Check connection
            if ($_SESSION['conn']->connect_error) {
                die("Connection failed: " . $_SESSION['conn']->connect_error);
            }
}