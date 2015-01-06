class Company < ActiveRecord::Base
	extend FriendlyId

	friendly_id :name, use: :slugged

	has_many :company_locations
	has_many :jobs, through: :company_locations

	accepts_nested_attributes_for :company_locations

	validates_presence_of :name, :url, :email
end
