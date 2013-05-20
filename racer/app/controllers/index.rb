get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/game' do
  erb :game
end

get '/logout' do 
  session[:player_1] = nil
  session[:player_2] = nil
  redirect to '/'
end

get '/results/:game_id' do 
  @game = Game.find(params[:game_id])
  @winner = Gamer.where(:game_id => @game.id).order("completion_time DESC").first
  @time = @winner.completion_time
  erb :result
end

post '/players' do
  @player1 = Player.find_or_create_by_name(params[:first_player])
  @player2 = Player.find_or_create_by_name(params[:second_player])

  session[:player_1] = @player1.id
  session[:player_2] = @player2.id 
  #   redirect to '/game'
  # else
  #   @errors = @player1.errors + @player2.errors
  #   erb :index
  # end
  erb :game
end

post '/update_user_stats' do
  p params
  @player1 = Player.find_by_name(params[:player_1][:name])
  @player2 = Player.find_by_name(params[:player_2][:name])
  # p @player1
  # p @player2
  @game = Game.create
  Gamer.create(:player_id => @player1.id, :game_id => @game.id, :completion_time => params[:player_1][:time])
  Gamer.create(:player_id => @player2.id, :game_id => @game.id, :completion_time => params[:player_2][:time])
  "/results/#{@game.id}"
end
