import os
from fastapi import Request, APIRouter, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates


templates = Jinja2Templates(directory="templates")

router = APIRouter()


@router.get("/unsplash", response_class=HTMLResponse)
async def unsplash_home(request: Request):
    key = os.getenv("unsplash_key")
    print(key)
    return templates.TemplateResponse("unsplash.html", {"request": request})


@router.get("/unsplash_search", response_class=HTMLResponse)
async def get_unsplash_search(request: Request):
    tag = "flower"
    return templates.TemplateResponse("unsplash_search.html", {"request": request, "tag": tag})


@router.post("/unsplash_search", response_class=HTMLResponse)
async def post_unsplash_search(request: Request):
    tag = "flower"
    return templates.TemplateResponse("unsplash_search.html", {"request": request, "tag": tag})
