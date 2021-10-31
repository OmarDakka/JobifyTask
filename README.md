# **Jobify Task**
# E-commerce web application
### Web application used to add products by shops and users viewing them and interacting with them using Django + Reactjs with GraphQL
## Installing the application:
- ### Begin by cloning the repository
- ## Server installation
- ### Create a vitural environment using the console and pythion using this command
```
python -m venv py3Env
```
- ### Activate the environment using the code 
```
call py3Env/Scripts/activate
```
- ### Go back to the directory and open backend folder and install the requirements
```
pip install -r requirements.txt
```
- ### Make migrations and migrate to build database
```
python manage.py makemigrations
python manage.py migrate
```
- ### Load testing seed files
```
call manage.py loaddata ./fixtures/products.json
call manage.py loaddata ./fixtures/category.json
call manage.py loaddata ./fixtures/users.json
```
- ### Run the server 
```
python manage.py runserver
```
- ## Client installation
- ### Navigate to the frontend folder
- ### Install the dependencies 
```
npm install
```
- ### Then start the client using
```
npm start
```
- ## On your browser navigate to http://localhost:3000/products to begin testing
