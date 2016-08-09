[![Build Status](https://travis-ci.org/EduardoCopat/topFiveWorldNews.svg?branch=master)](https://travis-ci.org/EduardoCopat/topFiveWorldNews)

# Top 5 World news

List and summarizes top 5 world news from reddit

http://topfiveworldnews.herokuapp.com

# Installation

Install node.js (https://nodejs.org/en/download/), if not installed yet.

Create a reddit app script key at:

>https://www.reddit.com/login?dest=https%3A%2F%2Fwww.reddit.com%2Fprefs%2Fapps%2F

Rename the file

>config/reddit_api_developer_example.config

to:

>config/reddit_api_developer.config

Insert your reddit app configs into this file.

Run:

> npm install

Run tests with:

> npm test

Run app with:

> node app.js