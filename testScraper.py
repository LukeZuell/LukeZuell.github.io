import re
import requests
from bs4 import BeautifulSoup

# Replace this with the actual URL of the website containing the API link
url = "https://supercoach.heraldsun.com.au/2023/api/afl/classic/v1/players-cf?embed=notes%2Codds%2Cplayer_stats%2Cpositions&round=4&xredir=1&subid=8&subkey=9144dcab9b799a8b2dbf1b5c80a91b68"

response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

# Search for the API URL in the page's content
api_url_pattern = re.compile(r'https://supercoach\.heraldsun\.com\.au/2023/api/afl/classic/v1/players-cf\?.*')
api_url = soup.find("script", string=api_url_pattern)

if api_url is None:
    print("API URL not found in the website's content.")
else:
    print("API URL found:", api_url.string)

    # Extract the subkey
    subkey_pattern = re.compile(r'subkey=([a-f0-9]{32})')
    subkey_match = subkey_pattern.search(api_url.string)

    if subkey_match is None:
        print("Subkey not found in the API URL.")
    else:
        subkey = subkey_match.group(1)
        print("Subkey:", subkey)

        # Continue with making API requests and processing data
