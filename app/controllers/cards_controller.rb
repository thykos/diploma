class CardsController < ApplicationController
  before_action :authenticate_user!, only: [:show, :index, :destroy]
  def show
    card = Card.find(params[:id])
    render_resource_or_errors card, serializer: CardFullSerializer
  end

  def destroy
    current_user.cards.where(id: params[:id]).destroy_all

    response json: {status: 'ok' }
  end

  def create
    card = Card.new(permitted_attributes(Card))
    card.save
    render_resource_or_errors card, serializer: CardFullSerializer
  end

  def index
    cards = Card.where(user_id: current_user.id).includes(:account)
    # render_resources cards, each_serializer: CardSerializer
    render json: { resources: cards }, each_serializer: CardFullSerializer
  end
end