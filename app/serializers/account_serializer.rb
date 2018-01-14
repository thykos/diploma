class AccountSerializer < ActiveModel::Serializer
  attributes :id, :amount, :transactions_created, :transactions_received, :transactions
end