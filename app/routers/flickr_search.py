# import requests
from fastapi import Request, Form, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
# from io import BytesIO
# from PIL import Image
# import urllib.parse as urlparse
from .. library.search import flickr_photos_search
# from ..config import settings

templates = Jinja2Templates(directory="templates")
router = APIRouter()


@router.get("/flickr-search", response_class=HTMLResponse)
async def get_flickr(request: Request):

    data = {
        "request": request,
        "title": "Flickr Search",
        # "description": "Flickr search demo",
        # "meta_title": "Flickr search demo",
    }

    return templates.TemplateResponse("flickr.html", data)


# @router.post("/ideas_from_flickr", response_class=HTMLResponse)
# async def post_flickr(request: Request, tag: str = Form(...)):
#     # print("clicked")
#     # image_tag = tag
#     # results = flickrimg(5, image_tag)
#     results = flickr_photos_search(per_page=400, image_tag=tag)
#     data = {
#         "request": request,
#         "results": results,
#         "tag": tag,
#         "title": title,
#         "description": settings.flickr_description,
#         "meta_title": settings.flickr_meta_title,
#     }
#     return templates.TemplateResponse("flickr.html", data)

@router.get("/flickr_photos/{tag}/{page_num}")
async def photos(request: Request, tag: str, page_num: int):

    data = flickr_photos_search(tag, page_num)
    # data = unsplashFetch(tag, page_num)
    return(data)
