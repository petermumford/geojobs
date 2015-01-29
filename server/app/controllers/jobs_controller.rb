class JobsController < ApplicationController

	def index
		# @jobs = Job.includes(:job_type, :company, :company_location)
		@jobs = Job.includes(:job_type)
								.search(params[:q])
								# .recent(30.day.ago)

		# @jobs = CompanyLocation.search(params[:q])
																				# .limit(1)

		# if params[:q].present?
		# 	@company_location = @company_location.search(params[:q])
		# end

		paginate @jobs#, per_page: 1
	end

	def show
		@job = Job.friendly.find(params[:id])
		render json: @job
	end

  def markers
		# Job.geo_scope(bounds: [sw, ne]).where(active: true)
		# Job.eager_load(:company_location).in_bounds([["51.28026634422212", "-0.8191049804687509"], ["51.76675680205544", "0.01586230468751637"]])
		# @markers = Job.eager_load(:company_location).in_bounds([params[:sw], params[:ne]])
		bounds = params[:bounds].split(',').each_slice(2).map{ |g| g.join(',') }
		# @markers = Job.select('jobs.*, company_locations.lat AS lat, company_locations.lng AS lng')
		# 							.joins(:company_location)
		# 							.in_bounds([bounds.first, bounds.last])
		@markers = CompanyLocation.select('company_locations.id, company_locations.lat, company_locations.lng, count(jobs.id) as jobs_count')
															.joins(:jobs)
															.in_bounds([bounds.first, bounds.last])
															.group("company_locations.id")

		render json: @markers, each_serializer: MarkerSerializer, root: false
	end

end
