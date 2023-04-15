from selenium import webdriver
import time

# Set up the webdriver (make sure the path to chromedriver is correct)
driver = webdriver.Chrome(executable_path='/path/to/chromedriver') # Update with the correct path

# Navigate to the desired website
url = 'https://supercoach.heraldsun.com.au/afl/classic/gameday/matches(popup:gameday/matches)'
driver.get(url)

# Wait for the page to load (adjust the time as needed)
time.sleep(5)

# Get the current URL (this could be different if the page has redirects)
current_url = driver.current_url

# Write the URL to a file
with open('output.txt', 'w') as f:
    f.write(current_url)

# Close the browser
driver.quit()