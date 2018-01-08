class CardPolicy < ApplicationPolicy
  def show?
    record.user_id === user.id
  end

  def index?
    show?
  end

  def create?
    show?
  end

  def destroy
    show?
  end

  def permitted_attributes
    [:number, :cvv2, :expiry_date, :id, :user_id]
  end

end