class Transaction < ActiveRecord::Base
  validates :amount, :account_from_id, :account_to_id, :result, presence: true
  enum result: [:approved, :declined]

  after_create :change_amount

  def change_amount
    acc_from = Account.find(self.account_from_id)
    acc_to = Account.find(self.account_to_id)
    acc_from.update(amount: acc_from.amount - self.amount)
    acc_to.update(amount: acc_to.amount + self.amount)
  end
end
