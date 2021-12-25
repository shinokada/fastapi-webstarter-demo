import os
import requests


def unsplashFetch(item, page_num):
    unsplash_key = os.getenv("unsplash_key")
    param = {
        "client_id": unsplash_key,
        "query": item,
        "per_page": 30,
        "page": page_num
    }
    url = "https://api.unsplash.com/search/photos/"
    response = requests.get(url, param)
    data = response.json()
    return data
