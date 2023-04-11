<?php
   include("connection.php");


    if (isset($POST['submit'])){
      
    $New_Parishioner = $POST['status_new'];
    $Parishioner = $POST['status_new'];
    $FullName = $POST['fullname'];
    $Email = $POST['email'];
    $PhoneNumber = $POST['phonenumber'];
    $Address = $POST['address'];
    $Group  = $POST['group'];
    $StateOfOrigin = $POST['state']; 
    $Zone = $POST['zone'];
    $Occupation = $POST['occupation'];
    $DateOfBirth = $POST['dob'];
    $NumberOfKids = $POST['numberofkids'];
    $Single = $POST['status'];
    $Married = $POST['status'];
    $Seperated = $POST['status'];
    $Widowed = $POST['status'];
    $Baptism = $POST['gender_baptism'];
    $First_Holy_Communion = $POST['gender_communion'];
    $Confirmation = $POST['gender_confirmation'];
    
    $Holy_Matrimony = $POST['gender_matrimony'];
    $Full_Name = $POST['full_name'];
    $E_mail = $POST['e_mail'];
    $Phone_Number = $POST['phone_number'];
    $Society = $POST['society'];
    $State_Of_Origin = $POST['State_of_origin'];
    $Date_Of_Birth = $POST['d_o_b'];
    $Occupations = $POST['business'];
    $Baptismal = $POST['gender1'];
    $Holy_Communion = $POST['gender2'];
    $Confirms = $POST['gender3'];
    $Matrimony = $POST['gender4'];
    $Eucharist_Minister = $POST['eucharist'];
    $PSR_Teacher = $POST['psr_teacher'];
    $Lector = $POST['lector'];
    $Mass_server = $POST['mass_server'];
    $Money_Counter = $POST['money_counter'];
    $Choir = $POST['choir'];
    $Usher = $POST['usher'];
    $Other = $POST['other'];
    $Ideas = $POST['ideas'];



}

$sqlquery = "INSERT INTO church_db(	New_Parishioner,Parishioner,FullName,Email,PhoneNumber,Address,Group,StateOfOrigin,Zone,

		Occupation,DateOfBirth,NumberOfKids,Single,Married,Seperated,Widowed,Baptism,First_Holy_Communion,Confirmation,Holy_Matrimony,Full_Name,

		E_mail,Phone_Number,Society,State_Of_Origin,Date_Of_Birth,Occupations,Baptismal,Holy_Communion,Confirms,Matrimony,Eucharist_Minister,	

		PSR_Teacher,Lector,Mass_server,Money_Counter,Choir,Usher,Other,Ideas)
VALUES ('status_new','status_new','fullname','email','phonenumber','address','group','state','zone','occupation','dob','numberofkids',
'status','status','status','status','gender_baptism','gender_communion','gender_confirmation','gender_matrimony','full_name',
'full_name','e_mail','phone_number','society','State_of_origin','d_o_b','business','gender1','gender2','gender3','gender4',
'eucharist','psr_teacher','lector','mass_server','money_counter','choir','usher','other','ideas')";


if(mysqli_query($sqlquery,$con
)){
    echo "success";
}else{
    echo "failed";
}
 


 
?>
