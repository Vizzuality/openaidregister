Openaidregister::Application.routes.draw do

  resources :users do
    resources :projects
  end
  resources :sessions

  resources :projects do
    resources :transactions
    resources :external_organizations
    resources :documents
    resources :project_results
  end

  root :to     => 'home#index'
  get '/faq'   => 'home#faq'
  get '/about' => 'home#about'
  get '/terms' => 'home#terms'

end
