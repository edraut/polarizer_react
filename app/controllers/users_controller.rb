class UsersController < ApplicationController

  def login_form
    render plain: 'TODO: render a login form'
  end

  def login
    @user = User.find_by email: params[:email]
    if @user
      render json: {token: 'ABC'}
    else
      render json: {errors: 'login invalid'}
    end
  end

end
