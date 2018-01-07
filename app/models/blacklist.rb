class Blacklist < ActiveRecord::Base
  has_many :claims
  has_one :user, uniq: true
end
