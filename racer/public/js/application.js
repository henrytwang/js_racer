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

$(document).ready(function(){
  var restart = $(".play_again")
  restart.hide();
  var player_1_name = $(".player_1_name").text();
  var player_2_name = $(".player_2_name").text();
  var start = Math.round(new Date().getTime() / 1000)
  $(this).keypress(function(event){
    // board.move(event.keyCode);
    if (event.keyCode == 112) {
      if ($("#player1_strip td.active").next().is('.finish')) {
        var end = Math.round(new Date().getTime() / 1000)
        alert(end - start)
        var players = { "player_2" : {"name":player_2_name, "time": 0}, "player_1" : {"name":player_1_name, "time": end-start} }
        $.post('/update_user_stats', players, function(response){
          $("#results").append($('<a>').attr('href', response).html(response));
        });
        restart.show();
      } else {
        $("#player1_strip td.active").removeClass("active").next().addClass("active");
      }
    } else if (event.keyCode == 113) {
      if ($("#player2_strip td.active").next().is('.finish')) {
        var end = Math.round(new Date().getTime() / 1000)
        alert(end - start)
        var players = { "player_1" : {"name":player_1_name, "time": 0}, "player_2" : {"name":player_2_name, "time": end-start} }
        $.post('/update_user_stats', players, function(response){
          $("#results").append($('<a>').attr('href', response).html(response));
        });
        restart.show();
      } else {
        $("#player2_strip td.active").removeClass("active").next().addClass("active");
      }
    }
  });
});

