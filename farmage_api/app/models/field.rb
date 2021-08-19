class Field < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :crop_type, presence: true
end
