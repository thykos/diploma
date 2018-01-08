class Account < ActiveRecord::Base
  validates :amount, presence: true
  belongs_to :card
end
