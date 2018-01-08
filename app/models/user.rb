class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :validatable
  include DeviseTokenAuth::Concerns::User
  validates :first_name, :last_name, :birth_date, presence: true
  validates_date :birth_date, on_or_before: lambda { Date.current - 16.years }
  has_many :cards
  has_many :claims
  has_one :blacklist

  # def send_confirmation_notification?
  #   false
  # end
end
