<?php

class Dbh {
    protected function connect() {

        try {
            $username = "root";
            $password = "";
            $dbh = new PDO('mysql:host=localhost;dbname=sjmcc', $username,$password);
            $dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // set the error mode to exceptions
            $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES,false); // run real prepared queries
            return $dbh;

        } catch (PDOException $e) {
            print "Error! " . $e->getMessage() . "<br>";
            die();
        }
    }
}