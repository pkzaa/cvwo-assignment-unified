Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :github, ENV['GITHUB_KEY'], ENV['GITHUB_SECRET'] # https://github.com/omniauth/omniauth-github
  # provider :indieauth, :client_id => 'https://parnikkapore.neocities.org/cvtasks/'
end
