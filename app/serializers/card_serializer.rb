class CardSerializer < ActiveModel::Serializer
  attributes :id, :number, :user_id
end