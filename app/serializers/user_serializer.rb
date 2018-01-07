class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :birth_date

  has_many :cards
end