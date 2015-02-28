class MarkerSerializer < ActiveModel::Serializer
  attributes 	:id, :lat, :lng, :slug, :jobs_count
end
