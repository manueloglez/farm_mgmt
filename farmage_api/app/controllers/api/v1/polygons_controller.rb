class Api::V1::PolygonsController < Api::ApplicationController
  before_action :find_polygon, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def create
    ## factory = RGeo::Cartesian.preferred_factory srid: 4326
    full_params = polygon_params
    if RGeo::GeoJSON.decode(params[:geom]).is_a?(String)
      full_params[:geom] = RGeo::GeoJSON.decode(params[:geom])
    else 
      full_params[:geom] = RGeo::GeoJSON.decode(params[:geom]).as_text
    end
    p full_params[:geom]
    polygon = Polygon.new full_params
    polygon.field = Field.find params[:field_id]
    polygon.user = current_user
    if polygon.save
      render json: {id: polygon.id}
    else
      render(
        json: {errors: polygon.errors.messages},
        status: 422
      )
    end
  end

  def show
    if can? :read, @polygon
      render json: @polygon
    else
      render json: {errors: "You are not authorized to view this polygon"}, status: 401
    end
  end

  def index
    p params
    if params[:user_id]
      user = User.find params[:user_id]
      polygons = user.polygons
    else
      field = Field.find params[:field_id]
      polygons = field.polygons
    end
    render json: polygons
  end

  def update
    unless can? :update, @polygon
      render json: {errors: "You are not authorized to update this polygon"}, status: 401
    else
      if @polygon.update polygon_params
        render json: @polygon
      else
        render(
          json: {errors: @polygon.errors.messages},
          status: 422
        )
      end
    end
  end

  def destroy
    unless can? :destroy, @polygon
      render json: {errors: "You are not authorized to delete this polygon"}, status: 401
    else
      if @polygon.destroy
        render json: {message: "polygon deleted", id: @polygon.id}
      else
        render(
          json: {errors: @polygon.errors.messages},
          status: 422
        )
      end
    end
  end


  private
  def find_polygon
    @polygon = Polygon.find params[:id]
  end

  def polygon_params
    params.require(:polygon).permit(:classification, :commentary, :area)
  end
end
