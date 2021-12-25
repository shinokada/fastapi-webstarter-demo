from fastapi import Request, Form, APIRouter, File, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from ..library.helpers import *

router = APIRouter()
templates = Jinja2Templates(directory="templates/")


@router.get("/upload", response_class=HTMLResponse)
def get_upload(request: Request):
    return templates.TemplateResponse('upload.html', context={'request': request})


@router.post("/upload/new/")
async def post_upload(imgdata: tuple, file: UploadFile = File(...)):
    print(imgdata)
    data_dict = eval(imgdata[0])
    winWidth, imgWidth, imgHeight = data_dict["winWidth"], data_dict["imgWidth"], data_dict["imgHeight"]

    # create the directory path
    workspace = create_workspace()
    # filename
    file_name = Path(file.filename)
    print(file.filename)
    print(type(file.filename))
    print(file_name)
    print(type(file_name))
    # image full path
    img_full_path = workspace / file_name
    with open(str(img_full_path), 'wb') as myfile:
        contents = await file.read()
        myfile.write(contents)
    # create a thumb image and save it
    thumb(img_full_path, winWidth, imgWidth, imgHeight)
    # create the thumb path
    # ext is like .png or .jpg
    filepath, ext = os.path.splitext(img_full_path)
    thumb_path = filepath + ".thumbnail"+ext

    data = {
        "img_path": img_full_path,
        "thumb_path": thumb_path
    }
    return data
