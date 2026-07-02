from typing import Annotated, Any, AsyncGenerator, Optional

from fastapi import Depends

from app.src.database import LocalSession
from app.src.database.uow import SQLUnitOfWork
from app.src.services.user_services import UserServices


async def get_uow() -> AsyncGenerator[SQLUnitOfWork, Any]:
    async with LocalSession() as session:
        async with SQLUnitOfWork(session) as uow:
            yield uow

async def get_user_services(uow : SQLUnitOfWork = Depends(get_uow)) -> UserServices:
    return UserServices(uow)