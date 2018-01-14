class CardsController < ApplicationController
  before_action :authenticate_user!, only: [:show, :index, :destroy]
  def show
    card = Card.find(params[:id])
    render_resource_or_errors card, serializer: CardFullSerializer
  end

  def destroy
    current_user.cards.where(id: params[:id]).destroy_all
    render json: {status: 'ok' }
  end

  def create
    card = Card.new(permitted_attributes(Card))
    card.save
    render_resource_or_errors card, serializer: CardFullSerializer
  end

  def index
    cards = current_user.cards.includes(:account)
    render json: { resources: cards }, each_serializer: CardFullSerializer
  end
end
