class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    users = User.all
    render_resources users, each_serializer: UserPublicSerializer
  end

  def show
    user = User.includes(:cards).find(params[:id])

    render_resource_or_errors user, serializer: :serializer
  end

  def serializer
    if current_user.id === params[:id]; UserSerializer else UserPublicSerializer end
  end
end

