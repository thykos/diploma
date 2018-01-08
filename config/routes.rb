Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api do
    mount_devise_token_auth_for 'User', at: 'auth'
    resources :users, only: [:index, :show, :update]
    resources :cards, only: [:index, :show, :destroy, :create]
    resources :claims, only: [:create]
  end
end
