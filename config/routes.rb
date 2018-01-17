Rails.application.routes.draw do
  scope :api do
    mount_devise_token_auth_for 'User', at: 'auth'
    resources :users, only: [:index, :show, :update]
    resources :cards, only: [:index, :show, :destroy, :create]
    resources :claims, only: [:create, :index]
    resources :transactions, only: [:create, :index]
  end
end
