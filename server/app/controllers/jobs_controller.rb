class JobsController < ApplicationController

	def index
		bounds = params[:bounds].split(',').each_slice(2).map{ |g| g.join(',') }
		# @jobs = Job.joins(:company_location).in_bounds([bounds.first, bounds.last]).includes(company_location: [:company, jobs: [:job_type]])
		@jobs = Job.joins(:company_location).in_bounds([bounds.first, bounds.last]).includes(company_location: [:company, :jobs])
		# if params[:q].present?
		# 	@jobs = @company_location.search(params[:q])
		# end
		paginate @jobs, root: :jobs#, per_page: 1
	end

	def show
		@job = Job.joins(:company_location).find(params[:id])
		render json: @job, exclude_has_many_jobs: true
	end

  def markers
		# Job.eager_load(:company_location).in_bounds([["51.28026634422212", "-0.8191049804687509"], ["51.76675680205544", "0.01586230468751637"]])
		bounds = params[:bounds].split(',').each_slice(2).map{ |g| g.join(',') }
		@markers = CompanyLocation.select('company_locations.id, company_locations.lat, company_locations.lng, company_locations.slug, count(jobs.id) as jobs_count')
															.joins(:jobs)
															.in_bounds([bounds.first, bounds.last])
															.group("company_locations.id")

		render json: @markers, each_serializer: MarkerSerializer, root: false
	end

	def create
		sleep(2)
		@job = Job.new(job_params)
		if @job.save
			render json: @job
		else
			render json: @job.errors, status: 422
		end
	end

	private
		def job_params
			params.require(:job).permit(:title, :description, :job_type_id)
		end

end
