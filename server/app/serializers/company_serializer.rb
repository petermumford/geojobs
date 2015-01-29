class CompanySerializer < ActiveModel::Serializer
  # embed :ids, include: true

  attributes :id, :name, :url, :logo

  # has_many :company_locations
end
