class CreateBlacklists < ActiveRecord::Migration[5.1]
  def change
    create_table :blacklists do |t|
      t.references :claims
      t.references :user, uniq: true
    end
  end
end
