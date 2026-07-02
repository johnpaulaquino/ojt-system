from app.src.database.models.user_model import CreateUser
from app.src.database.uow import SQLUnitOfWork
from app.src.exceptions.domain_exceptions import DomainDuplicateDataError
from app.src.schema import SuccessfulResponseSchema


class AuthServices:

    def __init__(self, uow : SQLUnitOfWork):
        self.__uow = uow

    async def insert_user(self, new_record: CreateUser):
        try:
            # validate the user role.

            # check if the student exists.
            data = await self.__uow.users.find_record(new_record.student_id)
            if data:
                raise DomainDuplicateDataError("This student is already exists.")

            # then check if the user is already exists
            if data.email == new_record.email:
                raise DomainDuplicateDataError("This email is already exists. Please choose another one")

            # otherwise insert record
            await self.__uow.users.insert_record(new_record)

            return SuccessfulResponseSchema(message="Successfully created user.")
        except Exception as e:
            print(str(e))
            raise e


    async def authenticate_user(self, user_email : str, user_password: str):
        try:
            pass
        except Exception as e:
            raise e