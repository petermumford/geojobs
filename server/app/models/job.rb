class Job < ActiveRecord::Base
	extend FriendlyId
	include PgSearch

  belongs_to :job_type
  belongs_to :company_location
  has_one :company, through: :company_location, autosave: false

  validates_presence_of :title, :description

  # ORDER BY (featured AND created_at > now() - interval '11 days') DESC NULLS LAST, created_at DESC
  default_scope -> { where('jobs.created_at > ?', 30.day.ago).order("(jobs.featured AND jobs.created_at > now() - interval '7 days') desc nulls last, jobs.created_at DESC") }
  # scope :recent, -> (days_ago) { where('jobs.created_at > ?', days_ago) }

	friendly_id :title, use: :slugged
  acts_as_mappable through: :company_location
	pg_search_scope :search,
									against: [:title],
									associated_against: {
										company_location: [:city]
									},
									using: {
										tsearch: {prefix: true},
										trigram: {}
									},
									order_within_rank: 'jobs.created_at DESC'
end
