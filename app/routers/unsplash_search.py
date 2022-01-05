from fastapi import Request, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from ..library.search import unsplashFetch

templates = Jinja2Templates(directory="templates")
router = APIRouter()


@router.get("/unsplash-search", response_class=HTMLResponse)
async def get_index(request: Request,):
    title = "Unsplash Image Search"
    data = {
        "request": request,
        "title": title,
    }

    return templates.TemplateResponse("unsplash_search.html", data)


@router.get("/unsplash-search/photos/{tag}/{page_num}")
async def photos(request: Request, tag: str, page_num: int):
    # tag = tag
    data = unsplashFetch(tag, page_num)
    return(data)
