class CompaniesController < ApplicationController

	def create
		sleep(2)
		@job = Company.new(company_params)
		if @job.save
			render json: @job
		else
			render json: @job.errors, status: 422
		end
	end

	private
		def company_params
			params.require(:company).permit(:name, :email, :url, :logo,
				company_locations_attributes: [:title, :email, :city, :county, :country,
					jobs_attributes: [:title, :description, :featured, :job_type_id]
				])
		end
end
