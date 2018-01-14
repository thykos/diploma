class Transaction < ActiveRecord::Base
  validates :amount, :account_from_id, :account_to_id, :result, presence: true
  enum result: [:approved, :declined]
  before_save :get_result
  after_save :change_amount

  def change_amount
    if self.result === 0
      acc_from = Account.find(self.account_from_id)
      acc_to = Account.find(self.account_to_id)
      acc_from.update(amount: acc_from.amount - self.amount)
      acc_to.update(amount: acc_to.amount + self.amount)
    end
  end

  def get_result
    user_to = Account.find(self.account_to_id).card.user_id
    if Blacklist.where(user_id: user_to).size > 0
      self.result = 1
    else
      self.result = 0
    end

  end
end
