# coding: utf-8
from bottle import Bottle, get, post, route, request, redirect, run, template, static_file, debug
import requests
import json
import sys

app = Bottle()

##########################################
#  GLOBAL VARIABLES / SETTINGS           #
##########################################
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
    }
})


@app.get('/')
def get_index():
    status = request.app.config['app.logged_in']['status']
    username = request.app.config['app.logged_in']['username']
    if (status):
        return template("<p>Welcome: {{username}}</p>", username=username)
    else:
        return template('login')


@app.get('/login')
def get_config():
    root_path = request.app.config['app.root_path']
    username  = request.app.config['app.logged_in']['username']
    status    = request.app.config['app.logged_in']['status']
    pass_1 = request.app.config['app.accounts']['SMeter 2']
    pass_2 = request.app.config['app.accounts']['SMeter 3']
    pass_3 = request.app.config['app.accounts']['SMeter 4']
    return {'root_path': root_path,'username': username,'status': status,'pass_1': pass_1,'pass_2': pass_2,'pass_3': pass_3}    

@app.post('/login')
def post_config():
    username  = request.forms.get('username')
    pass_1 = request.forms.get('pass_1')
    pass_2 = request.forms.get('pass_2')
    pass_3 = request.forms.get('pass_3')
    app.config['app.logged_in']['username'] = username
    app.config['app.logged_in']['status'] = True
    app.config['app.accounts']['SMeter 2'] = pass_1
    app.config['app.accounts']['SMeter 3'] = pass_2
    app.config['app.accounts']['SMeter 4'] = pass_3
    return "<p>updated parameters</p>"


@app.route('/<filename:re:.*\.*>')
def send_image(filename):
    root_path = request.app.config['app.root_path']
    print(root_path + filename)
    return static_file(filename, root=root_path)

run(app, host='0.0.0.0', port=8080, reloader=True, debug=True)
