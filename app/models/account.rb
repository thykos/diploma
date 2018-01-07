class Account < ActiveRecord::Base
  validates :amount, presence: true
  belongs_to :card
  has_many :transactions
end
