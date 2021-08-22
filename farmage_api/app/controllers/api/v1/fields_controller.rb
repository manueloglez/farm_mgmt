class Api::V1::FieldsController < Api::ApplicationController
  before_action :find_field, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def create
    field = Field.new field_params
    field.user = current_user
    if field.save
      render json: {id: field.id}
    else
      render(
        json: {errors: field.errors.messages},
        status: 422
      )
    end
  end

  def show
    if can? :read, @field
      render json: @field
    else
      render json: {errors: "You are not authorized to view this field"}, status: 401
    end
  end

  def index
    fields = current_user.fields
    render json: fields
  end

  def update
    unless can? :update, @field
      render json: {errors: "You are not authorized to update this field"}, status: 401
    else
      if @field.update field_params
        render json: @field
      else
        render(
          json: {errors: @field.errors.messages},
          status: 422
        )
      end
    end
  end

  def destroy
    unless can? :destroy, @field
      render json: {errors: "You are not authorized to delete this field"}, status: 401
    else
      if @field.destroy
        render json: {message: "Field deleted", id: @field.id}
      else
        render(
          json: {errors: @field.errors.messages},
          status: 422
        )
      end
    end
  end


  private
  def find_field
    @field = Field.find params[:id]
  end

  def field_params
    params.require(:field).permit(:name, :location, :crop_type)
  end
end
