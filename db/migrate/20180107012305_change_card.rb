class ChangeCard < ActiveRecord::Migration[5.1]
  def change
    change_column :cards, :number, :string
  end
end
