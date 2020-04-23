var hour = 0;

var minutes = 0;

var seconds = 0;

var score=0;

function timer()
	{
        seconds ++;
        if(seconds==60){
            seconds=0;
            minutes++;
        }          

        if(minutes==60){
            minutes=0;
            hour++;
        }
        
        switch(true){
            case seconds<10&&minutes<10&&hour<10:
                document.getElementById("timer").innerHTML = "0"+hour+":"+"0"+minutes+":"+"0"+seconds;
                break;
            case seconds<10&&minutes<10&&hour>=10:
                document.getElementById("timer").innerHTML = hour+":"+"0"+minutes+":"+"0"+seconds;
                break;
            case seconds<10&&hour<10&&minutes>=10:
                document.getElementById("timer").innerHTML = "0"+hour+":"+minutes+":"+"0"+seconds;
                break;
            case minutes<10&&hour<10&&seconds>=10:
                document.getElementById("timer").innerHTML = "0"+hour+":"+"0"+minutes+":"+seconds;
                break;
            case hour<10&&seconds>=10&&minutes>=10:
                document.getElementById("timer").innerHTML = "0"+hour+":"+minutes+":"+seconds;
                break;
            case minutes<10&&seconds>=10&&hour>=10:
                document.getElementById("timer").innerHTML = hour+":"+"0"+minutes+":"+seconds;
                break;
            case seconds<10&&minutes>=10&&hour>=10:
                document.getElementById("timer").innerHTML = hour+":"+minutes+":"+"0"+seconds;
                break;
        };
         
        if(parsLeft!=0) setTimeout("timer()",1000);
	}

function shuffle(tmpArray) {
    var j, x, i;
    for (i = tmpArray.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = tmpArray[i];
        tmpArray[i] = tmpArray[j];
        tmpArray[j] = x;
    }
    return tmpArray;
}
var cards = ["ciri.png", "ciri.png", "geralt.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "iorweth.png", "triss.png", "triss.png", "yen.png", "yen.png"];
shuffle(cards);
for(var i =0; i< cards.length; i++){
    $('#target').append('<div id="c'+ i +'" class="card" onclick="revalCard('+i+')"></div>')
}
$('#target').append('<div class="score"> Turn counter: 0</div>')
$('#target').append('<div id="timer" class="timer"> 00:00:00</div>')
var oneVisible=false;
var turnCounter=0;
var isHit = false; 
var firstCardNumber=0;
var firstCardNumberTmp=cards.length+1;
var lock = false;
var parsLeft=(cards.length/2);
var start=false;

function revalCard(nr){

    if(start==false){
        timer();
        start=true;
    }
    else{}

    var opacityValue=$('#c'+nr).css('opacity');
    if((opacityValue!=0 && lock==false) && firstCardNumberTmp!=nr){
        
        lock=true;

        var pic = "url(img/"+ cards[nr] + ")";
        $('#c'+nr).css('background-image', pic);
        $('#c'+nr).addClass('cardA');
        $('#c'+nr).removeClass('card');


        if(oneVisible == false){
            //first
            oneVisible=true;
            firstCardNumber=nr;
            firstCardNumberTmp=firstCardNumber;
            lock=false;
        }else{
            //second

            if(cards[nr]==cards[firstCardNumber]){
                //alert("para");
                setTimeout(function(){hideCards(nr, firstCardNumber)}, 600);
                
            }else{
                //alert("pudło");
                setTimeout(function(){restoreCards(nr, firstCardNumber)}, 800);
            }

            turnCounter++;
            $('.score').html('Turn counter: '+turnCounter);
            oneVisible=false;  
            firstCardNumberTmp=12;      
        }
    }
    
}

function hideCards(nr1, nr2){
    $('#c'+ nr1).css('opacity', '0');
    $('#c'+ nr2).css('opacity', '0');

    parsLeft--;
    if(parsLeft==0)
    {
        score=Math.round(Math.pow((hour*360+minutes*60+seconds+turnCounter*10),-2) * 10000000);
        $('.board').html('<h1>You Win!<br>Your score is '+score+'</h1> <br>  <button type="button" class="btn" onclick="window.location.reload();">Play Again!</button>' );
    }

    lock=false;
}

function restoreCards(nr1, nr2){
    $('#c'+nr1).css('background-image', 'url(img/karta.png)');
    $('#c'+nr1).addClass('card');
    $('#c'+nr1).removeClass('cardA');

    $('#c'+nr2).css('background-image', 'url(img/karta.png)');
    $('#c'+nr2).addClass('card');
    $('#c'+nr2).removeClass('cardA');

    lock=false;
}