class CardPolicy < ApplicationPolicy
  def show?
    record.user_id === user.id
  end

  def index?
    show?
  end

end