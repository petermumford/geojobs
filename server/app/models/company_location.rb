class CompanyLocation < ActiveRecord::Base
	acts_as_mappable

	has_many :jobs
	belongs_to :company

	validates_presence_of :email, :city, :lat, :lng
end
