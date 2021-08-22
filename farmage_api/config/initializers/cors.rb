Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:5500', '127.0.0.1:5500', 'localhost:3001'
    resource(
      '/api/*', 
      credentials: true,
      headers: :any, 
      methods: [:get, :post, :patch, :delete, :put, :options]
    )
  end
end