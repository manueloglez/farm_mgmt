class Polygon < ApplicationRecord
  belongs_to :user
  belongs_to :field

  validates :geom, presence: true

end
