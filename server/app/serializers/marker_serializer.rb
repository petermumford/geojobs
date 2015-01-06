class MarkerSerializer < ActiveModel::Serializer
  attributes 	:id, :lat, :lng
  has_many :jobs, serializer: JobShortSerializer
end
