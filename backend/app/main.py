
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
