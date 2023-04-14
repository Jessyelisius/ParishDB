<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Helvetica">
    <link rel="stylesheet" href="./public/style/radio.css">
    <link rel="stylesheet" href="./public/style/Reg.css">
    <title>SJMCC Registration Form</title>
</head>

<body>
    <form action="includes/form.inc.php" method="post">
        <h2 class="heading text-muted">ST JOSEPH MUKASA PARISH GIDAN-MANGORO
        <div class="photo">
                <img src="./public/img/background.png" width="80px" height="80px">
                <small> Registration Form</small>
                <img src="./public/img/bg1.jpg" width="50px" height="50px">
            </div>
          
             
            <!--<div class="box">
                <div class="icon container">
                <span class="material-icons-round">mail_outline<small><a href="sjmccgidanmangoro@gmail.com">sjmccgidanmangoro@gmail.com</a></Small></span>
                </div>
            </div> -->
        </h2>
   

        <div class="status">
            <label class="radiobutton">New Parishioner
                <input type="radio" value="New Parishioner" name="status_new">
                <span class="indicator"></span>
            </label>
            <label class="radiobutton">Parishioner
                <input type="radio" value="Parishioner" name="status-new">
                <span class="indicator"></span>
            </label>
        </div>
        <!-- END Status -->
        <div class="personal-credential">
            <div class="box">
                <div class="icon container">
                    <span class="material-icons-round">person</span>
                </div>
                <input type="text" placeholder="FullName" name="fullname">
            </div>

            <div class="box">
                <div class="icon container">
                    <span class="material-icons-round">mail_outline</span>
                </div>
                <input type="email" placeholder="Email" name="email">
            </div>

            <div class="box">
                <div class="icon container">
                    <span class="material-icons-round">phone</span>
                </div>
                <input type="tel" placeholder="PhoneNumber" name="phonenumber">
            </div>

            <div class="box">
                <div class="icon container">
                    <span class="material-icons-round">location_on</span>
                </div>
                <input type="text" placeholder="Address" name="address">
            </div>

            <div class="box">
                <div class="icon container">
                    <span class="material-icons-round">groups</span>
                </div>
                <input type="text" placeholder="Society/Group" name="group">
            </div>

            <div class="box">
                <div class="icon container">
                    <span class="material-icon-round">State </span>
                </div>
                <input type="text" placeholder="State of Origin" name="state">
            </div>


            <div class="box"> 
                <div class="icon container">
                    <span class="material-icon-round">Zone</span>
                </div>
                <input type="number" placeholder="Zone" name="zone">
            </div>

            <div class="box">
                <div class="icon container">
                    <span class="material-icon-round">Occupation</span>
                </div>
                <input type="text" placeholder="Occupation" name="occupation">
            </div>

            <div class="box">
                <div class="icon container">
                    <span class="material">Date Of Birth</span>
                </div>
                <input type="date" placeholder="Date of Birth" name="dob">
            </div>

            <div class="box">
                <div class="icon container">
                    <span class="material-icon-round">Number of kids</span>
                </div>
                <input type="number" placeholder="Number of Kids" name="numberofkids">
            </div>
        </div>

        <!-- end of personal-credential -->
        <h2 class="heading text-muted"> Marrital Status:<h2>
                <div class="gender">
                    <label class="radiobutton">Single
                        <input type="radio" value="single" name="status">
                        <span class="indicator"></span>
                    </label>

                    <label class="radiobutton">Married
                        <input type="radio" value="married" name="status">
                        <span class="indicator"></span>
                    </label>

                    <label class="radiobutton">Separated
                        <input type="radio" value="Separated" name="status">
                        <span class="indicator"></span>
                    </label>

                    <label class="radiobutton">Widowed
                        <input type="radio" value="Widowed" name="status">
                        <span class="indicator"></span>
                    </label>
                </div>


                <h2 class="heading text-muted">Catholic Sacrament:<h2>
                        <div class="gender">
                            <label class="radiobutton">Baptism
                                <input type="radio" value="Baptism" name="gender_baptism">
                                <span class="indicator"></span>
                            </label>

                            <label class="radiobutton">1st Holy Communion
                                <input type="radio" value="Holy Communion" name="gender_communion">
                                <span class="indicator"></span>
                            </label>

                            <label class="radiobutton">Confirmation
                                <input type="radio" value="Confirmation" name="gender_confirmation">
                                <span class="indicator"></span>
                            </label>

                            <label class="radiobutton">Holy Matrimony
                                <input type="radio" value="Holy Matrimony" name="gender_matrimony">
                                <span class="indicator"></span>
                            </label>
                        </div>

                        <h3 class="heading text-muted">Spouse:<h3>

                                <div class="personal-credential">
                                    <div class="box">
                                        <div class="icon container">
                                            <span class="material-icons-round">person</span>
                                        </div>
                                        <input type="text" placeholder="Full_Name" name="full_name">
                                    </div>

                                    <div class="box">
                                        <div class="icon container">
                                            <span class="material-icons-round">mail_outline</span>
                                        </div>
                                        <input type="email" placeholder="Emails" name="e_mail">
                                    </div>

                                    <div class="box">
                                        <div class="icon container">
                                            <span class="material-icons-round">phone</span>
                                        </div>
                                        <input type="tel" placeholder="Phone_Number" name="phone_number">
                                    </div>


                                    <div class="box">
                                        <div class="icon container">
                                            <span class="material-icons-round">groups</span>
                                        </div>
                                        <input type="text" placeholder="Society" name="society">
                                    </div>

                                    <div class="box">
                                        <div class="icon container">
                                            <span class="material-icon-round">State </span>
                                        </div>
                                        <input type="text" placeholder="State_of_Origin" name="state_of_origin">
                                    </div>

                                    <div class="box">
                                        <div class="icon container">
                                            <span class="material-icon-round">Date of Birth</span>
                                        </div>
                                        <input type="date" placeholder="Date_of_Birth" name="D_o_b">
                                    </div>

                                    <div class="box">
                                        <div class="icon container">
                                            <span class="material-icon-round">Occupation</span>
                                        </div>
                                        <input type="text" placeholder="Occupations" name="business">
                                    </div>

                                </div>

                                <!-- end of personal-credential -->
                                <h3 class="heading text-muted">Catholic Sacrament:<h3>
                                        <div class="gender">
                                            <label class="radiobutton">Baptismal
                                                <div id="radiobutton"></div>
                                                <input type="radio" value="Baptism" name="gender1">
                                                <span class="indicator"></span>
                                            </label>

                                            <label class="radiobutton"> Holy Communion
                                            <div id="radiobutton"></div>
                                                <input type="radio" value="Holy Communion" name="gender2">
                                                <span class="indicator"></span>
                                            </label>

                                            <label class="radiobutton">Confirms
                                                <input type="radio" value="Confirmation" name="gender3">
                                                <span class="indicator"></span>
                                            </label>

                                            <label class="radiobutton"> Matrimony
                                                <input type="radio" value="Holy Matrimony" name="gender4">
                                                <span class="indicator"></span>
                                            </label>
                                        </div>


                                        <!-- end of gender -->
                                        <div class="terms-action">
                                            <p>If you are interested in serving with any of the following, please choose
                                                and you will be Trained
                                            </p>
                                            <select name="cars" class="Register-btn">
                                                <option value="Select">Select</option>
                                                <option value="Eucharist Minister" name="eucharist">Eucharist Minister</option>
                                                <option value="PSR Teacher" name="psr_Teacher">PSR Teacher</option>
                                                <option value="Lector" name="lector">Lector</option>
                                                <option value="Mass Server" name="mass_server">Mass Server</option>
                                                <option value="Money Counter" name="money_counter">Money Counter</option>
                                                <option value="Choir" name="choir">Choir</option>
                                                <option value="usher" name="usher">usher</option>
                                                <option value="Other" name="other">Other</option>
                                            </select>
                                            <p>If you have any other skills or talents you could use to serve the Parish
                                                Community, Let us know
                                            </p>
                                            <div class="personal-credential">
                                                <div class="box">
                                                    <div class="icon container">
                                                        <span class="material-icons-round">
                                                            psychology_alt
                                                        </span>
                                                    </div>
                                                    <input type="textarea" placeholder="Ideas" name="ideas">
                                                </div>
                                            </div>
                                            <input type="submit" class="Register-btn" value="Register">
                                        </div>
    </form>
</body>
<script>
document.getElementById('radiobutton').checked = false;
</script>
</html>