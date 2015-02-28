class CompanyLocation < ActiveRecord::Base
	acts_as_mappable

	has_many :jobs
	belongs_to :company

	accepts_nested_attributes_for :jobs

	validates_presence_of :title, :email, :city, :lat, :lng

	after_save :create_slug

  def to_param
    [id, title.parameterize].join("-")
  end

	def create_slug
		self.update_column(:slug, self.to_param)
	end
end
