class CompanyLocationSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :city, :county, :country, :lat, :lng

  has_one :company
  # has_many :jobs
end
