class Job < ActiveRecord::Base
	include PgSearch

  belongs_to :job_type
  belongs_to :company_location
  has_one :company, through: :company_location, autosave: false

  validates_presence_of :title, :description, :job_type

  default_scope -> { where('jobs.created_at > ?', 30.day.ago).order("(jobs.featured AND jobs.created_at > now() - interval '7 days') desc nulls last, jobs.created_at DESC") }

  after_save :create_slug

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

  def to_param
    [id, title.parameterize].join("-")
  end

  def create_slug
    self.update_column(:slug, self.to_param)
  end
end
