class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
          :recoverable, :validatable
  include DeviseTokenAuth::Concerns::User
  validates :first_name, :last_name, :birth_date, presence: true
  has_many :cards
end
