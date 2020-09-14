# GuestBook Task

## Server

#### Technologies
- ExpressJS (_Server_)
- MongoDB (_Database_)
- Mongoose (_Interface with mongoDB_)
- bcrypt (_Hashing password_)
- helmet (_Security_)
- jsonwebtoken (_Authentication_)
</br>
</br>

#### Security is represented in
- Use Middleware **helmet** to protect us from
 - csp ( Content-Security-Policy)
 - hidePoweredBy
 - hsts (Strict-Transport-Security)
 - xssFilter
 
- Use Jsonwebtoken for authentication and this 
  represented as two main functions
 - create token (sign in , sign up ) send it with cookies in response
 - verify token (for any route start with /api)
</br>
</br>

#### APIs
- POST   (/signup/) = **New USER**
- POST   (/login/) = **Log Old USER in**
- POST   (/logout/) = **Log USER out**
- POST   (/api/messages/) = **New Message**
- GET    (/api/messages/) = **Get all Messages**
- DELETE (/api/messages/:id) = **Delete Message**
- UPDATE (/api/messages/:id) = **Update Message**
- UPDATE (/api/messages/:id) = **Update Message**
- POST   (/api/messages/reply/:id) = **Reply Message**
</br>
</br>

#### Postman Collection
```
https://www.getpostman.com/collections/51b7eae7aa3f5117111f
```
</br>
</br>

#### To start the Server (dev)
```
create new .env file with these attr [DATABASE,PORT,JWTSECERT]
cd /server
yarn i || npm install (for first clone) 
yarn dev || npm start dev

```

</br>
</br>
