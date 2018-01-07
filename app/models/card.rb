class Card < ActiveRecord::Base
  validates :number, :cvv2, :expiry_date, presence: true
  has_one :user, dependent: :destroy
end
