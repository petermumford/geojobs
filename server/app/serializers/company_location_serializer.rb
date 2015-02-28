class CompanyLocationSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :title, :email, :city, :county, :country, :lat, :lng

  has_one :company
  has_many :jobs

  def include_associations!
    include! :company
    include! :jobs unless options[:exclude_has_many_jobs]
  end

end
