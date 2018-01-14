class Blacklist < ActiveRecord::Base
  has_many :claims
  belongs_to :user
end
