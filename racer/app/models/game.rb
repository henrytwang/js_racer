class Game < ActiveRecord::Base
  has_many :gamers
  has_many :players, through: :gamers
end
