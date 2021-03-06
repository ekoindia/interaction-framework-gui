# interaction-framework-gui Docs
### Backend Setup
##### 1. Move to backend folder using `cd server`
##### 2. Create a .env file in server root directory `touch .env`
##### 3. Paste the following content in .env file and replace the username & password with your local mysql instance creditnials
    PORT=3001
    DB_LOCAL_URI=mysql://username:password@localhost:3306/transaction_framework
>Note:  prefer not to change port number in above file

##### 4. Install all required dependencies using `npm i` or `npm install`

##### 5. Run tests using `npm test`
##### 6. Start the server using `npm run` & keep the server up.

### Frontend Setup
##### 1. Move to back to project Home directory
##### 2. Move to frontend folder using `cd client `
##### 3. Install all required dependencies using `npm i` or `npm install`
##### 4. Start the server using `npm run`


## Data flow diagram components
![Data flow image](https://i.imgur.com/6FCu4mR.gif)
<br/>
##### In the above Image we can see the following components:
![Master Node](https://imgur.com/fmqgd7t.png) Voilet  Node represents a single master interaction node
<br/>
![Green Node](https://imgur.com/1UufvTv.png) Green  Nodes represents interaction in data flow
<br/>
![Blackr Node](https://imgur.com/SjgTNp5.png) Balck Nodes represents parameters of an interaction
<br/>
![Blue Node](https://imgur.com/7a2pJ4A.png) Blue Node  represents response of an interaction
<br/>
![Grey Edge](https://imgur.com/eP3c5e4.png) Grey Paths/Edge represents relation between interaction and it's parameter
<br/>
![Green animated edge](https://imgur.com/9dDEB6r.gif) Green Animated Paths/Edge represents relationship and flow of data between interaction and it's responses and vice-versa
<br/>
![Yellow animated edge](https://imgur.com/RsoyeDc.gif) Yellow Animated Paths/Edge represents relationship and flow of data between interaction and it's responses and vice-versa

## Screen-Shots
![Home screen](https://imgur.com/E9h91Ow.png)
<br/>
![search results](https://imgur.com/nObvNzG.png)
<br/>
![data flow diagram screen](https://imgur.com/xstUFag.png)
<br/>
![data flow diagram screen](https://imgur.com/hYCZ8iS.png)

