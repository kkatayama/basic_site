# coding: utf-8
# %load basic_site.py
from bottle import route, run, post, request, static_file
import requests
import json

top = """
<!DOCTYPE html>
<html>
<title>SMeter</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
<style>
body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif}
</style>
<body class="w3-light-grey">

<!-- w3-content defines a container for fixed size centered content, 
and is wrapped around the whole page content, except for the footer in this example -->
<div class="w3-content" style="max-width:1400px">

<!-- Header -->
<header class="w3-container w3-center w3-padding-32"> 
  <h1><b>SMeter</b></h1>
  <p>A true smart meter that is able to communicate with other devices on the grid to optimize power quality while also offering advanced diagnostics of the <span class="w3-tag">AC voltage</span></p>
  <a href='/'><button>Home/Logout</button></a><br />
</header>
"""
bottom = """
</body>
</html>
"""

accounts = {
    'SMeter 2': 'password2',
    'SMeter 3': 'password3',
    'SMeter 4': 'password4',
}
logged_in = {
    'username': '',
    'status': False
}

with open('api_key') as f:
    api_key = {'key': '{}'.format(f.read().strip())}


@route('/')
def getindex():
    login_form = """
    <form method="post" action="login">
        <div>
            <label for="username">UserName:</label>
            <input type="text" id="username" name="username">
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
        </div>
        <button type="submit">Login</button>
    </form>
    """    
    page = top + login_form + bottom
    return page

@post('/login')
def login():
    username = request.forms.get('username')
    password = request.forms.get('password')    
    
    try:
        if password == accounts[username]:
            logged_in['status'] = True
            logged_in['username'] = username
            welcome = """
            <h2>Welcome, <b>{}</b></h2>
            <br /><br />
            <p><button class="w3-button w3-padding-large w3-white w3-border" onclick="location.href='/feeds'">
                <b>SEE YOUR USAGE »</b>
            </button></p>
            """.format(username)
        else:
            welcome = """<h2>Incorrect Login</h2><br /><br /><button onClick="goBack()">Retry</button><script>function goBack(){window.history.back();}</script>"""
    except:
        welcome = """<h2>Incorrect Login</h2><br /><br /><button onClick="goBack()">Retry</button><script>function goBack() {window.history.back();}</script>"""
        
    page = top + welcome + bottom
    return page

@route('/feeds')
def getfeeds():
    feed_content = """"""
    top_feed = """"""
    bottom_feed = """"""
    group_url = "https://io.adafruit.com/api/v2/LukeZ1986/groups?x-aio-key={}".format(api_key['key'])
    r = requests.get(group_url)
    groups = json.loads(r.text)

    if logged_in['status'] == True:
        for group in groups:
            if group['name'] == logged_in['username']:
                group_key = group['key']
                feeds = group['feeds']

        top_feed = """
        <div class="w3-card w3-margin">
            <div class="w3-container w3-padding">
                <h4>Your Usage</h4>
            </div>
            <ul class="w3-ul w3-hoverable w3-white">
        """

        for feed in feeds:
            feed_id = feed['id']
            feed_key = feed['key']
            feed_date = feed['created_at']
            feed_content += """<a href="/data?groupkey={}&feedkey={}" >""".format(group_key, feed_key)
            feed_content += """
            <li class="w3-padding-16">
                <span class="w3-large">{}</span><br>
                <span>{}</span>
            </li>
            </a>""".format(feed_id, feed_date)

        bottom_feed = """
            </ul>
        </div>
        """
    else:
        feed_content += """
        <h2>Need to be logged in to see this resource</h2>
        """
    page = top + top_feed + feed_content + bottom_feed + bottom
    return page

@route('/data')
def getdata():
    feed_content = """"""
    top_feed = """"""
    bottom_feed = """"""

    if logged_in['status'] == True:
        groupkey = request.query.groupkey
        feedkey = request.query.feedkey
        
        feed_data_url = "https://io.adafruit.com/api/v2/LukeZ1986/groups/{}/feeds/{}/data?x-aio-key={}".format(groupkey, feedkey, api_key['key'])
        r = requests.get(feed_data_url)
        feed_data = json.loads(r.text)
    
        top_feed = """
        <div class="w3-card w3-margin">
            <div class="w3-container w3-padding">
                <h4>Feed Data: {}</h4>
            </div>
            <ul class="w3-ul w3-hoverable w3-white">
        """.format(feedkey)

        for feed in feed_data:
            feed_date = feed['created_at']
            feed_value = feed['value']
            feed_content += """
            <li class="w3-padding-16">
                <span class="w3-large">{}</span><br>
                <span>{}</span>
            </li>
            </a>""".format(feed_value, feed_date)

        bottom_feed = """
            </ul>
        </div>
        """
    else:
        feed_content += """
        <h2>Need to be logged in to see this resource</h2>
        """
    page = top + top_feed + feed_content + bottom_feed + bottom
    return page
                    
                    
run(host='localhost', port=8080, debug=True)
