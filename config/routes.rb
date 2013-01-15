Openaidregister::Application.routes.draw do

  resources :projects
  resources :transactions
  resources :organizations
  resources :documents
  resources :project_results
  root :to => 'home#index'

end
