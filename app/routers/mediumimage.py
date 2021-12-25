import os
from fastapi import Request, Form, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from ..library.search import unsplashFetch

templates = Jinja2Templates(directory="templates")
router = APIRouter()


@router.get("/medium-unsplash-image", response_class=HTMLResponse)
async def get_index(request: Request,):
    title = "Medium Unsplash Image"
    data = {
        "request": request,
        "title": title,
    }

    return templates.TemplateResponse("medium_image.html", data)


@router.get("/medium-unsplash-image/photos/{tag}/{page_num}")
async def photos(request: Request, tag: str, page_num: int):
    # tag = tag
    img_urls = unsplashFetch(tag, page_num)['results']
    return(img_urls)
