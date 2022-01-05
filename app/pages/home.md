<h1>Welcome to FastAPI Starter Demo</h1>

<p>
This project uses <a href="https://fastapi.tiangolo.com/">FastAPI</a>, <a href="https://jinja.palletsprojects.com/en/2.11.x/">Jinja2</a>, and <a href="https://getbootstrap.com/docs/4.1/getting-started/introduction/">Bootstrap4</a> and 5 in Medium Unsplash Image page.

A simple website ready to deploy.
This repo includes all the file and it is ready to deploy to Heroku.
</p>


Please read the Medium article at [https://shinichiokada.medium.com/](https://shinichiokada.medium.com/).

[Please sign up for more free resources.](https://mailchi.mp/ae9891ba897a/codewithshin)

## Links

- [Demo](https://fastapi-webstarter-demo.herokuapp.com/)
- [Building a Website Starter with FastAPI](https://levelup.gitconnected.com/building-a-website-starter-with-fastapi-92d077092864)
- [Link: How to Deploy a FastAPI App on Heroku for Free](https://towardsdatascience.com/how-to-deploy-your-fastapi-app-on-heroku-for-free-8d4271a4ab9)
- [How to Build a Drag & Drop Form with FastAPI & JavaScript](https://towardsdatascience.com/how-to-build-a-drag-drop-form-with-python-javascript-f5e43433b005)

## Updated

2022-1-5

## Version

0.4.0

## Python environment

3.9.6

## Overview

A simple website ready to deploy.
This repo includes all the file and it is ready to deploy to Heroku.

- .env
- .gitignore
- app
- Procfile
- README.md
- requirements.txt
- runtime.txt
- static
- templates

## Requirements

- requests==2.26.0
- fastapi==0.70.0
- uvicorn==0.15.0
- python-dotenv==0.19.1
- aiofiles==0.7.0
- python-multipart==0.0.5
- jinja2==3.0.2
- Markdown==3.3.4
- pytest==6.2.5
- Pillow==8.4.0

## Installation & Usage

Get your Unsplash API and put it in the `.env` file.

<pre><code>
$ git clone git@github.com:shinokada/fastapi-web-starter.git
# change the directory
$ cd fastapi-web-starter
# install packages
$ pip install -r requirements.txt
# start the server
$ uvicorn app.main:app --reload --port 8000
</code></pre>

Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

<img src="/static/images/image-1.png"/>

## Features

- Medium-like Unsplash image insert
- Drag & Drop Form
- Menu
- Unsplash
- Accordion
- Markdown pages
- Two Forms

## Test

All tests are under `tests` directory.

<pre><code>
# Change the directory
$ cd fastapi-web-starter
# Run tests
$ pytest -v
</code></pre>

## Author

[twitter](https://twitter.com/shinokada)

## Licence

【MIT License】

Copyright 2021 Shinichi Okada

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
