class CreateJobTypes < ActiveRecord::Migration
  def change
    create_table :job_types do |t|
      t.string :title
      t.integer :position

      t.timestamps null: false
    end
  end
end
