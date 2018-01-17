class AddAuthorToClaims < ActiveRecord::Migration[5.1]
  def change
    add_column :claims, :author, :integer
  end
end
