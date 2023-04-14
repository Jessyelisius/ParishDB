<?php


if (isset($_POST["submit"])) {
    
    //grabbing the data
    $Parishioner = $_POST['status-new'];
    $FullName = $_POST['fullname'];
    $Email = $_POST['email'];
    $PhoneNumber = $_POST['phonenumber'];
    $Address = $_POST['address'];
    $Group  = $_POST['group'];
    $StateOfOrigin = $_POST['state']; 
    $Zone = $_POST['zone'];
    $Occupation = $_POST['occupation'];
    $DateOfBirth = $_POST['dob'];
    $NumberOfKids = $_POST['numberofkids'];
    $Single = $_POST['status'];
    $Married = $_POST['status'];
    $Seperated = $_POST['status'];
    $Widowed = $_POST['status'];
    $Baptism = $_POST['gender_baptism'];
    $First_Holy_Communion = $_POST['gender_communion'];
    $Confirmation = $_POST['gender_confirmation'];
    $Holy_Matrimony = $_POST['gender_matrimony'];
    $Full_Name = $_POST['full_name'];
    $E_mail = $_POST['e_mail'];
    $Phone_Number = $_POST['phone_number'];
    $Society = $_POST['society'];
    $State_Of_Origin = $_POST['State_of_origin'];
    $Date_Of_Birth = $_POST['d_o_b'];
    $Occupations = $_POST['business'];
    $Baptismal = $_POST['gender1'];
    $Holy_Communion = $_POST['gender2'];
    $Confirms = $_POST['gender3'];
    $Matrimony = $_POST['gender4'];
    $Eucharist_Minister = $_POST['eucharist'];
    $PSR_Teacher = $_POST['psr_teacher'];
    $Lector = $_POST['lector'];
    $Mass_server = $_POST['mass_server'];
    $Money_Counter = $_POST['money_counter'];
    $Choir = $_POST['choir'];
    $Usher = $_POST['usher'];
    $Other = $_POST['other'];
    $Ideas = $_POST['ideas'];

    //instatiate signupContr class;
    require_once (__DIR__ . "../../classes/dbh.classes.php");
    require_once (__DIR__ . "../../classes/insertForm.classes.php");
    require_once (__DIR__ . "../../classes/sendEmail.classes.php");

    // $signup = new signupContr($uid,$pwd,$pwdRepeat,$email);
    $user = new FormContrl(
        
    $Parishioner, $FullName, $Email, $PhoneNumber, $Address,$Group, $StateOfOrigin,$Zone, $Occupation,
    $DateOfBirth, $NumberOfKids, $Single, $Married, $Seperated, $Widowed, $Baptism, $First_Holy_Communion,
    $Confirmation, $Holy_Matrimony, $Full_Name, $E_mail, $Phone_Number, $Society, $State_Of_Origin, $Date_Of_Birth,
    $Occupations, $Baptismal, $Holy_Communion, $Confirms, $Matrimony, $Eucharist_Minister, $PSR_Teacher, $Lector,
    $Mass_server, $Money_Counter, $Choir, $Usher, $Other, $Ideas
    
    );
    //running error handler and user signup
    $user->formSubmit();
    //GOing back to front page
    header('location: ./home.php?error=none');
}