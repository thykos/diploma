class ApplicationController < ActionController::API
  include BaseControllerMethods
  include Pundit
  include DeviseTokenAuth::Concerns::SetUserByToken
  # protect_from_forgery with: :null_session

  # todo remove confirmation on signUp
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :birth_date, :email, :password])
  end

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
