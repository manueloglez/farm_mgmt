class CreatePolygons < ActiveRecord::Migration[6.1]
  def change
    create_table :polygons do |t|
      t.geometry :geom, srid: 4326, using: :gist
      t.string :classification
      t.text :commentary
      t.float :area
      t.references :user, null: false, foreign_key: true
      t.references :field, null: false, foreign_key: true

      t.timestamps
    end
  end
end
