class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :validatable
  include DeviseTokenAuth::Concerns::User
  validates :first_name, :last_name, :birth_date, presence: true
  validates_date :birth_date, on_or_before: lambda { Date.current - 16.years }
  has_many :cards
  has_many :claims
  has_one :blacklist

  def all_transactions
    transactions = {
        created: [],
        received: []
    }
    Account.where(card_id: self.cards.pluck(:id)).map do |item|
      transactions[:created].concat item.transactions_created.to_a
      transactions[:received].concat item.transactions_received.to_a
    end
    transactions
  end
end
