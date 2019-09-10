$(document).ready(function() {
     var selectcolor="";
     var guess=0;
     var clickcount=0;
     $(".but").hide();
     var answerarr=generateAnswer();
     console.log(answerarr);
     
     let masterGuessArray = [[-1, -1, -1],
                          [-1, -1, -1],
                          [-1, -1, -1],
                          [-1, -1, -1],
                          [-1, -1, -1]];
     var temparray=$(".guesspegslines");
     var guessarray=[];
     let nextGrade = $($('.first-grade')[0]).parent()[0];
     console.log(nextGrade);
     for(var i=0;i<5;i++) {
          guessarray.push(temparray[i]);
     }
     for(var i=0;i<5;i++){
         var guessarr=guessarray[i].getElementsByClassName("guesspeg");
       for(var j=0;j<3;j++) {
        $(guessarr[j]).attr('id',`rowcoloum-${i}-${j}`);
        }
     }
     $(".but").click(function() {
           $(".active").removeClass("active");
           let getgrad=getGrade();
           checkwin(getgrad,guess);
           let gradeBox = getGradeBox();
           placePegs(getgrad, gradeBox);
	    guess++;
           console.log(getgrad);
           for(var i=0;i<3;i++) {
             $(`#rowcoloum-${guess}-${i}`).addClass('active');
           $(".but").hide();
      }
     });
     $(".selector-inner").click(function () {
     selectcolor=$(this).css("background-color");
     });
     $(".guesspeg").click(function() {
       let coord=$(this).attr('id');
        updatemaster(selectcolor,coord);
        clickcount++;
        if($(this).hasClass("active")){
             $(this).css("background",selectcolor); 
        }
         if(clickcount%3===0){
             $(".but").show();
         }
  });
  function generateAnswer() {
     var array=[];
     
     for(i=0;i<3;i++) {
        var x=Math.floor(Math.random()*4);
        array.push(x);
        }
        return array;
    }
  function updatemaster(col,xy){ 
    console.log(col,xy);
      let ray = xy.split('-');
    let x = ray[1];
    let y = ray[2];
    masterGuessArray[x][y] = makeColorANumber(col);

  }

  function makeColorANumber(col) {
    if(col === 'rgb(255, 0, 0)') return 0;
    if(col === 'rgb(0, 128, 0)') return 1;
    if(col === 'rgb(255, 255, 0)') return 2;
    if(col === 'rgb(255,192,203)') return 3;
   }
function getGrade() {
    let gradRay = [];
    let aRay = [];
    for(let i = 0; i < 3; i++) {
      aRay.push(answerarr[i]);
    }
    for(let i = 0; i < 3; i++) {
      if(masterGuessArray[guess][i] === aRay[i]) {
        gradRay.push('green-peg');
        aRay[i] = -1;
        masterGuessArray[guess][i] = -2;
      }
    }
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(masterGuessArray[guess][i] === aRay[j]) {
          gradRay.push('red-peg');
          aRay[j] = -1;
          masterGuessArray[guess][i] = -2;
        }
      }
    }
    return gradRay;
  }
  function getGradeBox() {
    let activeGrade =  nextGrade.getElementsByClassName("gradepegslines")[0];
console.log(activeGrade);

    nextGrade = $(nextGrade).next()[0];
console.log(nextGrade);

    return activeGrade;
  }

  function placePegs(ray, box) {
    let pegRay = box.getElementsByClassName("gradepeg");
    for(let i = 0; i < ray.length; i++) {
      $(pegRay[i]).addClass(`${ray[i]}`);
    }
    $('.red-peg').css('background', 'none').css('background-color', 'red');
    $('.green-peg').css('background', 'none').css('background-color', 'green');
  }

  function checkwin(ray,guess) {
    let rayStr = ray.join();
    if(rayStr === "green-peg,green-peg,green-peg") {
       alert("win");
     }
    if(guess==4) {
       alert("loss");
    }
  }

  
   
 }); 