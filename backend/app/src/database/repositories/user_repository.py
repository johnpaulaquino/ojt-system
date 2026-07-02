from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.src.database.models.user_information import UserInformation
from app.src.domain.dto.users_dto import FullUserInformationDTO
from app.src.database.models.user_model import CreateUser, Users
from app.src.domain.dto.users_dto import UsersDTO
from app.src.domain.interface.aql_crud_interface import SQLCrudInterface


class UserRepository(SQLCrudInterface):

    def __init__(self, db: AsyncSession):
        self.__db = db


    async def insert_record(self, record: CreateUser):
        try:
            user = Users(**record.model_dump(exclude_none=True, exclude_unset=True))
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

    async def find_all_records(self):
        try:
            stmt = select(Users, UserInformation)
            result = await self.__db.execute(stmt)
            return result.scalars().fetchall()
        except Exception as e:
            print(str(e))
            raise e
    async def find_record_using_student_id(self, student_id : str):
        try:
            stmt = select(Users).where(Users.student_id == student_id)
            result = await self.__db.execute(stmt)
            return UsersDTO.model_validate(result.scalar()) if result else result
        except Exception as e:
            print(str(e))
            raise e


    async def find_user_full_information(self, user_id : str):
        try:
            stmt = select(Users.user_id,
                          Users.user_status,
                          Users.user_status,
                          Users.user_role,
                          Users.student_id,
                          Users.email,
                          Users.created_at,
                          Users.updated_at,
                          UserInformation.program,
                          UserInformation.academic_year,
                          UserInformation.contact_no,
                          UserInformation.fullname,
                          UserInformation.institution,
                          UserInformation.profile_img,
                          UserInformation.program_type,
                          UserInformation.total_hours).join(
                UserInformation, Users.user_id == UserInformation.user_id_ufk).where(
                Users.user_id == user_id)
            result = await self.__db.execute(stmt)
            data = result.scalars().fetchall()
            return FullUserInformationDTO(**result.mappings().fetchone()) if data else data

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


    async def update_user_info(self,  user_id: str, data: dict | None = None):
        """
        :param user_id: This is id of the user.
        """

        try:
            stmt = update(UserInformation).values(**data).where(UserInformation.user_id_ufk == user_id)
            await self.__db.execute(stmt)
        except Exception as e:
            print(str(e))
            raise e
