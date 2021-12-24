class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :desc
      t.json :tags, default: []
      t.boolean :done, default: false
      t.date :due

      t.timestamps
    end
  end
end
