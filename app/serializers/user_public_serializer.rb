class UserPublicSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :birth_date
end