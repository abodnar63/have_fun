require 'test_helper'

class ILoveYouControllerTest < ActionController::TestCase
  test "should get love" do
    get :love
    assert_response :success
  end

end
