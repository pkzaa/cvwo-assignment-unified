# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

Task.create(
    name: "Set up a space empire",
    desc: "",
    tags: ["funsies"],
    done: true,
    due:  Date.new(2025, 5, 4)
)
Task.create(
    name: "Finish CVWO task",
    desc: "this is way more challenging than expected...",
    tags: ["real"],
    done: true,
    due:  Date.new(2022, 1, 20)
)
Task.create(
    name: "Take out the trash",
    desc: "Yup.",
    tags: ["funsies", "real"],
    done: true,
    due:  Date.new(2021, 12, 25)
)
