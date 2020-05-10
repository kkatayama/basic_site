# coding: utf-8

from bottle import Bottle, route, request, redirect, run, template, static_file, debug
import pandas as pd
import requests
import string
import json
import sys
import os

app = Bottle()

##########################################
#  GLOBAL VARIABLES / SETTINGS           #
##########################################
with open('api_key') as f:
    api_key = {'key': '{}'.format(f.read().strip())}

app.config.update({
    'app.root_path': sys.path[0] + '/',
    'app.logged_in': {
        'username': '',
        'status': False
        },
    'app.accounts': {
        'SMeter 2': 'password2',
        'SMeter 3': 'password3',
        'SMeter 4': 'password4'
    },
    'app.api_key': api_key
})




##########################################
#  MAIN WEBSITE FUNCTIONS                #
##########################################

# -- landing page
@app.route('/')
def get_index():
    print('in get_index()')
    status = request.app.config['app.logged_in']['status']
    if (status):
        username = request.app.config['app.logged_in']['username']
        print('{} is logged in... serving: groups.tpl'.format(username))
        api_key = request.app.config['app.api_key']['key']
        group_url = "https://io.adafruit.com/api/v2/LukeZ1986/groups?x-aio-key={}".format(api_key)

        df = pd.DataFrame(pd.read_json(group_url), columns=['name','key','feeds'])
        df = df[df['name'] == username]
        group_key = df.reset_index()['key'][0]
        group_feeds = [[g['key'],g['id'],g['name'],g['created_at']] for g in df['feeds'].explode()]
        return template('groups', username=username, group_key=group_key, group_feeds=group_feeds)
    else:
        print('user is not logged in... serving: login.tpl')
        return template('login')

# -- login page
@app.route('/login')
def get_login():
    print('in get_login()')
    status = request.app.config['app.logged_in']['status']
    if (status):
        username = request.forms.get('username')
        print('user is logged in... serving: index.tpl')
        api_key = request.app.config['app.api_key']['key']
        group_url = "https://io.adafruit.com/api/v2/LukeZ1986/groups?x-aio-key={}".format(api_key)

        df = pd.DataFrame(pd.read_json(group_url), columns=['name','key','feeds'])
        df = df[df['name'] == username]
        group_key = df.reset_index()['key'][0]
        group_feeds = [[g['key'],g['id'],g['name'],g['created_at']] for g in df['feeds'].explode()]
        return template('groups', username=username, group_key=group_key, group_feeds=group_feeds)
    else:
        print('user is not logged in... serving: login.tpl')
        return template('login')

# -- logoff
@app.route('/logoff')
def get_logoff():
    print('logoff()')
    app.config['app.logged_in']['status'] = False
    app.config['app.logged_in']['username'] = ''
    return template('login')

# -- check login credentials
# -- on sucesss, fetch all group feeds
@app.route('/login', method='POST')
def post_login():
    print('in post_login')
    uname = request.forms.get('username')
    pword = request.forms.get('password')
    print('uname = {}, pword = {}'.format(uname, pword))

    try:
        password = request.app.config['app.accounts'][uname]
        print('password = {}, so username: {} exists...'.format(password, uname))
    except Exception as e:
        print(e)
        return template('login', error='Bad Username')
    if pword == password:
        app.config['app.logged_in']['status'] = True
        app.config['app.logged_in']['username'] = uname
        print('{} successfully logged: fetching feeds...'.format(uname))

        api_key = request.app.config['app.api_key']['key']
        group_url = "https://io.adafruit.com/api/v2/LukeZ1986/groups?x-aio-key={}".format(api_key)

        df = pd.DataFrame(pd.read_json(group_url), columns=['name','key','feeds'])
        df = df[df['name'] == uname]

        group_key = df.reset_index()['key'][0]
        group_feeds = [[g['key'],g['id'],g['name'],g['created_at']] for g in df['feeds'].explode()]
        user_name = uname
        print(uname)
        print(group_key)

        return template('groups', username=uname, group_key=group_key, group_feeds=group_feeds)
    else:
        return template('login', error='Bad Password')


# -- fetch all feeds associated with group key
# -- return data formated for DataTables
@app.route('/table')
def get_table():
    print('table selected...')
    group_key = request.query.get('group_key')
    feed_key = request.query.get('feed_key')
    api_key = request.app.config['app.api_key']['key']
    user_name = request.app.config['app.logged_in']['username']
    feed_url = "https://io.adafruit.com/api/v2/LukeZ1986/groups/{}/feeds/{}/data?x-aio-key={}"
    df = pd.read_json(feed_url.format(group_key, feed_key, api_key))
    df = df.sort_values(by=['created_at'], ascending=True).reset_index()

    tabledata = df.to_html(index=False, columns=['created_at', 'value', 'id', 'feed_id', 'feed_key', 'expiration'], escape=False).replace('<table border="1" class="dataframe">', '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">').replace('<tr style="text-align: right;">', '<tr>')

    # with open('tables.tpl') as f:
    #     table_template = f.read()
    return template('tables', user_name=user_name, feed_key=feed_key, tabledata=tabledata)



# -- fetch all feeds associated with group key
# -- return data formated for chart.js
@app.route('/chart')
def get_chart():
    chart_type = 'line'
    group_key = request.query.get('group_key')
    feed_key = request.query.get('feed_key')
    api_key = request.app.config['app.api_key']['key']
    user_name = request.app.config['app.logged_in']['username']
    safe_name  = '_'.join([c.translate(str.maketrans('','',string.punctuation+' ')) for c in [feed_key, chart_type]])

    print('chart selected...')
    print(feed_key)
    feed_url = "https://io.adafruit.com/api/v2/LukeZ1986/groups/{}/feeds/{}/data?x-aio-key={}"
    df = pd.read_json(feed_url.format(group_key, feed_key, api_key))
    df = df.sort_values(by=['created_at'], ascending=True).reset_index()
    labels = [dt.isoformat().split('+')[0] for dt in df['created_at']]
    data   = list(df['value'])

    chart_type = 'line'
    safe_name  = '_'.join([c.translate(str.maketrans('','',string.punctuation+' ')) for c in [feed_key, chart_type]])
    label = 'Time Series Plot: {}'.format(feed_key)
    with open('charts/line/{}.js'.format(safe_name), 'w') as f:
        chart_js = template('charts/line/template_line.js', group_key=group_key, feed_key=feed_key, safe_name=safe_name, label=label, labels=labels, data=data).replace('&#039;','"')
        f.write(chart_js)


    return template('charts', user_name=user_name, safe_name=safe_name, feed_key=feed_key)








##########################################




##########################################
#   ALLOW LOADING OF ALL STATIC FILES    #
##########################################
# Static Routes
@app.route('/<filename:path>')
def serve_static_file(filename):
    root_path = request.app.config['app.root_path']
    print('serving file:  {}{}'.format(root_path, filename))
    return static_file('{}'.format(filename), root='{}'.format(root_path))

port = int(os.environ.get('PORT', 8080))
run(app, host='0.0.0.0', port=port, reloader=True, debug=True)
