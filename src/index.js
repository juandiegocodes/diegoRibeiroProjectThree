const wordApp = {};
// How word.lifesAdapted works: every time a word reach the bottom of the screen word.lifesAdapted will be = to a value between 14 and 15 so if 10 is > word.lifesAdapted you have all your lifes, if 20>  wordApp.lifesAdapted  you have lost 1 life, if  32> word.applifesAdapted lost two lifes and finally if word.appLifesAdapted is higher than 32 more than 3 words have reach the bottom and you have lost all your lifes to this point.
wordApp.lifes = function() {
  if (wordApp.lifesAdapted < 10) {
    wordApp.finalLife = 3;
  } else if (wordApp.lifesAdapted < 22) {
    wordApp.finalLife = 2;
  } else if (wordApp.lifesAdapted < 41) {
    wordApp.finalLife = 1;
  } else {
    wordApp.finalLife = 0;
  }
};
wordApp.lifesAdapted = 0;
wordApp.finalLife = 3;
wordApp.score = 0;
wordApp.wordsRight = []

// Words function called from randomWords.js and it will create 100 random words
  wordApp.wordBank = words(100);

// adding the lifes variable to my HTML
wordApp.displayLifes = function() {
  $(".lifes").html(`Lifes: ${wordApp.finalLife}`);
};
// creating a random porcentage to be used while positioning the words
wordApp.randomPercent = function() {
  return Math.floor(Math.random() * 70) + 1;
};



// matching the user input with my h4 variables
wordApp.submitInput = function() {
  $(`form`).on(`submit`, function(e) {
    e.preventDefault();
    let wordUser = $(".inputText")
      .val()
      .toLowerCase();
    if ($(`h4:contains(${wordUser})`).text() === wordUser) {
      // score of word is based on length of the sucessfully submitted word
      wordApp.wordsRight.push(` ${wordUser}`);
      wordApp.wordScore = wordUser.length;
      wordApp.score += wordApp.wordScore;
      $(".score").html(`${wordApp.score}`);
      $(`h4:contains(${wordUser})`).remove();
      $(".inputText").val("");
    } else {
      $(".inputText").effect( "shake", {times:2}, 300 )
    }
  });
};

// if the animation ends the word will dissapear
wordApp.dissapearWord = function() {
  wordApp.intervalGameOver =  setInterval(() => {
      wordApp.lifes();
      wordApp.displayLifes();
      $("h4").on("animationend webkitAnimationEnd oAnimationEnd", function() {
        $(this).hide(200);
        wordApp.lifesAdapted = wordApp.lifesAdapted + 1;
        wordApp.lifes();
        wordApp.displayLifes();
        console.log(wordApp.lifesAdapted);
      });
      if (wordApp.finalLife === 0) {
        Swal.fire({
          title: 'GAME OVER!',
          text: 'Check Your score',
          type: 'warning',
          confirmButtonText: 'Go'
        })
        $('.gameBoard').css("display" , "none");
        $('.resultsSection').css("display","flex")
        clearInterval(wordApp.intervalGameOver);
        clearInterval(wordApp.intervalTimer);
        clearInterval(wordApp.intervalWord);
        wordApp.displayScore();
        wordApp.displayWordsRight();
      }
    }, 500);
}
// every X seconds a random word will be generated
wordApp.intervalWord = function() {
  wordApp.intervalWord = setInterval(() => {
    const randomIndex = wordApp.randomNumber();
    const randomWord = wordApp.wordBank[randomIndex];
    wordApp.addWord(randomWord);
    // Remove the randomly selected word from the word bank to avoid duplicates
    wordApp.wordBank = wordApp.wordBank.filter(word => word !== randomWord);
  }, wordApp.timeWordAppear);
};

// random number to be used in the wordbank array
wordApp.randomNumber = function() {
  return Math.floor(Math.random() * wordApp.wordBank.length);
};

// timer
wordApp.time = 60;
wordApp.timer = function() {
  if (wordApp.time===0) {
    Swal.fire({
      title: 'TIME IS OVER!',
      text: 'Check Your score',
      type: 'warning',
      confirmButtonText: 'Go'
    })
    clearInterval(wordApp.intervalTimer);
    clearInterval(wordApp.intervalGameOver);
    clearInterval(wordApp.intervalWord);
    wordApp.displayScore();
    wordApp.displayWordsRight();
    $('.gameBoard').css("display" , "none");
    $('.resultsSection').css("display","flex")
  }
  else {
      $('.timerOn').html(`Time : ${wordApp.time} s`);
      wordApp.time = wordApp.time -1;
  }
}

// clock
wordApp.myInt = function() {
  wordApp.intervalTimer = setInterval(wordApp.timer,1000);
}

// addingscore
wordApp.displayScore = function() {
  $('.finalScore').html(`${wordApp.score}`);
}

// adding words right
wordApp.displayWordsRight = function() {
  $('.wordsRight').html(`${wordApp.wordsRight}`);
}

// Hiding sections
wordApp.hiderStart = $('.start').on('click', function(){
  $('header').css("display" , "none");
  $('.instructions').css("display","flex")
});
wordApp.hideInstructions = $('.next').on('click', function(){
  $('.instructions').css("display" , "none");
  $('.difficulty').css("display","flex")
});
wordApp.hideDifficulty = 
$('.difficultyOption').on('click', function(){
  $('.difficulty').css("display" , "none");
  $('.gameBoard').css("display","block");
  $('.inputText').focus();
});
wordApp.hideMobile = $('.nextMobile').on('click', function(){
  $('.instructions').css("display" , "none");
  $('.gameBoard').css("display","block")
});

// try again function

wordApp.tryAgain = function() {
    window.location.reload(false);
}

wordApp.tryAgainButton = $('.tryAgain').on('click', function() {
  wordApp.tryAgain();
})

// HARD
$('.hardSelected').on('click', function(){
  wordApp.timeWordAppear = 900;
});

// MEDIUM
$('.mediumSelected').on('click', function(){
  wordApp.timeWordAppear = 1500;
});

// EASY

$('.easySelected').on('click', function(){
  wordApp.timeWordAppear = 1800;
});


// init

wordApp.init = function() {
  wordApp.submitInput();
  // adding random word generated to my html
  wordApp.addWord = function(word) {
    const displayWord = $("<h4>")
      .css({
        left: `${wordApp.randomPercent()}%`,
        transform: `rotate(${wordApp.randomPercent()}deg)`
      })
      .text(word);
    $(".canvas").append(displayWord);
  };
  wordApp.intervalWord();
  wordApp.dissapearWord();
  wordApp.myInt();
};

wordApp.initMobile = function() {
  wordApp.timeWordAppear = 1800;
  wordApp.submitInput();
  // adding random word generated to my html
  wordApp.addWord = function(word) {
    const displayWord = $("<h4>")
      .css({
        left: `${wordApp.randomPercent()}%`,
        bottom: `${wordApp.randomPercent()}%`
      })
      .text(word);
    $(".canvas").append(displayWord);
  };
  wordApp.intervalWord();
  wordApp.dissapearWord();
  wordApp.myInt();
};
$(function() {
  $('.difficultyOption').on('click' , wordApp.init)
  $('.nextMobile').on('click' , wordApp.initMobile)
});

