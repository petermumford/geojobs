class CreateCompanyLocations < ActiveRecord::Migration
  def change
    create_table :company_locations do |t|
      t.string :email
      t.string :city
      t.string :county
      t.string :country
      t.float :lat
      t.float :lng
      t.belongs_to :company

      t.timestamps null: false
    end

    add_index :company_locations, [:lat, :lng]
  end
end
