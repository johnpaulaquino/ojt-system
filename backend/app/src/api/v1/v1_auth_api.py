from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status

from app.src.api.v1 import V1_PREFIX
from app.src.core.dependencies import get_auth_services
from app.src.database.models.user_model import CreateUser, UserRole
from app.src.services.auth_services import AuthServices
from app.src.utils import SuccessfulResponse

v1_auth_route = APIRouter(prefix=f'/{V1_PREFIX}auth')


@v1_auth_route.post('/create-account', tags=[UserRole.ADMIN])
async def create_user(new_record : CreateUser,
                      user_services :AuthServices = Depends(get_auth_services)):
    try:
        user_response = await user_services.insert_user(new_record)


        user_response.status_code = status.HTTP_201_CREATED

        return SuccessfulResponse(user_response)
    except Exception as e:
        print(str(e))
        raise e

@v1_auth_route.post('/authenticate')
async def authenticate_user(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        pass
    except Exception as e:
        raise e

