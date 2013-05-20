class CreateGamers < ActiveRecord::Migration
  def change
    create_table :gamers do |t|
      t.integer :game_id, :player_id
      t.float    :completion_time
      t.timestamps
    end
  end
end
