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
  post 'auth/developer', as:"login_developer"
  post 'auth/github',    as:"login_github"
  post 'auth/indieauth', as:"login_indieauth"
  
  get '/auth/:provider/callback', to: 'api/v1/logins#create'
  post '/auth/:provider/callback', to: 'api/v1/logins#create'
  post 'auth/logout',              to: 'api/v1/logins#destroy'
  
  # Unknown GET: Pass to React
  get '/*path' => 'test#index'
end
