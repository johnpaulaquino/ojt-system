import os
from pathlib import Path



def build_absolute_path(folder_name):
    build_path = Path(folder_name).resolve()
    return build_path

#====== To create files including .env, .gignore, docker-compose.yaml, pyproject.toml, readme.md and requirements.txt===

# ==== also create a text on specfic file
# write file for gitignore
gitignore_to_write = '''/.venv
/.idea
/.vscode
*.env
# Ignore all __pycache__ directories
__pycache__/

# Ignore compiled Python files
*.pyc
*.pyo
*.pyd
'''
git_ignore_path = Path().parent.resolve() / '.gitignore'
if not os.path.exists(git_ignore_path):
    with open(git_ignore_path, 'w') as file:
        file.write(gitignore_to_write)
        print("Successfully created .gitignore.")

# for .env file
env_to_write = '''DB_USER=change me
DB_PASSWORD=change me
DB_HOST=change me
DB_PORT=change me
DB_NAME=change me

DB_PROD_USER=change me
DB_PROD_PASSWORD=change me
DB_PROD_HOST=change me
DB_PROD_PORT=0
DB_PROD_NAME=change me

ENVIRONMENT=Dev
SERVER_PORT=8989

#JWT
JWT_KEY=2e381a02-083f-4a82-aaa6-3902a76739a6f776d88c-9b0d-4e35-942a-65300f1b6162
JWT_ALGORITHM=HS256
JWT_EXPIRATION=7 #days

MAIL_USERNAME=change me
MAIL_PASSWORD=change me
MAIL_FROM=change me
MAIL_PORT=587 
MAIL_SERVER=smtp.gmail.com
MAIL_STARTTLS=True #False in prod
MAIL_SSL_TLS=False #True in Prod
MAIL_USE_CREDENTIALS=True
MAIL_VALIDATE_CERTS=True
'''
env_path = Path().resolve() / '.env'
if not os.path.exists(env_path):
    with open(env_path, 'w') as file:
        file.write(env_to_write)
        print("Successfully created .env.")
else:
    with open(env_path, 'w') as file:
        file.write(env_to_write)
        print("Successfully created .env.")

# for docker compose.yaml
docker_compose_path = Path().resolve() / 'docker-compose.yaml'
if not os.path.exists(docker_compose_path):
    with open(docker_compose_path, 'w') as file:
        file.write("")
        print("Successfully created docker-compose.yaml.")

# for readme.md
read_me_path = Path().resolve() / 'readme.md'
if not os.path.exists(read_me_path):
    with open(read_me_path, 'w') as file:
        file.write("")
        print("Successfully created readme.md.")

# for requirements.txt
requirements_to_write = '''fastapi[standard]
sqlmodel
asyncpg
pydantic-settings
python-dotenv
passlib[argon2]
python-jose[cryptography]
requests
msgpack
fernet
tenacity
python-json-logger
'''
requirements_path = Path().resolve() / 'requirements.txt'
if not os.path.exists(requirements_path):
    with open(requirements_path, 'w') as file:
        file.write(requirements_to_write)
        print("Successfully created requirements.txt.")

# for pyproject.toml
to_write_text_in_toml_if_not_exists = """
[project]
name = "no-title"
version = "0.1.0"
description = "No clear description yet"
requires-python = ">=3.13"
dependencies = [
    "fastapi[standard]",
    "sqlmodel",
    "alembic",
    "asyncpg",
    "sendgrid",
    "pydantic-settings",
    "python-dotenv",
    "passlib[argon2]",
    "python-jose[cryptography]",
    "requests",
    "msgpack",
    "redis",
    "cloudinary",
    "fastapi-mail",
    "cryptography", # Fernet is part of this package
    "tenacity",
    "python-json-logger",
]




[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[tool.pytest.ini_options]
testpaths = ["app/tests"]
asyncio_mode = "auto"
#This tells Pytest exactly where to look for your test files. When you type pytest in your terminal,
#it won't waste time searching your node_modules or logs; it goes straight to your app/tests folder.
##Since you are using FastAPI and asyncpg, your tests will be "asynchronous." Normally,
# Pytest doesn't understand async def functions. This setting tells Pytest to automatically
# handle those asynchronous tests without you having to add a @pytest.mark.asyncio decorator
#  to every single function.


[tool.setuptools.packages.find]
where = ["."]
include = ["app*"]  # Only include the app package
exclude = ["migration*", "tests*"] # Exclude migrations and tests


[tool.ruff]
line-length = 88
select = ["E", "F", "I"] # Linting and Import sorting
#Ruff is the "new king" of Python linting and formatting. It is written in Rust,
#making it 10–100x faster than older tools like Flake8 or Black.
#
#line-length = 88: This is the industry standard (made famous by the "Black"
#formatter). It ensures your code doesn't get too wide, which makes it easier to
#read on split screens.
#
#select = ["E", "F", "I"]: These are the "rules" Ruff will enforce:
#
#E (Error): Catches PEP 8 style violations (e.g., bad spacing).
#
#F (Pyflakes): Catches actual logic errors (e.g., a variable you defined but never used,
# or an undefined variable).
#
#I (Isort): This is a favorite for professional devs. It automatica

[project.scripts]
server = "app.main:start"
"""
to_write_text_in_toml_if_exists = '''[project]
dependencies = [
    "fastapi[standard]",
    "sqlmodel",
    "alembic",
    "asyncpg",
    "sendgrid",
    "pydantic-settings",
    "python-dotenv",
    "passlib[argon2]",
    "python-jose[cryptography]",
    "requests",
    "msgpack",
    "redis",
    "cloudinary",
    "fastapi-mail",
    "cryptography", # Fernet is part of this package
    "tenacity",
    "python-json-logger",
]


[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[tool.pytest.ini_options]
testpaths = ["app/tests"]
asyncio_mode = "auto"
#This tells Pytest exactly where to look for your test files. When you type pytest in your terminal,
#it won't waste time searching your node_modules or logs; it goes straight to your app/tests folder.
##Since you are using FastAPI and asyncpg, your tests will be "asynchronous." Normally,
# Pytest doesn't understand async def functions. This setting tells Pytest to automatically
# handle those asynchronous tests without you having to add a @pytest.mark.asyncio decorator
#  to every single function.


[tool.setuptools.packages.find]
where = ["."]
include = ["app*"]  # Only include the app package
exclude = ["migration*", "tests*"] # Exclude migrations and tests


[tool.ruff]
line-length = 88
select = ["E", "F", "I"] # Linting and Import sorting
#Ruff is the "new king" of Python linting and formatting. It is written in Rust,
#making it 10–100x faster than older tools like Flake8 or Black.
#
#line-length = 88: This is the industry standard (made famous by the "Black"
#formatter). It ensures your code doesn't get too wide, which makes it easier to
#read on split screens.
#
#select = ["E", "F", "I"]: These are the "rules" Ruff will enforce:
#
#E (Error): Catches PEP 8 style violations (e.g., bad spacing).
#
#F (Pyflakes): Catches actual logic errors (e.g., a variable you defined but never used,
# or an undefined variable).
#
#I (Isort): This is a favorite for professional devs. It automatica

[project.scripts]
server = "app.main:start"

'''
toml_path = Path().resolve() / 'pyproject.toml'
if not os.path.exists(toml_path):
    with open(toml_path, 'w') as file:
        file.write(to_write_text_in_toml_if_not_exists)
        print(f"Successfully created {toml_path}.")

else:
    with open(toml_path, '+a') as file:
        file.write(to_write_text_in_toml_if_exists)
        print(f"Successfully appended data to {toml_path}.")

#==== Create the app folder including its sub folder and for all folders create a __init__.py===

APP_FOLDER = 'app'
SRC_FOLDER = 'app/src'
DB_FOLDER = 'app/src/database'
MODELS_FOLDER = 'app/src/database/models'
REPOSITORIES_FOLDER = 'app/src/database/repositories'
INFRASTRUCTURE_FOLDER = 'app/src/infrastructure'
API_FOLDER = 'app/src/api'
API_V1_FOLDER = 'app/src/api/v1'
DOMAIN_FOLDER = 'app/src/domain'
DOMAIN_DTO_FOLDER = 'app/src/domain/dto'
DOMAIN_INTERFACE_FOLDER = 'app/src/domain/interface'
MIDDLEWARE_FOLDER = 'app/src/middlewares'
EXCEPTIONS_FOLDER = 'app/src/exceptions'
SCHEMA_FOLDER = 'app/src/schema'
UTILS_FOLDER = 'app/src/utils'
SERVICES_FOLDER = 'app/src/services'
CORES_FOLDER = 'app/src/core'
LOGS_FOLDER = 'app/src/logs'
TEMPLATES_FOLDER = 'app/templates/'
STATIC_FOLDER = 'app/static/'
CONFIG_FOLDER = 'app/config'
TESTS_FOLDER = 'app/tests'



#cores path

folders = [APP_FOLDER,
           SRC_FOLDER,
           DB_FOLDER,
           MODELS_FOLDER,
           REPOSITORIES_FOLDER,
           INFRASTRUCTURE_FOLDER,
           API_FOLDER,
           API_V1_FOLDER,
           DOMAIN_FOLDER,
           DOMAIN_DTO_FOLDER,
           DOMAIN_INTERFACE_FOLDER,
           MIDDLEWARE_FOLDER,
           EXCEPTIONS_FOLDER,
           SCHEMA_FOLDER,
           UTILS_FOLDER,
           SERVICES_FOLDER,
           CORES_FOLDER,
           LOGS_FOLDER,
           TEMPLATES_FOLDER,
           STATIC_FOLDER,
           CONFIG_FOLDER,
           TESTS_FOLDER
           ]
database_init_path = "app/src/database/__init__.py"
app_main_file_path = 'app/main'
security_file_path ='app/src/core/security'
dependencies_file_path = 'app/src/core/dependencies'
constants_file_path =  'app/src/core/constants'
interface_crud_file_path = 'app/src/domain/interface/aql_crud_interface'

# for folders
files = [app_main_file_path,
         security_file_path ,
         dependencies_file_path,
         constants_file_path,interface_crud_file_path]

init_file = '__init__.py'

# loop through the list to get the folders
for folder in folders:
    path = Path(folder).resolve()
    if not os.path.exists(folder):
        Path.mkdir(path, exist_ok=True)
        print(f"Successfully created folder {folder}.")
    # to add __init__ file
    init_filepath = path / init_file
    if not Path.exists(init_filepath):
        with open(init_filepath, 'w') as file:
            file.write("")
            print(f"Successfully created {init_file} on folder {folder}.")

# create files
for file in files:
    path = Path(file + ".py").resolve()
    if not os.path.exists(path):
        with open(path, 'w') as filepath:
            filepath.write("")
            print(f'Successfully created {file} file.')



#insert tenacity for retry if encounter error and write it into services __init__.py
to_wrote_in_services_init="""import asyncpg
from sqlalchemy.exc import DBAPIError, OperationalError
from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_fixed

TransientErrors = (OperationalError, DBAPIError, asyncpg.PostgresError)
retry_on_transient = retry(retry=retry_if_exception_type(TransientErrors),
                           stop=stop_after_attempt(5),
                           wait=wait_fixed(1),
                           reraise=True, )

"""
services_init_filepath =  build_absolute_path(SERVICES_FOLDER) / init_file
if not Path.exists(services_init_filepath):
    with open(services_init_filepath, 'w') as file:
        file.write(to_wrote_in_services_init)
        print(f"Successfully write file on {services_init_filepath}")
else:
    with open(services_init_filepath, 'w') as file:
        file.write(to_wrote_in_services_init)
        print(f"Successfully write file on {services_init_filepath}")

#====== to insert a text to those selected files=====
# write data for main.py file
data_to_write_in_main = '''
import sys
from fastapi import FastAPI
import uvicorn

app = FastAPI()

def start():
    """Entry point for the 'server' command in pyproject.toml"""
    use_loop = "uvloop" if sys.platform != "win32" else "auto"  # to avoid conflict in windows.
    uvicorn.run(
            "app.main:app",
            host="0.0.0.0",
            port=8000,
            workers=4,
            reload=True,
            loop=use_loop,  # use uv loop for faster
            proxy_headers=True,
            forwarded_allow_ips="*", )


if __name__ == "__main__":
    # start the server
    start()
'''

if not os.path.exists(Path("app/main.py").resolve()):
    with open(Path("app/main.py").resolve(), 'w') as file:
        file.write(data_to_write_in_main)
        print("Successfully write file in main.py")
else:
    with open(Path("app/main.py").resolve(), 'w') as file:
        file.write(data_to_write_in_main)
        print("Successfully write file in main.py")


#to insert into constant file
data_to_insert_in_constants ='''import os
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel, EmailStr, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()

class Constants(BaseSettings):

    # this is for jwt configuration
    JWT_KEY: str
    JWT_ALGORITHM: str
    JWT_EXPIRATION: int
    
    ENVIRONMENT: str
    # this is for database
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_HOST: str
    DB_PORT: int

    SERVER_PORT: int
    
    # Cloudinary config
    C_NAME: str
    C_KEY: str
    C_SECRET: str
    C_SECURE: bool

    #production_env
    DB_PROD_USER :str
    DB_PROD_HOST : str
    DB_PROD_NAME : str
    DB_PROD_PORT : int
    DB_PROD_PASSWORD : str

    TEMPLATE_PATH: Path = Path(__file__).resolve().parent

    FILE_SIZE_LIMIT: int = 1024 * 1024 * 10  # it is exactly 10 mb

    STATIC_PATH: str = os.path.abspath(os.path.join(os.curdir, 'static'))

     # For sending email in localhost
    MAIL_USERNAME: str
    MAIL_PASSWORD: SecretStr
    MAIL_FROM: str | EmailStr
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_STARTTLS: bool
    MAIL_SSL_TLS: bool
    MAIL_USE_CREDENTIALS: bool
    MAIL_VALIDATE_CERTS: bool


class EnvironmentStatus(str):
    DEVELOPMENT ="Dev"
    PRODUCTION  = "Production"
    TESTING = "Testing"


ConstantsData = Constants()
'''

constants_path = Path(constants_file_path+ ".py").resolve()

if not os.path.exists(constants_path):
    with open(constants_path, 'w') as file:
        file.write(data_to_insert_in_constants)
        print(f"Successfully write file in {constants_path}")
else:
    with open(constants_path, 'w') as file:
        file.write(data_to_insert_in_constants)
        print(f"Successfully write file in {constants_path}")


#to write in database __init__.py

to_write_in_init_db = '''
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.ext.asyncio.session import AsyncSession

from app.src.core.constants import ConstantsData,EnvironmentStatus


# this is for database
POSTGRES_DB_URL = f"postgresql+asyncpg://{ConstantsData.DB_USER}:{ConstantsData.DB_PASSWORD}@{ConstantsData.DB_HOST}:{ConstantsData.DB_PORT}/{ConstantsData.DB_NAME}"
# This line sets up loggers basically.
if ConstantsData.ENVIRONMENT == EnvironmentStatus.PRODUCTION:
    POSTGRES_DB_URL=f"postgresql+asyncpg://{ConstantsData.DB_PROD_USER}:{ConstantsData.DB_PROD_PASSWORD}@{ConstantsData.DB_PROD_HOST}:{ConstantsData.DB_PROD_PORT}/{ConstantsData.DB_PROD_NAME}"
engine = create_async_engine(url=POSTGRES_DB_URL,
                             connect_args={
                                 "statement_cache_size": 0,
                                 "prepared_statement_cache_size": 0,
                             }
                             )

LocalSession = async_sessionmaker(bind=engine,
                                  autoflush=False,
                                  expire_on_commit=False,
                                  class_=AsyncSession)

'''
if not os.path.exists(database_init_path):
    with open(database_init_path, 'w') as file:
        file.write(to_write_in_init_db)
        print(f"Successfully write file in {database_init_path}")
else:
    with open(database_init_path, 'w') as file:
        file.write(to_write_in_init_db)
        print(f"Successfully write file in {database_init_path}")

#to write in unit of work file
#write a file for Unit of Work to make it highly coupled in database
to_write_in_uow ='''from sqlalchemy.ext.asyncio import AsyncSession
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

'''

database_uow_path = "app/src/database/uow.py"

if not os.path.exists(database_uow_path):
    with open(database_uow_path, 'w') as file:
        file.write(to_write_in_uow)
        print(f"Successfully write file in {database_uow_path}")
else:
    with open(database_uow_path, 'w') as file:
        file.write(to_write_in_uow)
        print(f"Successfully write file in {database_uow_path}")
to_write_in_init_exception = '''from fastapi import Request
from starlette.responses import JSONResponse

from app.src.exceptions.exceptions_mapper import EXCEPTION_MAPPER
from app.src.exceptions.http_exceptions import BaseAppExceptions


def app_exception_handler(_: Request, exc: Exception):
    """
    This is the custom exception that will inject into app.
    :return: The exception
    """

    for exc_type, adapter in EXCEPTION_MAPPER.items():
        if isinstance(exc, exc_type):
            http_exc = adapter(exc)
            content = {"status_code": http_exc.status_code,
                       'status'     : http_exc.message_status,
                       'message'    : http_exc.message}
            return JSONResponse(status_code=http_exc.status_code,
                                content=content,
                                headers=http_exc.headers)
        if isinstance(exc, BaseAppExceptions):
            content = {"status_code": exc.status_code,
                       'status'     : exc.message_status,
                       'message'    : exc.message}
            return JSONResponse(status_code=exc.status_code,
                                content=content,
                                headers=exc.headers)

    return JSONResponse(status_code=500,
                        content={"status_code": 500,
                                 'status'     : "error",
                                 'message'    : "An unexpected error occurred."})
    '''


exceptions_init_path = Path('app/src/exceptions').resolve() / init_file

if not os.path.exists(exceptions_init_path):
    with open(exceptions_init_path, 'w') as file:
        file.write(to_write_in_init_exception)
        print(f"Successfully write file in {exceptions_init_path}")
else:
    with open(exceptions_init_path, 'w') as file:
        file.write(to_write_in_init_exception)
        print(f"Successfully write file in {exceptions_init_path}")

#write file on utility init.py
to_write_in_utility_init ="""from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse

from app.src.schema import SuccessfulResponseSchema


def SuccessfulResponse(success_schema: SuccessfulResponseSchema):
    message_content = {'status_code': success_schema.status_code,
                       "status_message": success_schema.status_message,
                       "message": success_schema.message}

    if success_schema.verification_token is not None:
        message_content.update({"verification_token": success_schema.verification_token})

    if success_schema.csrf_token is not None:
        message_content.update({"csrf_token": success_schema.csrf_token})

    if success_schema.paginated is not None:
        # to check if it's a paginated data
        message_content.update({"paginated": jsonable_encoder(success_schema.paginated)})

    if success_schema.refresh_token is not None:
        # to check if it's a paginated data
        message_content.update({"refresh_token": success_schema.refresh_token})
    if success_schema.data is not None:
        # to ch
        message_content.update({"data": jsonable_encoder(success_schema.data)})

    if success_schema.access_token is not None:
        message_content.update({"access_token": success_schema.access_token,
                                "access_type": 'Bearer'})

    if success_schema.action is not None:
        message_content.update({"action": success_schema.action})

    if success_schema.headers is not None:
        return JSONResponse(
            status_code=success_schema.status_code,
            content=message_content,
            headers=success_schema.headers)

    return JSONResponse(
        status_code=success_schema.status_code,
        content=message_content, )"""

utility_init_path = build_absolute_path(UTILS_FOLDER) / init_file
if not os.path.exists(utility_init_path):
    with open(utility_init_path, 'w') as file:
        file.write(to_write_in_utility_init)
        print(f"Successfully write file in {utility_init_path}")
else:
    with open(utility_init_path, 'w') as file:
        file.write(to_write_in_utility_init)
        print(f"Successfully write file in {utility_init_path}")

#write file on schema init.py
to_write_in_schema_init ="""from typing import Any

from pydantic import BaseModel, Field


class CloudinaryImageSchema(BaseModel):
    image_url : str
    public_key : str



class PaginatedOutput(BaseModel):
    start_page: int
    end_page: int
    total_records: int
    has_next: bool

class SuccessfulResponseSchema(BaseModel):
    message: str
    headers: dict = None
    status_code: int = None
    status_message: str = "ok"
    data: Any = None
    access_token: str = None
    refresh_token: str = None
    csrf_token: str | None = None
    action: str = None
    paginated: PaginatedOutput | None = None
    otp_code: str | None = None
    verification_token : str | None = None
    sign_up_steps: int | None = None
    email: str | None = None


class PaginatedSchema(BaseModel):
    skip: int = Field(ge=1, default=1)
    limit: int = Field(ge=10, default=10)"""

schema_init_path = build_absolute_path(SCHEMA_FOLDER) / init_file
if not os.path.exists(schema_init_path):
    with open(schema_init_path, 'w') as file:
        file.write(to_write_in_schema_init)
        print(f"Successfully write file in {schema_init_path}")
else:
    with open(schema_init_path, 'w') as file:
        file.write(to_write_in_schema_init)
        print(f"Successfully write file in {schema_init_path}")



# to write in domain exceptions
exceptions_domain_path = Path('app/src/exceptions').resolve() / 'domain_exceptions.py'
to_write_in_domain_exception = '''
class DomainError(Exception):
    """This is the base error for domain."""

    def __init__(self, message='Internal server error. Contact developer if the problem persists.'):
        super().__init__(message)
    '''
if not os.path.exists(exceptions_domain_path):
    with open(exceptions_domain_path, 'w') as file:
        file.write(to_write_in_domain_exception)
        print(f"Successfully write file in {exceptions_domain_path}")
else:
    with open(exceptions_domain_path, 'w') as file:
        file.write(to_write_in_domain_exception)
        print(f"Successfully write file in {exceptions_domain_path}")

# to write in exceptions mapper
exceptions_mapper_path = Path('app/src/exceptions').resolve() / 'exceptions_mapper.py'
to_write_in_mapper_exception = '''EXCEPTION_MAPPER = {
        "Replace with Domain Exception"           : "Replace with HTTP Exceptions lambda e: DataBaseDataNotFoundException('Entity not found', message=str(e))",

        }   
    '''
if not os.path.exists(exceptions_mapper_path):
    with open(exceptions_mapper_path, 'w') as file:
        file.write(to_write_in_mapper_exception)
        print(f"Successfully write file in {exceptions_mapper_path}")
else:
    with open(exceptions_mapper_path, 'w') as file:
        file.write(to_write_in_mapper_exception)
        print(f"Successfully write file in {exceptions_mapper_path}")

# to write in exceptions http
exceptions_http_path = Path('app/src/exceptions').resolve() / 'http_exceptions.py'
to_write_in_http_exception = '''from fastapi import status


class BaseAppExceptions(Exception):
    """This is the base exceptions. You can call this for 500 exceptions."""

    def __init__(self, message_status='error',
                 message='Internal server error. Contact developer if the problem persists.',
                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, headers=None):
        self.message_status = message_status
        self.headers = headers
        self.message = message
        self.status_code = status_code
        super().__init__(message_status, message, status_code, headers)


class DataBaseDataNotFoundException(BaseAppExceptions):
    def __init__(self, message_status='fail', message='The requested data was not found.',
                 status_code=status.HTTP_404_NOT_FOUND, headers=None):
        self.message_status = message_status
        self.headers = headers
        self.message = message
        self.status_code = status_code
        super().__init__(message_status, message, status_code, headers)


class JWTExpiredException(BaseAppExceptions):
    def __init__(self, message_status='fail', message='Your session has expired. Please log in again.',
                 status_code=status.HTTP_401_UNAUTHORIZED, headers=None):
        if headers is None:
            headers = {'WWW-Authenticate': 'Bearer'}
        self.message_status = message_status
        self.headers = headers
        self.message = message
        self.status_code = status_code
        super().__init__(message_status, message, status_code, headers)


class JWTInvalidException(BaseAppExceptions):
    def __init__(self, message_status='fail', message='Invalid token, please login again.',
                 status_code=status.HTTP_401_UNAUTHORIZED, headers=None):
        self.message_status = message_status
        self.headers = {'WWW-Authenticate': 'Bearer'}
        self.message = message
        self.status_code = status_code
        super().__init__(message_status, message, status_code, headers)


class DataForbiddenException(BaseAppExceptions):
    def __init__(self, message_status='fail',
                 message="Access forbidden. You don’t have permission to perform this action.",
                 status_code=status.HTTP_403_FORBIDDEN, headers=None):
        self.message_status = message_status
        self.message = message
        self.status_code = status_code
        super().__init__(message_status, message, status_code)


class UnAuthorizeAccessException(BaseAppExceptions):
    def __init__(self, message_status='fail', message="You are not authorized to access this resource. ",
                 status_code=status.HTTP_401_UNAUTHORIZED, headers=None):
        self.message_status = message_status
        self.headers = {'WWW-Authenticate': 'Bearer'}
        self.message = message
        self.status_code = status_code
        super().__init__(message_status, message, status_code, headers)


class DataBadRequestException(BaseAppExceptions):
    def __init__(self, message_status='fail', message="Bad request.",
                 status_code=status.HTTP_400_BAD_REQUEST, headers=None):
        self.message_status = message_status

        self.message = message
        self.status_code = status_code
        super().__init__(message_status, message, status_code)


class DataUnProcessableContent(BaseAppExceptions):
    def __init__(self, message_status='fail',
                 message="Signup verification failed. Please re-enter your email.",
                 status_code=status.HTTP_422_UNPROCESSABLE_CONTENT):
        self.message_status = message_status

        self.message = message
        self.status_code = status_code
        super().__init__(message_status, message, status_code)


class DataConflictError(BaseAppExceptions):
    def __init__(self, message_status='fail',
                 message="Conflict error. The data you are trying to create already exists.",
                 status_code=status.HTTP_409_CONFLICT):
        self.message_status = message_status
        self.message = message
        self.status_code = status_code
        super().__init__(message_status, message, status_code)
    '''
if not os.path.exists(exceptions_http_path):
    with open(exceptions_http_path, 'w') as file:
        file.write(to_write_in_http_exception)
        print(f"Successfully write file in {exceptions_http_path}")
else:
    with open(exceptions_http_path, 'w') as file:
        file.write(to_write_in_http_exception)
        print(f"Successfully write file in {exceptions_http_path}")


#to write in security file
to_write_in_security = '''import hashlib
import secrets
from datetime import datetime, timedelta, timezone

from jose import ExpiredSignatureError, jwt
from passlib.context import CryptContext

from app.src.core.constants import Constants
from app.src.exceptions.domain_exceptions import DomainJWTExpiredError, DomainJWTInvalidError

constants = Constants()


class AppSecurity:
    
    __context = CryptContext(schemes=["argon2"], deprecated="auto")
    
    @classmethod
    def hash_plain_password(cls, plain_password):
        
        # return the plain password if it's empty
        if not plain_password:
            return plain_password
        
        # then hash the password and remove the leading and trailing spaces
        return cls.__context.hash(plain_password.strip())
    
    @classmethod
    def verify_hash_password(cls, plain_password, hashed_password):
        """
        This function is the verify if the inputted password is match to the hashed password.
        :param plain_password: is a user input.
        :param hashed_password: the hashed password.
        :return: True,if matched, otherwise False.
        """
        # return false if the hashed password is empty.
        if not hashed_password:
            return False
        
        # return false if the plain password is empty.
        if not plain_password:
            return False
        
        # return True if matched, otherwise false
        return cls.__context.verify(plain_password, hashed_password)
    
    @classmethod
    def generate_access_token(cls, *, jti: str, data: dict, exp: int = 0):
        """

        This function is to generate an access token.
        :param jti: is the unique identifier of a token.
        :param data: is the data to encrypt in the token.
        :param exp: short for expiration. This is how long the token can use.
        :return: access token.

        """
        to_encode = data.copy()
        # 5 min is the default life of token if not specified the exp parameter.
        expiration = datetime.now(timezone.utc) + timedelta(minutes=5) if exp <= 0 else datetime.now(
                timezone.utc) + timedelta(seconds=exp)
        
        to_encode.update({"jti": jti, "exp": expiration})
        
        access_token = jwt.encode(to_encode, key=constants.JWT_KEY, algorithm=constants.JWT_ALGORITHM)
        return access_token
    
    @staticmethod
    def decode_jwt_token(token: str, verify_exp=True):

        try:
            if not token:
                raise DomainJWTInvalidError(message="Invalid token, cannot validate. Please back to login.")
            
            # decode the token
            payload = jwt.decode(token, key=constants.JWT_KEY, algorithms=[constants.JWT_ALGORITHM],
                                 options={'verify_exp': verify_exp})
            
            if not payload:
                # then raise an exception
                raise DomainJWTInvalidError("Couldn't validate token credentials. Please back to login.")
            # return the data
            return payload
        except ExpiredSignatureError:
            raise DomainJWTExpiredError("Your token is expired. Please back to login.")
        except Exception as e:
            raise e
   
    
    @staticmethod
    def hash_token(token: str):
        return hashlib.sha256(token.encode()).hexdigest()
'''

if not os.path.exists(security_file_path +'.py'):
    with open(security_file_path, 'w') as file:
        file.write(to_write_in_security)
        print(f"Successfully write file in {security_file_path +'.py'}")
else:
    with open(security_file_path +'.py', 'w') as file:
        file.write(to_write_in_security)
        print(f"Successfully write file in {security_file_path +'.py'}")

to_write_in_dependency = '''from typing import Annotated, Any, AsyncGenerator, Optional
from app.src.database.db import LocalSession
from app.src.database.uow import SQLUnitOfWork
async def get_uow() -> AsyncGenerator[SQLUnitOfWork, Any]:
    async with LocalSession() as session:
        async with SQLUnitOfWork(session) as uow:
            yield uow
'''
if not os.path.exists(dependencies_file_path+'.py'):
    with open(dependencies_file_path, 'w') as file:
        file.write(to_write_in_dependency)
        print(f"Successfully write file in {dependencies_file_path+'.py'}")
else:
    with open(dependencies_file_path+'.py', 'w') as file:
        file.write(to_write_in_dependency)
        print(f"Successfully write file in {dependencies_file_path+'.py'}")

to_write_in_interface = '''from typing import Protocol, TypeVar

T = TypeVar('T')


class SQLCrudInterface[T](Protocol):
    
    async def insert_record(self, record: T):
        pass
    
    async def find_record(self, record_id: str):
        pass
    
    async def update_record(self, record_id: str, data: dict | None = None):
        pass
    
    async def delete_record(self, record_id: str):
        pass
    
    async def soft_delete_record(self, record_id: str) -> None:
        pass

'''
if not os.path.exists(interface_crud_file_path+'.py'):
    with open(interface_crud_file_path, 'w') as file:
        file.write(to_write_in_interface)
        print(f"Successfully write file in {interface_crud_file_path+'.py'}")
else:
    with open(interface_crud_file_path+'.py', 'w') as file:
        file.write(to_write_in_interface)
        print(f"Successfully write file in {interface_crud_file_path+'.py'}")