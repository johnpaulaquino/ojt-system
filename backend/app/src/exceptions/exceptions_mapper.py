from app.src.exceptions.domain_exceptions import DomainDuplicateDataError
from app.src.exceptions.http_exceptions import DataConflictError

EXCEPTION_MAPPER = {
DomainDuplicateDataError : lambda e : DataConflictError(message=str(e))}
    