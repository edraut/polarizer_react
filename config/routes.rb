Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'welcome#show'

  get '/login_form', to: 'users#login_form', as: :login_form
  post '/login', to: 'users#login', as: :login
  post '/create_user', to: 'users#create', as: :create_user
  get '/logout', to: 'users#logout', as: :logout

end
