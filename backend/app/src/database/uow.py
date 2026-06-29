from sqlalchemy.ext.asyncio import AsyncSession
class SQLUnitOfWork:
    def __init__(self, _db: AsyncSession):
        self._db = _db

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if exc_val:
            await self._db.rollback()
        else:
            await self._db.commit()
        await self._db.close()

