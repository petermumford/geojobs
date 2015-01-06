class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
      t.string :url
      t.string :email
      t.string :logo
      t.string :slug

      t.timestamps null: false
    end
    add_index :companies, :name
    add_index :companies, :slug, :unique => true
  end
end
