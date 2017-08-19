class UsersController < ApplicationController

  def create
    @user = User.create(user_params)
    if @user.errors.empty?
      attach_session
      render json: {message: 'signup succesful'}
    else
      render json: {message: 'signup failed', errors: @user.errors.full_messages}, status: 409
    end
  end

  def login
    @user = User.find_by email: params[:email]
    if @user
      attach_session
      render json: {message: 'login succesful'}
    else
      render json: {errors: 'login invalid'}, status: 409
    end
  end

  def logout
    reset_session
    redirect_to root_path
  end

  protected

  def user_params
    params.require(:user).permit!
  end

  def attach_session
    session[:user_id] = @user.id
  end
end
