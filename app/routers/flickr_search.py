from fastapi import Request, Form, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from .. library.search import flickr_photos_search

templates = Jinja2Templates(directory="templates")
router = APIRouter()


@router.get("/flickr-search", response_class=HTMLResponse)
async def get_flickr(request: Request):

    data = {
        "request": request,
        "title": "Flickr Search"
    }

    return templates.TemplateResponse("flickr.html", data)


@router.get("/flickr_photos/{tag}/{page_num}")
async def photos(request: Request, tag: str, page_num: int):

    data = flickr_photos_search(tag, page_num)
    # data = unsplashFetch(tag, page_num)
    return(data)
