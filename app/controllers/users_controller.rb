class UsersController < ApplicationController
  def index
    users = User.all
    render_resources users, each_serializer: UserSerializer
  end

  def show
    user = User.find(params[:id])
    render_resource_or_errors user, serializer: UserSerializer
  end
end