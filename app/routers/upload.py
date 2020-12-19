from fastapi import FastAPI, Request, Form, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="templates/")


@router.get("/upload", response_class=HTMLResponse)
def get_accordion(request: Request):
    result = "Type a number"
    return templates.TemplateResponse('upload.html', context={'request': request, 'result': result})
