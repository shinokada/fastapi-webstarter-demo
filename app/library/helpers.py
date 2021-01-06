import os.path
import uuid
from pathlib import Path
from PIL import Image
import markdown
from ..config import settings


def openfile(filename):
    filepath = os.path.join("app/pages/", filename)
    with open(filepath, "r", encoding="utf-8") as input_file:
        text = input_file.read()

    html = markdown.markdown(text)
    data = {
        "text": html
    }
    return data


def setdimensions(winWidth, imgWidth, imgHeight):
    ratio = winWidth / imgWidth
    new_imgWidth = int(imgWidth * ratio * 0.8)
    max_imgWidth = settings.max_imgWidth
    max_imgHeight = settings.max_imgHeight
    if (new_imgWidth > max_imgWidth):
        new_imgWidth = max_imgWidth

    return (new_imgWidth, max_imgHeight)


def create_workspace():
    """
    Return workspace path
    """
    # base directory
    work_dir = Path(settings.work_dir)
    # UUID to prevent file overwrite
    request_id = Path(str(uuid.uuid4())[:8])
    # path concat instead of work_dir + '/' + request_id
    workspace = work_dir / request_id
    if not os.path.exists(workspace):
        # recursively create workdir/unique_id
        os.makedirs(workspace)

    return workspace


def thumb(myfile, winWidth, imgWidth, imgHeight):
    size = setdimensions(winWidth, imgWidth, imgHeight)
    # size = settings.thumb_width, settings.thumb_height
    filepath, ext = os.path.splitext(myfile)
    # print(ext)
    im = Image.open(myfile)
    im = image_transpose_exif(im)
    im.thumbnail(size)
    imgtype = "PNG" if ext == ".png" else "JPEG"
    # print(imgtype)
    im.save(filepath + ".thumbnail"+ext, imgtype)


def image_transpose_exif(im):
    """
    https://stackoverflow.com/questions/4228530/pil-thumbnail-is-rotating-my-image
    Apply Image.transpose to ensure 0th row of pixels is at the visual
    top of the image, and 0th column is the visual left-hand side.
    Return the original image if unable to determine the orientation.

    As per CIPA DC-008-2012, the orientation field contains an integer,
    1 through 8. Other values are reserved.

    Parameters
    ----------
    im: PIL.Image
       The image to be rotated.
    """

    exif_orientation_tag = 0x0112
    exif_transpose_sequences = [   # Val 0th row  0th col
        [],  # 0 (reserved)
        [],  # 1 top left
        [Image.FLIP_LEFT_RIGHT],  # 2 top right
        [Image.ROTATE_180],  # 3 bottom right
        [Image.FLIP_TOP_BOTTOM],  # 4 bottom left
        [Image.FLIP_LEFT_RIGHT, Image.ROTATE_90],  # 5 left top
        [Image.ROTATE_270],  # 6 right top
        [Image.FLIP_TOP_BOTTOM, Image.ROTATE_90],  # 7 right bottom
        [Image.ROTATE_90],  # 8 left bottom
    ]

    try:
        seq = exif_transpose_sequences[im._getexif()[exif_orientation_tag]]
    except Exception:
        return im
    else:
        return functools.reduce(type(im).transpose, seq, im)
