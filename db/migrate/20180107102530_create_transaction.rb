class CreateTransaction < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.integer :account_from_id
      t.integer :account_to_id
      t.integer :amount, default: 0
      t.integer :result, default: 0
    end
    add_column :accounts, :transaction_ids, :integer
  end
end
