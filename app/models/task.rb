class Task < ApplicationRecord
    belongs_to :user
    validates :name, presence: true
    validates :done, inclusion: { in: [true, false]}
end
