## Instruction to run the project

1. Download ZIP in github (https://github.com/jamirxp/squirro_react)
2. Copy squirro_react-master.zip to c:/
3. Right click and extract all for squirro_react-master.zip
4. Up the API for bookstore
    a. Open Terminal or Command Prompt
    b. Enter "cd C:\squirro_react-master\squirro_react-master\book-store-api"
    c. Enter "npm install" and press enter
    d. Enter "npm run start" and press enter. The outcome will be like:
        > frontend-api@1.0.0 start
	> node index.js

	JSON api server started at localhost:3000
    e. Test in a browser http://localhost:3000/stores if there will be a json response.
	
    FYI: If there's an error you might need to install requests (Enter "pip install requests")
	
6. Up the React Page
    a. Open Terminal or Command Prompt (new)
    b. Enter "cd C:\squirro_react-master\squirro_react-master\squirro_react"
    c. Enter "npm install" and press enter
    d. Enter "npm install axios" and press enter
    e. Enter "npm start" and press enter. It should open http://localhost:3001/ in the browser and will display the React page.
	
## Comments

1. I used a different API for country flags because the countrylayer free account is not returning the flags information anymore. I am using this link to fetch country information https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json.
2. I added column header in the table. 
3. I also added the "Copies Sold" column to display the numbers to make sure it is in order. 


