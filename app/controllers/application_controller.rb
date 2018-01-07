class ApplicationController < ActionController::API
  include BaseControllerMethods
  include DeviseTokenAuth::Concerns::SetUserByToken
  # protect_from_forgery with: :exception
end
