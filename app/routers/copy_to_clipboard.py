from fastapi import Request, Form, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")
router = APIRouter()


@router.get("/copy-to-clipboard", response_class=HTMLResponse)
async def get_flickr(request: Request):

    data = {
        "request": request,
        "title": "Copy to clipboard"
    }

    return templates.TemplateResponse("copy_to_clipboard.html", data)
