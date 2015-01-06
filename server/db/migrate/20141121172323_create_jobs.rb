class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :title
      t.text :description
      t.string :slug
      t.boolean :featured
      t.belongs_to :job_type
      t.belongs_to :company_location

      t.timestamps null: false
    end

    add_index :jobs, :title
    add_index :jobs, :slug, :unique => true
    add_index :jobs, :job_type_id
  end
end
