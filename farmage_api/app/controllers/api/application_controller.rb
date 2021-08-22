class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token
  rescue_from StandardError, with: :standard_error
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def not_found
    render(
      json: {
        errors: [{type: "Not Found"}]
      },
      status: :not_found # alias for 404
    )
  end

  def authenticate_user!
    render(
        json: {errors: "you are not logged in"},
        status: 422
    ) unless user_signed_in?
  end

  def record_not_found(error)
    render(
        status: 404,
        json: {
            status: 404,
            errors: [{
                type: error.class.to_s,
                message: error.message
            }]
        }
    )
  end
  def standard_error(error)
    # When we rescue an error, we prevent our program from doing
    # what it would normally do in a crash
    logger.error error.full_message

    render(
        status: 500,
        json: {
            status: 500,
            errors:[{
                type: error.class.to_s,
                message: error.message
            }]
        }
    )
  end
  def record_invalid(error)
    invalid_record = error.record 
    errors = invalid_record.errors.map do |field, message|
        {
            type: error.class.to_s,
            record_type: invalid_record.class.to_s,
            field: field,
            message: message
        }
    end
    render(
        json: {status: 422, errors: errors},
        status: 422
    )
  end

end
