class ApplicationController < ActionController::API
  include BaseControllerMethods
  include Pundit
  include DeviseTokenAuth::Concerns::SetUserByToken
  # protect_from_forgery with: :exception

  private
  rescue_from ActionController::ParameterMissing do |exception|
    render json: { errors: exception.message }, status: :bad_request
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json: { errors: exception.message }, status: :not_found
  end

  rescue_from Pundit::NotAuthorizedError do
    render json: { errors: 'You are not authorized to access this action.' }, status: :forbidden
  end
end
