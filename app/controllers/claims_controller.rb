class ClaimsController < ApplicationController
  before_action :authenticate_user!
  def create
    claim = Claim.create(permitted_attributes(Claim))
    claim.save
    render_resource_or_errors claim
  end

  def index
    claims = Claim.where(author: current_user.id)
    render json: {resources: claims, meta: { total: claims.size }}
  end
end
