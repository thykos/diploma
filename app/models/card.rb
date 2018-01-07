class Card < ActiveRecord::Base
  validates :cvv2, :expiry_date, presence: true
  validate :check_card_nubmer_by_luhn?, on: [:create, :update]
  validates_length_of :number, :minimum => 16, :maximum => 16, :allow_blank => false
  has_one :user

  def check_card_nubmer_by_luhn?
    digits = number.chars.map(&:to_i)
    check = digits.pop

    sum = digits.reverse.each_slice(2).flat_map do |x, y|
      [(x * 2).divmod(10), y || 0]
    end.flatten.inject(:+)

    valid_card = check.zero? ? sum % 10 == 0 : (10 - sum % 10) == check
    if valid_card
      true
    else
      errors.add(:number, "invalid card number")
    end
  end
end
