
<?php

 require_once(__DIR__ .'/insertForm.classes.php');

class FormContrl extends InsertData{

   private $Parishioner;
   private $FullName; 
   private $Email;
   private $PhoneNumber;
   private $Address;
   private $Group;
   private $StateOfOrigin;
   private $Zone;
   private $Occupation;
   private $DateOfBirth;
   private $NumberOfKids;
   private $Single;
    private $Married;
  private  $Seperated;
  private $Widowed;
  private $Baptism;
  private  $First_Holy_Communion;
   private $Confirmation;
   private $Holy_Matrimony;
   private $Full_Name;
   private $E_mail;
  private  $Phone_Number;
  private $Society;
  private $State_Of_Origin;
  private $Date_Of_Birth;
  private $Occupations;
  private $Baptismal;
  private $Holy_Communion;
  private $Confirms;
  private $Matrimony;
  private $Eucharist_Minister;
  private $PSR_Teacher;
  private $Lector;
  private $Mass_server;
  private $Money_Counter;
  private $Choir;
  private $Usher;
  private $Other;
  private $Ideas;


   public function __construct(   $Parishioner, $FullName, $Email, $PhoneNumber, $Address,$Group, $StateOfOrigin,$Zone, $Occupation,
   $DateOfBirth, $NumberOfKids, $Single, $Married, $Seperated, $Widowed, $Baptism, $First_Holy_Communion,
   $Confirmation, $Holy_Matrimony, $Full_Name, $E_mail, $Phone_Number, $Society, $State_Of_Origin, $Date_Of_Birth,
   $Occupations, $Baptismal, $Holy_Communion, $Confirms, $Matrimony, $Eucharist_Minister, $PSR_Teacher, $Lector,
   $Mass_server, $Money_Counter, $Choir, $Usher, $Other, $Ideas)
    {
        $this->Parishioner = $Parishioner;
        $this->FullName = $FullName; 
        $this->Email = $Email;
        $this->PhoneNumber = $PhoneNumber;
        $this->Address = $Address;
        $this->Group = $Group;
        $this->StateOfOrigin = $StateOfOrigin;
        $this->Zone = $Zone;
        $this->Occupation = $Occupation;
        $this->DateOfBirth = $DateOfBirth;
        $this->NumberOfKids = $NumberOfKids;
        $this->Single = $Single;
        $this->Married = $Married;
        $this->Seperated =  $Seperated;
        $this->Widowed = $Widowed;
        $this->Baptism = $Baptism;
        $this->First_Holy_Communion =  $First_Holy_Communion;
        $this->Confirmation = $Confirmation;
        $this->Holy_Matrimony = $Holy_Matrimony;
        $this->Full_Name = $Full_Name;
        $this->E_mail = $E_mail;
        $this->Phone_Number =  $Phone_Number;
        $this->Society = $Society;
        $this->State_Of_Origin = $State_Of_Origin;
        $this->Date_Of_Birth = $Date_Of_Birth;
        $this->Occupation = $Occupations;
        $this->Baptism = $Baptismal;
        $this->Holy_Communion = $Holy_Communion;
        $this->Confirms = $Confirms;
        $this->Matrimony = $Matrimony;
        $this->Eucharist_Minister = $Eucharist_Minister;
        $this->PSR_Teacher = $PSR_Teacher;
        $this->Lector = $Lector;
        $this->Mass_server = $Mass_server;
        $this->Money_Counter = $Money_Counter;
        $this->Choir = $Choir;
        $this->Usher = $Usher;
        $this->Other = $Other;
        $this->Ideas = $Ideas;
    }

     //signingup user 
    public function formSubmit(){
       if ($this->emptyInput() == false) {
            //echo "Invalid input";
            header('location: ../home.php?error=emptyinput');
            exit();
       }
       
        if ($this->invalidEmail() == false) {
            //echo "invalid Email";
            header('location: ../home.php?error=emailnotvalid');
            exit();
        }

        $this->Users(
            $this->Parishioner, $this->FullName, $this->Email, $this->PhoneNumber, $this->Address, $this->Group, $this->StateOfOrigin,
            $this->Zone, $this->Occupation, $this->DateOfBirth, $this->NumberOfKids, $this->Single, $this->Married, $this->Seperated, 
            $this->Widowed, $this->Baptism, $this->First_Holy_Communion, $this->Confirmation, $this->Holy_Matrimony, $this->Full_Name, 
            $this->E_mail, $this->Phone_Number, $this->Society, $this->State_Of_Origin, $this->Date_Of_Birth,
            $this->Occupations, $this->Baptismal, $this->Holy_Communion, $this->Confirms, $this->Matrimony, $this->Eucharist_Minister,
            $this->PSR_Teacher, $this->Lector, $this->Mass_server, $this->Money_Counter, $this->Choir, $this->Usher, $this->Other, $this->Ideas
    );
    }
//checking for empty input
    private function emptyInput(){
        $result = false;
        if (empty($this->FullName) || empty($this->Email)  || empty($this->PhoneNumber) || empty($this->DateOfBirth)) {
            $result = false;
        }
        else{
            $result = true;
        }
        return $result;
    }

// checking if email is valid email address

    private function invalidEmail(){
        $result = false;
        if (!filter_var($this->Email, FILTER_VALIDATE_EMAIL)) {
            $result = false;
        }
        else{
            $result = true;
        }
        return $result;
    }


}




// $sqlquery = "INSERT INTO church_db(	New_Parishioner,Parishioner,FullName,Email,PhoneNumber,Address,Group,StateOfOrigin,Zone,

// 		Occupation,DateOfBirth,NumberOfKids,Single,Married,Seperated,Widowed,Baptism,First_Holy_Communion,Confirmation,Holy_Matrimony,Full_Name,

// 		E_mail,Phone_Number,Society,State_Of_Origin,Date_Of_Birth,Occupations,Baptismal,Holy_Communion,Confirms,Matrimony,Eucharist_Minister,	

// 		PSR_Teacher,Lector,Mass_server,Money_Counter,Choir,Usher,Other,Ideas)
// VALUES ('status_new','status_new','fullname','email','phonenumber','address','group','state','zone','occupation','dob','numberofkids',
// 'status','status','status','status','gender_baptism','gender_communion','gender_confirmation','gender_matrimony','full_name',
// 'full_name','e_mail','phone_number','society','State_of_origin','d_o_b','business','gender1','gender2','gender3','gender4',
// 'eucharist','psr_teacher','lector','mass_server','money_counter','choir','usher','other','ideas')";
