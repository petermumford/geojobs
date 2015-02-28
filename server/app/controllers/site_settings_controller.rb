class SiteSettingsController < ApplicationController
	def settings
		@site = SiteSettings.new
		render json: SiteSettingsSerializer.new(@site).as_json, status: :ok
	end
end
