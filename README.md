# Dynamic_Bit_Backend_api

1.For every api request  checkToken Middleware is used to
authenticate Valid API Request.

2.Since API url are authenticated so to fetch API urls on front-end side make sure to get valid *JWT* .

3.http://localhost:3000/api/user_details  is API url to user details  of every employee.

4.http://localhost:3000/api/user_details/:id  is API url to  details of a particular employee based on id.

5.http://localhost:3000/api/user_auth_types is API url to user auth types  of every employee.

6.http://localhost:3000/api/user_auth_types/:id  is API url to user auth type of a particular employee based on id.

7.Dependencies required are express,mysql,jsonwebtoken,cors.

8.Data-base was created through code but all the data tables creation and data insertion was done  manually from *MariaDB* on the local system as it was easier that way rather than through code, so make sure to first add the data to the data-base through mariadb first. 
