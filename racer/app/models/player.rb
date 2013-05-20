class Player < ActiveRecord::Base
  has_many :gamers
  has_many :games, through: :gamers

  validates :name, :uniqueness => true;

  # Remember to create a migration!
end
