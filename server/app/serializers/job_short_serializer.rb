class JobShortSerializer < ActiveModel::Serializer
  attributes 	:id, :title, :slug, :featured, :created_at
end
