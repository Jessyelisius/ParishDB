<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap">
    <title>  Birthday Card</title>
</head>
<body>
    <div class="card">
        <img src="bd1.webp" alt="birthday" class="birthday" >

        <div class="text">
        <h1>Happy Birthday!</h1>
        <p>Wishing you a wonderful day filled with laughter,<br>Here comes another reason to be joyous;
        <br>As you celebrate your new age in the Lord, may heaven rejoice over you.
    <br> For you are surrounded with joy and mercy<br>Have a Great One!</p>
        <p class="text-muted">St. Joseph Mukasa, Magis Family</p>
        </div>
        <div class="space"></div>
    </div>
 
</body> 


<style type="text/css">
    *{
        transition: all 0.2s ease-in-out;
    }
    body{
        background: #fdfdfd;
        display: grid;
        place-items: center;
        height: 100vh;
        margin: 0;
        font-family: 'Open Sans' sans-serif;
    }
    .card{
        background: #eceaea;
        border-radius: 4px;
        height: 85vh;
        width: 85vw;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    @media only screen and (min-width:1000px){
        .card{
            flex-direction: row-reverse;
        }
        img .birthday{
            width: 100%;
            max-width: 50vw;
            max-height: unset;

        }
    }

    @media only screen and (max-height:500px){
        .card{
            flex-direction: row-reverse;
        }
        img .birthday{
            width: 100%;
            max-width: 50vw;
            max-height: unset;

        }
    }
    img.birthday{
        max-height: 40vh;
    }
    .text-muted{
        opacity: 0.8;
    }
    .text{
        padding: 1em;
        font-size: 20px;
    }
    .space{
        height: 100px;
    }
</style>
</html>