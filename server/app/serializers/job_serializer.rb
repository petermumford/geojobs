class JobSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :title, :description, :featured, :created_at, :pg_search_rank, :slug, :job_type_id

  has_one :company_location

	def slug
		object.to_param
	end

  def include_pg_search_rank?
  	object.respond_to?(:pg_search_rank)
  end
end
