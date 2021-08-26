class Polygon < ApplicationRecord
  belongs_to :user
  belongs_to :field

  validates :geom, presence: true

  attribute :geom, :st_polygon, srid: 4326, geographic: true

end
