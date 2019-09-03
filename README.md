# SequelizeStudy
its a tutorial from rocketseat -> https://blog.rocketseat.com.br/nodejs-express-sequelize/

1 --> Create a project with "npm init -y"

2 --> install dependencies " npm install sequelize express pg pg-hstore " after that "npm install -D sequelize-cli"

3 --> Then, create a index.js in project root with: 

         const express = require('express');

          const app = express();

          app.use(express.urlencoded({ extended: false }));

          app.get('/', (req, res) => {
           res.send('Hello World!');
          });

          app.listen(3000);
          
TO INIT THE PROCJET JUST WRITE IN THE TERMINAL "node index.js"

4 --> to create a initial settings from sequelize write in the terminal "./node_modules/.bin/sequelize init"
(If u can't write that, u probably forgot to install sequelize-cli, so write in the terminal "npm install -D sequelize-cli")

THIS PROCCESS WILL CREATE SOME FOLDERS (config , migrations, models and seeders)

5 --> the first thing is rename the archive "config.json" in folder "config" to "database.js" and configure your database

        module.exports = {
          username: 'root',
          password: 'root',
          database: 'crud_sequelize',
          host: '127.0.0.1',
          dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        }
        

6 --> Next you will need to create another two folders in project root "database" and "app", so move the folders "migrations" and 
"seeders" inside the folder "database" and the folder "models" inside the folder "app"

      WILL BE LIKE THAT:
            /--YOURPROJECT
            /----app
            /------models
            /--------index.js
            /----config
            /------database.js
            /----database
            /------migrations
            /------seeders
            /----node_modules
            /----.gitignore
            /----index.js
            /----package.json
            /----yarn.lock ou package.lock.json
            
7 --> Next you will create an archive ".sequelizerc" to find the archives and folders to where we move, and inside this archive:
      
      const path = require('path');

        module.exports = {
          'config': path.resolve('config', 'database.js'),
          'models-path': path.resolve('app', 'models'),
          'seeders-path': path.resolve('database', 'seeders'),
          'migrations-path': path.resolve('database', 'migrations'),
        };
        
        
        
8 --> Now we will configure the models from aplication, models are the representative from database table in class form.
first we will configure the archive "index.js" in "app/models/index.js", this archive is responsible for import other models from 
your aplication, your code will be like:

      const fs = require('fs');
        const path = require('path');
        const Sequelize = require('sequelize');
        const config = require('../../config/database.js');

        const db = {};
        const sequelize = new Sequelize(config);

        fs
          .readdirSync(__dirname)
          .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
          .forEach((file) => {
            const model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
          });

        Object.keys(db).forEach((modelName) => {
          if (db[modelName].associate) {
            db[modelName].associate(db);
          }
        });

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        module.exports = db;
        
  
  
9 --> Now we need to create our migrations, the migrations are the archives where we save versions from changes in aplications,
migrations save this changes, To create our migration we need to write this commands in terminal:
    
    "node_modules/.bin/sequelize migration:create --name=create-users"
    
when u execute this commands, an archive will be created on your "migrations" folder, inside this archive will have two functions "up" 
and "down", the "up" function is the code who will modify the database and the function "down" its a rollback.


10 --> Next step its modify the archive inside "migrations" with our commands to modify the database:

           module.exports = {
            up: (queryInterface, DataTypes) => {
              return queryInterface.createTable('Users', {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: DataTypes.INTEGER,
                },
                name: {
                  allowNull: false,
                  type: DataTypes.STRING,
                },
                email: {
                  allowNull: false,
                  type: DataTypes.STRING,
                  unique: true,
                },
                password: {
                  allowNull: false,
                  type: DataTypes.STRING,
                },
                createdAt: {
                  allowNull: false,
                  type: DataTypes.DATE,
                },
                updatedAt: {
                  allowNull: false,
                  type: DataTypes.DATE,
                },
              });
            },

            down: (queryInterface) => {
              return queryInterface.dropTable('Users');
            }
          };
          
          
Now to see if work, lets write in the terminal the commands: "node_modules/.bin/sequelize db:migrate" and check your database, probably
will have two another tables, "SequelizeMeta" and "Users", "SequelizeMeta" is the table to save informations about migration who was
executed, its essencial when u execute again the same migration, because the migration don't execute everything just the new things.

(IF U ARE USING MYSQL U NEED TO INSTAL MYSQL12 WITH THE COMMAND "npm install mysql2")


11 --> Now we going to create our model, to start we need to create an archive "user.js" inside the folder "models" (app/models),
and the content inside this archive is:

         module.exports = (sequelize, DataTypes) => {
          const User = sequelize.define('User', {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
          });

            return User;
         }
   
  
12 --> Now we just need to import the USER from models in "index.js" on project root: "const { User } = require('./app/models');"
To see if it works just use: "User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' });" 
in the "index.js" on project root, and execute the "index.js" with the command "node index.js"

TO CREATE A CRUD FOR USERS USE THE FOLLOWING COMMANDS IN "index.js" ON THE PROJECT ROOT:

 ----> CREATE
 
      "app.post('/register', async (req, res) => {
          const user = await User.create(req.body);
          res.json(user);
        });" 
        
       
 ----> READ BY ID
 
        app.get('/find/:id', async (req, res) => {
            const user = await User.findByPk(req.params.id)
            res.json(user);
        });
        
        
 ----> READ ALL
 
       app.get('/findall', async (req, res) => {
          const user = await User.findAll()
          res.json(user);
      });
      
      
 ----> UPDATE
 
       app.put('/update/:id', async(req, res) => {
          const user = await User.update(
              {
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password

              },
              { where: { id: req.params.id } }
          )
          res.json(user);
      });
      
      
 ----> DELETE
 
         app.delete('/delete/:id', async (req, res) => {
            const user = await User.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.json(user);
        });
