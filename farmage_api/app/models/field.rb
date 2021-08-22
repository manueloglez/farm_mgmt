class Field < ApplicationRecord
  belongs_to :user
  has_many :polygons, dependent: :destroy

  validates :name, presence: true
  validates :crop_type, presence: true
end
