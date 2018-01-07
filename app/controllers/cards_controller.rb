class CardsController < ApplicationController
  def show
    card = Card.find(params[:id])
    render_resource_or_errors card
  end
end