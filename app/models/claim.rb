class Claim < ActiveRecord::Base
  validates :description, :user_id, presence: true
  after_create :add_user_to_black_list
  belongs_to :user

  def add_user_to_black_list
    claims = Claim.where(user_id: user_id)
    if claims.size > 3
      Blacklist.create(user_id: user_id, claim_ids: claims.grep(:id) )
    end
  end
end
