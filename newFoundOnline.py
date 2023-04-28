import requests
from bs4 import BeautifulSoup
import json
from oauthlib.oauth2 import LegacyApplicationClient
from requests_oauthlib import OAuth2Session

def get_sc_token():
    # creds to gen token
    client_id = 'Lf7m0371XCbMBlQ0fAFoGRJlfCs2JZpYvLU1uEvd'
    client_secret = ''
    get_token_url = 'https://supercoach.heraldsun.com.au/2023/api/afl/classic/v1/access_token'
    # SC Creds
    sc_user = 'lukezuell@outlook.com'
    # you thought...
    sc_pass = 'A6'

    # get token
    oauth = OAuth2Session(client = LegacyApplicationClient(client_id = client_id))
    token = oauth.fetch_token(token_url = get_token_url, username = sc_user, password = sc_pass, client_id = client_id, client_secret = client_secret)
    sc_token = token["access_token"]
    return sc_token

get_sc_token()