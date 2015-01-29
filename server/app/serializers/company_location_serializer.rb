class CompanyLocationSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :city, :county, :country, :lat, :lng

  has_one :company
  has_many :jobs

  # def jobs
  # 	object.jobs.recent(30.day.ago)
  # end

  # def include_associations!
  #   include! :company
  #   include! :jobs if options[:include_jobs]
  # end

end
