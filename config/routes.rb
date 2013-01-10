Openaidregister::Application.routes.draw do

  resources :projects
  resources :transactions
  root :to => 'home#index'

end
