class UserPolicy < ApplicationPolicy

  def permitted_attributes
    [:first_name, :last_name, :email, :birth_date]
  end
end