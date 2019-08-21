const wordApp = {};
// How word.lifesAdapted works: every time word reach the bottom of the div word.lifesAdapted will be = to a value between 14 and 15 so if word.lifesAdapted is less than you have all your lifes, if wordApp.lifesAdapted less than 20 you have lost 1 life, if word.applifesAdapted less than 32 you have lost two lifes and finally if word.appLifesAdapted is higher than 32 more than 3 words have reach the bottom and you have lost all your lifes to this point.
wordApp.lifes = function() {
  if (wordApp.lifesAdapted < 10) {
    wordApp.finalLife = 3;
  } else if (wordApp.lifesAdapted < 20) {
    wordApp.finalLife = 2;
  } else if (wordApp.lifesAdapted < 32) {
    wordApp.finalLife = 1;
  } else {
    wordApp.finalLife = 0;
  }
};
wordApp.lifesAdapted = 0;
wordApp.finalLife = 3;
wordApp.score = 0;
// adding the lifes variable to my HTML
wordApp.displayLifes = function() {
  $(".lifes").html(`Lifes ${wordApp.finalLife}`);
};
// creating a random porcentage to be used while positioning the words
wordApp.randomPercent = function() {
  return Math.floor(Math.random() * 70) + 1;
};

// Words function called from randomWords.js and it will create 100 random words
wordApp.wordBank = words(100);

// adding random word generated to my html
wordApp.addWord = function(word) {
  const displayWord = $("<h4/>")
    .css({
      left: `${wordApp.randomPercent()}%`,
      transform: `rotate(${wordApp.randomPercent()}deg)`
    })
    .text(word);
  $(".canvas").append(displayWord);
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
      const wordScore = wordUser.length;
      wordApp.score += wordScore;
      $(".score").html(`Score ${wordApp.score}`);
      $(`h4:contains(${wordUser})`).remove();
      $(".inputText").val("");
    } else {
      console.log("WRONG!!!!!!!!!!!!!");
    }
  });
};

// if the animation ends the word will dissapear
wordApp.dissapearWord = function() {
  setInterval(() => {
    wordApp.lifes();
    wordApp.displayLifes();
    $("h4").on("animationend webkitAnimationEnd oAnimationEnd", function() {
      $(this).hide(200);
      wordApp.lifesAdapted = wordApp.lifesAdapted + 1;
      wordApp.lifes();
      wordApp.displayLifes();
    });
  }, 500);
};

// every 1.5 seconds a random word will be generated
wordApp.intervalWord = function() {
  setInterval(() => {
    const randomIndex = wordApp.randomNumber();
    const randomWord = wordApp.wordBank[randomIndex];
    wordApp.addWord(randomWord);
    // Remove the randomly selected word from the word bank to avoid duplicates
    wordApp.wordBank = wordApp.wordBank.filter(word => word !== randomWord);
  }, 1500);
};

// random number to be used in the wordbank array
wordApp.randomNumber = function() {
  return Math.floor(Math.random() * wordApp.wordBank.length);
};

// init

wordApp.init = function() {
  wordApp.submitInput();
  wordApp.intervalWord();
  wordApp.dissapearWord();
  // wordApp.h4Position();
};

$(function() {
  wordApp.init();
});
