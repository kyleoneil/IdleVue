# Idle Project
A web application for the administrative side of Idle, a mobile queuing system, implemented in Vue.js as a final requirement for the course: Application Development. 

How to Install
1. Create a folder to store this repository
2. Open the command line containing the route to the folder's directory
3. Type `git init`
4. Type `git clone https://github.com/kyleoneil/IdleVue.git`
5. Open the cloned repository along with its route
6. Type `cd idle`
7. Type `npm install `
8. Type `npm run serve` *Notice that it will be running at localhost*
9. Open xampp and create a database called `test-api`
10. In the command line go to the route for idleBackend. Or simply open another terminal in VScode and type the following: `cd idleBackend`
11. Type `npm install`
12. Type `nodemon server`
13. to populate and seed:
```shell
npx sequelize db:seed:undo:all
npx sequelize db:seed:all
```





LIST OF USERS:
*note: email - pass - user type*
* admin@idle.com - admin - Super Admin
* owner@idle.com - businessowner - Admin
* teller@idle.com - businessteller - Teller

created by:
- Albarando, Kyle Oneil @kyleoneil
- Doblas, Lester John
- Robles, Nhemuel @KiroMochizuki
- Sagarino, Vin Myca @mikamikkz
- Yu, Simone Raphael

**Video Demo:** https://drive.google.com/drive/folders/1ygR3IjbNOJ2t-CMtRacPPovuQNJXWY27?usp=sharing
