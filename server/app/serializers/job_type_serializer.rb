class JobTypeSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :title, :position
end
