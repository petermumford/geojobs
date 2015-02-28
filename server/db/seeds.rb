# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
job_types = [{ :title => 'Full Time', :position => 1 },
             { :title => 'Part Time', :position => 2 },
           	 { :title => 'Freelance', :position => 3 },
           	 { :title => 'Temporary', :position => 4 }]

job_types.each_index do |i|
  JobType.create( :title => job_types[i][:title], position: job_types[i][:position] )
end

10.times do |c|
	Company.create( name: "#{Faker::Company.name} - #{c}", url: Faker::Internet.url('example.com'), email: Faker::Internet.email, logo: Faker::Company.logo )
end

15.times do |c|
	company = Company.order("RANDOM()").limit(1).first
	company_location = CompanyLocation.new( email: Faker::Internet.safe_email,
																					city: Faker::Address.city,
																					county: Faker::Address.state,
																					country: Faker::Address.country,
																					lat: Faker::Address.latitude,
																					lng: Faker::Address.longitude )
	company_location.company = company
	company_location.save
end

100.times do |j|
	job_type = JobType.order("RANDOM()").limit(1).first
	company_location = CompanyLocation.order("RANDOM()").limit(1).first

	job = Job.new( 	title: Faker::Commerce.product_name, description: Faker::Lorem.paragraph(2), featured: false, job_type: job_type, company_location: company_location )
	job.save
end