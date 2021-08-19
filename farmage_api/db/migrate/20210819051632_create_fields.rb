class CreateFields < ActiveRecord::Migration[6.1]
  def change
    create_table :fields do |t|
      t.string :name
      t.string :location
      t.string :crop_type
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
