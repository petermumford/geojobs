require 'uri'

class Company < ActiveRecord::Base
	has_many :company_locations
	has_many :jobs, through: :company_locations

	accepts_nested_attributes_for :company_locations

	validates_presence_of :name, :url, :email
	validates_format_of :url, :with => URI.regexp(['http'])
	# validates_associated :company_locations

	after_save :create_slug

  def to_param
    [id, name.parameterize].join("-")
  end

  def create_slug
		self.update_column(:slug, self.to_param)
  end
end
