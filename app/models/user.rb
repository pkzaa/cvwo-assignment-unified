class User < ApplicationRecord
  # Fetches the user associated with the auth_hash, or make a new one if it doesn't exist
  def self.fetch(auth_hash)
    our_user = self.find_by(provider: auth_hash.provider, uid: auth_hash.uid)
    
    if our_user.nil? then
      our_user = self.create(provider: auth_hash.provider, uid: auth_hash.uid)
    end
    
    our_user
  end
end
