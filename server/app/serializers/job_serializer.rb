class JobSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes 	:id, :title, :description, :slug, :featured, :created_at, :pg_search_rank

  has_one :job_type
  # has_one :company_location

  def include_pg_search_rank?
  	object.respond_to?(:pg_search_rank)
  end
end
