<?php

function connectDB()
{
    // Create connection to database
    $conn = new mysqli("localhost", "admin", "Admin-123", "MemoryUserData", "3306");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}