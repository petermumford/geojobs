class JobType < ActiveRecord::Base
	default_scope -> { order(:position) }
	has_many :jobs
end
