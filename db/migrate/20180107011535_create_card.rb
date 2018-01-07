class CreateCard < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.integer :number
      t.integer :cvv2
      t.date :expiry_date
      t.references :user
    end
  end
end
