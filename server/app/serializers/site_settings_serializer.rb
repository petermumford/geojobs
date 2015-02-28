class SiteSettingsSerializer < ActiveModel::Serializer

	has_many :job_types, serializer: JobTypeSerializer, embed: :objects
end