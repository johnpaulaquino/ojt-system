from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.src.database.models.user_model import CreateUser, Users
from backend.app.src.database.uow import SQLUnitOfWork
from backend.app.src.domain.dto.users_dto import UsersDTO
from backend.app.src.domain.interface.aql_crud_interface import SQLCrudInterface


class UserRepository(SQLCrudInterface):

    def __init__(self, db: AsyncSession):
        self.__db = db


    async def insert_record(self, record: CreateUser):
        try:
            user = Users(**record.model_dump(exclude_none=True, exclude_unset=True) )
            self.__db.add(user)
        except Exception as e:
            print(str(e))
            raise e

    async def find_record(self, record_id: str) -> UsersDTO:
        try:
            stmt = select(Users).where(Users.user_id == record_id)
            result = await self.__db.execute(stmt)
            return UsersDTO.model_validate(result.scalar()) if result else result

        except Exception as e:
            print(str(e))
            raise e

    async def update_record(self, record_id: str, data: dict | None = None):
        try:
            stmt = update(Users).values(**data).where(Users.user_id == record_id)
            await self.__db.execute(stmt)
        except Exception as e:
            print(str(e))
            raise e

    async def delete_record(self, record_id: str):
        try:
            stmt = delete(Users).where(Users.user_id == record_id)
            await self.__db.execute(stmt)
        except Exception as e:
            print(str(e))
            raise e