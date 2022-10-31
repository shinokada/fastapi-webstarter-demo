# Fastapi Web Starter

Please read the Medium article at [https://shinichiokada.medium.com/](https://shinichiokada.medium.com/).

[Please sign up for more free resources.](https://mailchi.mp/ae9891ba897a/codewithshin)

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

[Demo](https://fastapi-webstarter-demo.deta.dev/)

## Requirement

- Python 3.9.6
- See requirements.txt.

## Installation & Usage

Get your Unsplash API and put it in the `.env` file.

```bash
$ git clone git@github.com:shinokada/fastapi-webstarter-demo.git
# change the directory
$ cd fastapi-webstarter-demo
# install packages
$ pip install -r requirements.txt
# start the server
$ uvicorn app.main:app --reload --port 8000
```

Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

![Starting](./images/image-1.png)

## Features

- Flickr image search
- Unsplash image search
- Drag & Drop Form
- Menu
- Unsplash
- Accordion
- Markdown pages
- Two Forms

## Test

All tests are under `tests` directory.

```bash
# Change the directory
$ cd fastapi-webstarter-demo
# Run tests
$ pytest -v
```

## Author

[twitter](https://twitter.com/shinokada)

## Licence

【MIT License】

Copyright 2021 Shinichi Okada

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
