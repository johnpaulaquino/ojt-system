from sqlalchemy.ext.asyncio import AsyncSession

from app.src.database.repositories.user_repository import UserRepository


class SQLUnitOfWork:
    def __init__(self, _db: AsyncSession):
        self.__db = _db
        self.users = UserRepository(_db)

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if exc_val:
            await self.__db.rollback()
        else:
            await self.__db.commit()
        await self.__db.close()

