class Api::V1::LoginsController < ApplicationController
  # If you're using a strategy that POSTs during callback, you'll need to skip the authenticity token check for the callback action only. 
  skip_before_action :verify_authenticity_token, only: :create

  # Log in - Callback from OmniAuth
  def create
    @user = User.fetch(auth_hash)
    
    session[:current_user_id] = @user.id
    @_current_user = @user
    redirect_to '/'
  end
  
  # Log out
  def destroy
    # Remove the user id from the session
    session.delete(:current_user_id)
    # Clear the memoized current user
    @_current_user = nil
    render json: { message: "Logout successful!" }, status: :ok
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end 
