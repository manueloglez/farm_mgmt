RGeo::ActiveRecord::SpatialFactoryStore.instance.tap do |config|   
  config.default = RGeo::Geographic.spherical_factory(srid: 4326) 
  config.register(RGeo::Cartesian.preferred_factory_generator srid: 4326)
  p config
end 