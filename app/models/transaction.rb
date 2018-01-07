class Transaction < ActiveRecord::Base
  validates :amount, :account_from_id, :account_to_id, :result, presence: true
  enum result: [:approved, :declined]
end
