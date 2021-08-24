Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :fields, only: [:index, :show, :update, :create, :destroy] do
        resources :polygons, only: [:index, :show, :update, :create, :destroy], shallow: true
      end
      resource :session, only: [:create, :destroy]
      resources :users, only: [:show, :create] do
        resources :polygons, only: [:index]
        get :current, on: :collection
      end
    end
    match "*unmatched_route", to: "application#not_found", via: :all
  end
end
