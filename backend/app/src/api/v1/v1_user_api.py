from fastapi import APIRouter, Depends
from starlette import status

from app.src.core.dependencies import get_user_services
from app.src.database.models.user_model import CreateUser, UserRole
from app.src.services.user_services import UserServices
from app.src.utils import SuccessfulResponse

v1_user_route = APIRouter(prefix='/v1/api/user')


@v1_user_route.post('',tags=[UserRole.ADMIN])
async def create_user(new_record : CreateUser,
                      user_services :UserServices = Depends(get_user_services)):
    try:
        user_response = await user_services.insert_user(new_record)


        user_response.status_code = status.HTTP_201_CREATED

        return SuccessfulResponse(user_response)
    except Exception as e:
        print(str(e))
        raise e

@v1_user_route.get('',tags=[UserRole.USER])
async def get_all_user(user_services : UserServices = Depends(get_user_services)):
    try:
        user_response = await user_services.test()

        user_response.status_code= status.HTTP_200_OK

        return SuccessfulResponse(user_response)
    except Exception as e:
        print(str(e))
        raise e

@v1_user_route.get('/{user_id}',tags=[UserRole.ADMIN])
async def get_user_information(user_id : str,
                               user_services :UserServices = Depends(get_user_services),
                               ):
    try:
        user_response = await user_services.test()
        user_response.status_code = status.HTTP_200_OK
        return SuccessfulResponse(user_response)
    except Exception as e:
        print(str(e))
        raise e

