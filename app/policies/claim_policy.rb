class ClaimPolicy < ApplicationPolicy
  def create?
    user.present?
  end

  def permitted_attributes
    [:description, :user_id]
  end
end
