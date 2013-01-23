Openaidregister::Application.routes.draw do

  resources :users do
    resources :projects
  end
  resources :sessions

  resources :projects
  resources :transactions
  resources :external_organizations
  resources :documents
  resources :project_results

  root :to => 'home#index'

end
