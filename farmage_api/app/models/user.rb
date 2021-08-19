class User < ApplicationRecord
  has_secure_password
  has_many :fields, dependent: :destroy
  has_many :polygons, dependent: :destroy

  validates(
    :email, 
    uniqueness: true,
    presence: true,
    format: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i,
  )

  def full_name
    "#{first_name} #{last_name}".strip
  end

end
