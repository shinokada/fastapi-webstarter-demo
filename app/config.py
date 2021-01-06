from pydantic import BaseSettings


class Settings(BaseSettings):
    work_dir: str = 'static/upload/'
    thumb_width: int = 340
    thumb_height: int = 800
    thumb_size: tuple = (300, 500)
    max_imgWidth: int = 600
    max_imgHeight: int = 800


settings = Settings()
