<?php
 require_once(__DIR__ .'/dbh.classes.php');

class InsertData extends Dbh {

    protected function Users($Parishioner, $FullName, $Email, $PhoneNumber, $Address,$Group, $StateOfOrigin,$Zone, $Occupation,
    $DateOfBirth, $NumberOfKids, $Single, $Married, $Seperated, $Widowed, $Baptism, $First_Holy_Communion,
    $Confirmation, $Holy_Matrimony, $Full_Name, $E_mail, $Phone_Number, $Society, $State_Of_Origin, $Date_Of_Birth,
    $Occupations, $Baptismal, $Holy_Communion, $Confirms, $Matrimony, $Eucharist_Minister, $PSR_Teacher, $Lector,
    $Mass_server, $Money_Counter, $Choir, $Usher, $Other, $Ideas){

        $stmt = $this->connect()->prepare("INSERT INTO sjmcc.church_db( Parishioner, FullName, Email, PhoneNumber, Address, Group, StateOfOrigin, Zone,
		Occupation, DateOfBirth, NumberOfKids, Single, Married, Seperated, Widowed, Baptism, First_Holy_Communion, Confirmation, Holy_Matrimony, Full_Name,
		E_mail, Phone_Number, Society, State_Of_Origin, Date_Of_Birth, Occupations, Baptismal, Holy_Communion, Confirms, Matrimony, Eucharist_Minister,	
		PSR_Teacher, Lector, Mass_server, Money_Counter, Choir, Usher, Other, Ideas) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                                                                                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");


        if (!$stmt->execute(array(
            
            $Parishioner, $FullName, $Email, $PhoneNumber, $Address,$Group, $StateOfOrigin,$Zone, $Occupation,
            $DateOfBirth, $NumberOfKids, $Single, $Married, $Seperated, $Widowed, $Baptism, $First_Holy_Communion,
            $Confirmation, $Holy_Matrimony, $Full_Name, $E_mail, $Phone_Number, $Society, $State_Of_Origin, $Date_Of_Birth,
            $Occupations, $Baptismal, $Holy_Communion, $Confirms, $Matrimony, $Eucharist_Minister, $PSR_Teacher, $Lector,
            $Mass_server, $Money_Counter, $Choir, $Usher, $Other, $Ideas
        
        ))) {
            $stmt = null;
            header('location: ../home.php?error=stmtfailed');
            exit();
        }
        $stmt = null;
    }
    
}