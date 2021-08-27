class Field < ApplicationRecord
  belongs_to :user
  has_many :polygons, dependent: :destroy

  validates :name, presence: true
  validates :crop_type, presence: true

  def crop_type
    self[:crop_type].capitalize
  end

  def name
    self[:name].capitalize
  end
end
