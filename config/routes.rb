Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get     'tasks/index'
      post    'tasks/create'
      post    'tasks/update'
      get     '/show/:id',    to: 'tasks#show'
      delete  '/destroy/:id', to: 'tasks#destroy'
    end
  end
  root 'test#index'
  get '/*path' => 'test#index' # For any other GET request, let React handle it
    
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
