// board = {
//   players: {
//     'player1': 112,
//     'player2': 113
//   },
//   positions: {
//     112: 1,
//     113: 1
//   },
//   move: function(key) {
//     if(!board.finished()) {
//       board.positions[key] += 1;
//       board.display();      
//     }
//   },
//   display: function() {
//     for(var i = 0; i < players.length; i++) {
//       $('#' + players[i] + '_strip td').removeClass("active");
//       $('#' + players[i] + '_strip td:nth-child(' + positions[player[i]] + ')').addClass('active');
//     }
//   }
// }

var Board = function() {
  this.player_1_name = $(".player_1_name").text();
  this.player_2_name = $(".player_2_name").text();
};

Board.prototype = {

  times: {
    start : undefined,
    end : undefined
  },

  preGame: function(){
    $(".play_again").hide();
    this.countDown();
  },

  duration: function() {
    return (this.times.end - this.times.start)/1000
  },

  countDown: function(){
    var self = this;
    $("#three").slideDown(1000).delay(1000).slideUp(500, function(){
      $("#two").slideDown(1000).delay(1000).slideUp(500, function(){
        $("#one").slideDown(1000).delay(1000).slideUp(500, function(){
          self.times.start = Math.round(new Date().getTime());
        });
      });
    });
  },


  // movePlayer1: function() {
  //   for(var i = 0; i < players.length; i++) {
  //   if ($("#player1_strip td.active").next().is('.finish')) {
  //       this.times.end = Math.round(new Date().getTime());
  //       alert(this.duration());
  //       var players = 
  //       { "player_1" : {"name":this.player_1_name, "time": this.duration()},
  //         "player_2" : {"name":this.player_2_name, "time": 0}  };
  //       $.post('/update_user_stats', players, function(response){
  //         $("#results").append($('<a>').attr('href', response).html(response));
  //       });
  //       $(".play_again").show();
  //     } 
  //   else {
  //       $("#player1_strip td.active").removeClass("active").next().addClass("active");
  //     }
  //   }
  // },


  movePlayer1: function() {

    if ($("#player1_strip td.active").next().is('.finish')) {
        this.times.end = Math.round(new Date().getTime());
        alert(this.duration());
        var players = 
        { "player_1" : {"name":this.player_1_name, "time": this.duration()},
          "player_2" : {"name":this.player_2_name, "time": 0}  };
          console.log(players);
        $.post('/update_user_stats', players, function(response){
          $("#results").append($('<a>').attr('href', response).html(response));
        });
        $(".play_again").show();
      } 
    else {
        $("#player1_strip td.active").removeClass("active").next().addClass("active");
      }
  },

  movePlayer2: function() {

    if ($("#player2_strip td.active").next().is('.finish')) {
        this.times.end = Math.round(new Date().getTime());
        alert(this.duration());
        var players = 
        { "player_1" : {"name":this.player_1_name, "time": 0}, 
          "player_2" : {"name":this.player_2_name, "time": this.duration() } };
        $.post('/update_user_stats', players, function(response){
          $("#results").append($('<a>').attr('href', response).html(response));
        });
        $(".play_again").show();
      } 
    else {
        $("#player2_strip td.active").removeClass("active").next().addClass("active");
      }
  }

}


$(document).ready(function(){
  var board = new Board();
  board.preGame();
  $(this).keypress(function(event){
    // board.move(event.keyCode);
    if (event.keyCode == 112) {
      board.movePlayer1();
    } else if (event.keyCode == 113) {
      board.movePlayer2();
    }
  });
});

