class CompanyLocationsController < ApplicationController

	def show
		sleep(2)
		# @company_location = CompanyLocation.find(params[:id])
		@company_location = CompanyLocation.where(id: params[:id])
																				.joins(:jobs)
																				.includes(:company, :jobs)
																				.group("company_locations.id")

		render json: @company_location
	end

end