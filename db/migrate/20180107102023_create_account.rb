class CreateAccount < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
      t.references :card
      t.integer :amount, default: 0
    end
  end
end
