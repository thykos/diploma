class CardFullSerializer < ActiveModel::Serializer
  attributes :id, :number, :user_id, :cvv2, :expiry_date

  has_one :account
end