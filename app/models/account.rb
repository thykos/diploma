class Account < ActiveRecord::Base
  validates :amount, presence: true
  belongs_to :card

  def transactions_created
    Transaction.where(account_from_id: self.id)
  end

  def transactions_received
    Transaction.where(account_to_id: self.id)
  end

  def transactions
    transactions_created.to_a.concat transactions_received.to_a
  end
end
