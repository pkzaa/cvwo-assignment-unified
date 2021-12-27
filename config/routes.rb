# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  # Root: App
  root 'test#index'
  
  # API
  namespace :api do
    namespace :v1 do
      resources :tasks, except: [:new, :edit]
    end
  end
  
  # Auth
  post 'auth/developer',   as:"login_developer"
  
  post '/auth/:provider/callback', to: 'api/v1/logins#create'
  
  # Unknown GET: Pass to React
  get '/*path' => 'test#index'
end
