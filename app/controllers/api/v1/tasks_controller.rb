class Api::V1::TasksController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :msg_not_found
  
  before_action :check_signed_in
  before_action :check_user_owns_task, only: [:show, :update, :destroy] 
  
  def index
    all_tasks = current_user.tasks.order(created_at: :desc).select(:id, :name, :tags, :done, :due) # Implicit model of things the main page needs
    render json: all_tasks
  end

  def create
    task = current_user.tasks.create!(task_params) # create! is being given a list of allowed params, defined below
    if task
      render json: { message: "Task created!" }, status: :ok
    else
      render json: task.errors
    end
  end

  def show
    if task
      render json: task, only: [:id, :name, :desc, :tags, :done, :due]
    else
      render json: task.errors
    end
  end

  def update
    task.update(task_params)
    if task
      render json: { message: "Task updated!" }, status: :ok
    else
      render json: task.errors
    end
  end
  
  def destroy
    task&.destroy
    render json: { message: "Task deleted!" }, status: :ok
  end

  private

  def current_user
    @_current_user ||= session[:current_user_id] && User.find_by(id: session[:current_user_id])
  end
  
  def task
    @task ||= Task.find(params[:id])
  end
  
  def task_params
    params.permit(:name, :desc, :done, :due, tags: [])
  end
  
  def check_user_owns_task
    render json: { message: "You are not allowed to access this task." }, status: :unauthorized unless current_user == task.user
  end
  
  def check_signed_in
    render json: { message: "You have to sign in first!" }, status: :unauthorized unless current_user
  end
  
  def msg_not_found
    render json: { message: "Record not found" }, status: :not_found
  end
end
