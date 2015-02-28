class AddSlugAndTitleToCompanyLocation < ActiveRecord::Migration
  def change
  	add_column :company_locations, :title, :string
    add_column :company_locations, :slug, :string

    add_index :company_locations, :slug
  end
end
