class TransactionsController < ApplicationController
  before_action :authenticate_user!

  def create
    from = Account.where(card_id: params[:resource][:card_id]).first
    card_to = Card.where(number: params[:resource][:card_to_number]).first.try(:id)
    to_id = Account.where(card_id: card_to).first.try(:id)
    if to_id
      transaction = Transaction.create({
                                           amount: params[:resource][:amount],
                                           account_from_id: from.id,
                                           account_to_id: to_id,
                                           loc: params[:resource][:loc],
                                           city: params[:resource][:city],
                                           country: params[:resource][:country],
                                           ip: params[:resource][:ip]
                                       })
      transaction.save
      render_resource_or_errors transaction
    else
      render json: {errors: {account_to_id: 'Такой карты нет в системе'}}
    end

  end

  def index
    total = current_user.all_transactions[:created].size + current_user.all_transactions[:received].size
    render json: {resources: current_user.all_transactions, meta: {total: total}}
  end
end
