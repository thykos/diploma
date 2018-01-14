class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    cards = current_user.cards.includes(:account)
    render json: { resources: cards }, each_serializer: CardFullSerializer
  end
end
