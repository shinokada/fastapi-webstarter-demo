import os
import requests
import flickrapi


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


def flickr_photos_search(item, page_num):
    api_key = os.getenv("flickr_key").encode()
    api_secret = os.getenv("flickr_secret").encode()
    flickr = flickrapi.FlickrAPI(api_key, api_secret, format='parsed-json')
    # url_sq (75x75), url_q(150x150), url_t(w:100), url_s(w:240), url_m(w:500), url_n(w:320), url_z(w:640), url_c(w:800), url_l(w:1024), url_o(w:2400)
    extras = 'url_c,url_w,url_n,url_m,url_z,license,owner_name,'
    license = '1,2,3,4,5,6'

    photos = flickr.photos.search(
        text=item,
        sort='relevance',
        safe_search=1,
        per_page=30,
        license=license,
        page=page_num,
        tag_mode='all',
        extras=extras
    )
    photo_items = photos["photos"]["photo"]
    print(len(photo_items))
    # selected_photos = random.sample(list(photo_items), select)
    flickr_licenses: dict = {
        1: "by-nc-sa",
        2: "by-nc",
        3: "by-nc-nd",
        4: "by",
        5: "by-sa",
        6: "by-nd",
    }
    for item in photo_items:
        num = int(item["license"])
        # print(type(item))
        item["license_name"] = flickr_licenses[num]

    return photo_items
