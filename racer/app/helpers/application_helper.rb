def current_player_1
  @player1 ||= Player.find(session[:player_1])
end

def current_player_2
  @player2 ||= Player.find(session[:player_2])
end
