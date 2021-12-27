class Api::V1::TasksController < ApplicationController
   def index
    task = Task.all.order(created_at: :desc).select(:id, :name, :tags, :done, :due) # Implicit model of things the main page needs
    render json: task
  end

  def create
    task = Task.create!(task_params) # create! is being given a list of allowed params, defined below
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def show
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def update
    task.update(task_params)
    if task
      render json: task
    else
      render json: task.errors
    end
  end
  
  def destroy
    task&.destroy
    render json: { success: true, message: 'Task deleted!' }
  end

  private

  def task_params
    params.permit(:name, :desc, :done, :due, tags: [])
  end

  def task
    @task ||= Task.find(params[:id])
  end
end
