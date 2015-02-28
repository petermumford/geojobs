class ApplicationController < ActionController::API

	def paginate(*options_or_collection)
		options 		= options_or_collection.extract_options!
		resource 		= options_or_collection.first
		collection 	= _paginate_collection(resource, options)

		options[:json] = collection
		unless options[:show_meta] === false
			options[:meta] = {
				total_pages: 	collection.total_pages,
				current_page: collection.current_page,
				total: 				collection.total_count
			}
		end

		render options
	end


	private

		def _paginate_collection(collection, options={})
			options = {
				:page     => params[:page],
				:per_page => (options.delete(:per_page) || params[:per_page])
			}

			_sql_collection(collection, options)
		end

		def _sql_collection(collection, options={})
			options[:page]     ||= 1
			options[:per_page] = (options[:per_page].to_i <= 0 ? 25 : options[:per_page])

			collection.page(options[:page]).per(options[:per_page])
		end

end
