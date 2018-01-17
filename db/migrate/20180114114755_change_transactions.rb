class ChangeTransactions < ActiveRecord::Migration[5.1]
  def change
    add_column :transactions, :loc, :string
    add_column :transactions, :city, :string
    add_column :transactions, :country, :string
    add_column :transactions, :ip, :string
  end
end
