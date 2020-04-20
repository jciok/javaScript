var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png","ciri.png", "triss.png", "yen.png", "iorweth.png"];
//alert(cards[4]);
//console.log(cards);

var c0 =document.getElementById('c0');
var c1 =document.getElementById('c1');
var c2 =document.getElementById('c2');
var c3 =document.getElementById('c3');

var c4 =document.getElementById('c4');
var c5 =document.getElementById('c5');
var c6 =document.getElementById('c6');
var c7 =document.getElementById('c7');

var c8 =document.getElementById('c8');
var c9 =document.getElementById('c9');
var c10 =document.getElementById('c10');
var c11 =document.getElementById('c11');

c0.addEventListener("click", function(){revalCard(0); })
c1.addEventListener("click", function(){revalCard(1); })
c2.addEventListener("click", function(){revalCard(2); })
c3.addEventListener("click", function(){revalCard(3); })

c4.addEventListener("click", function(){revalCard(4); })
c5.addEventListener("click", function(){revalCard(5); })
c6.addEventListener("click", function(){revalCard(6); })
c7.addEventListener("click", function(){revalCard(7); })

c8.addEventListener("click", function(){revalCard(8); })
c9.addEventListener("click", function(){revalCard(9); })
c10.addEventListener("click", function(){revalCard(10); })
c11.addEventListener("click", function(){revalCard(11); })

var oneVisible=false;
var turnCounter=0;
var isHit = false; 
var firstCardNumber=0;
var firstCardNumberTmp=12;
var lock = false;
var parsLeft=6;


function revalCard(nr){

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
        $('.board').html('<h1>You Win!<br>Done in '+turnCounter+ ' turns</h1>');
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