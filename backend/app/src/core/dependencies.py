from typing import Annotated, Any, AsyncGenerator, Optional
from app.src.database.db import LocalSession
from app.src.database.uow import SQLUnitOfWork
async def get_uow() -> AsyncGenerator[SQLUnitOfWork, Any]:
    async with LocalSession() as session:
        async with SQLUnitOfWork(session) as uow:
            yield uow
