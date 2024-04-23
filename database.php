<?php
    function connect(){
        return new PDO('mysql:host=localhost;dbname=agrippa;charset=utf8', 'root', '');
    }