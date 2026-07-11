class Post < ApplicationRecord
  validates :title, :description, :body, presence: true

  scope :search_by_title, ->(query) { where("lower(title) LIKE ?", "%#{query.downcase}%") }
end
