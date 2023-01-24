# Toc
- [Toc](#toc)
- [Constru-IT ](#constru-IT )
- [Endpoints ](#endpoints )
- [Author](#author  )



# Constru-IT 


This project, it's the Back-End of a Construction App made with Express & MongoDB

If you would like to try the complete application, please refer to this github repository where you will find all the information and the link to the deployed app --> https://github.com/Germanilu/Constru-IT


--------------------------------------------

# How to use it

To be able to use it you will need to install Postman (https://www.postman.com/) and aim to this Heroku server: https://bbobras.onrender.com/


# Endpoints

Here you can find all the methods you can use on Postman to be able to do your research.

### Method: POST

URL:  /api/auth/projectManagerSignIn --> To register an account for the Project Manager
BODY {   
        "name": 
        "surname": 
        "nif": 
        "mobile": 
        "address": 
        "businessName": 
        "email": 
        "password":   
} 

URL:  /api/auth/clientSignIn --> To register an account for the Client
BODY {   
        "name": 
        "surname": 
        "nif": 
        "mobile": 
        "address": 
        "businessName": 
        "email": 
        "password":   
} 

URL:  /api/auth/employeeSignIn --> To register an account for the Employee
BODY {   
        "name": 
        "surname": 
        "nif": 
        "mobile": 
        "address": 
        "email": 
        "password":    
} 

URL:  /api/auth/login --> To Login
BODY {
    "email": "pm1@mail.com",
    "password": "123456"
    }

URL:  /api/startNewChat/:id (ProjectManager ID) --> To start a new Chat with the Project Manager

URL:  /api/addMaterial/:id (ProjectID) --> ProjectManager can add material to the project
BODY{
    "name": 
    "quantity": 
}

URL:  /api/newMessage/:id (ChatID) --> To add newe message on chat
BODY{
    "message": 
}

URL:  /api/newProject/:id (ClientID) --> ProjectManager can create a new project witht he client ID
BODY{
    "name": 
    "workersNumber": 
}

URL:  /api/newProjectTask/:id (ProjectID) --> ProjectManager can create a new task inside the project
BODY{
    "name": 
    "description": 
    "workers": 
}

URL:  /api/startNewTask/:id (TaskID) --> Employee Can start to work in a task
BODY{
    "name": 
    "description": 
    "workers": 
}

--------------------------------------------


### Method: GET

URL: /api/auth/profile --> User can see his profile

URL: /api/auth/getEmployeeInProject/:id (ProjectID) --> PM can get all employee working inside the project

URL: /api/auth/workedHour/:id (EmployeeID) --> ProjectManager can get the hour worked by the employee
BODY {
    "projectId": 
}

URL: /api/projectMaterial/:id (ProjectID) --> ProjectManager can get all materials inside 1 project

URL: /api/material/:id (MaterialId) --> ProjectManager can get a material by ID

URL: /api/auth/consultMessages/:id (ChatID) --> User can see all the message inside the chat

URL: /api/auth/myProjects --> User can see his projects

URL: /api/auth/ongoingProject --> User can see his ongoing projects

URL: /api/auth/endedProject --> User can see his ended projects

URL: /api/auth/tasks/:id (ProjectID) --> User can see the tasks in the projects

URL: /api/auth/pendingTasks/:id (ProjectID) --> User can see his ongoing tasks

URL: /api/auth/endedTasks/:id (ProjectID) --> User can see his ended tasks

URL: /api/auth/getAllMyWorks/:id (EmployeeID) --> To get all the works done by the employee

--------------------------------------------

### Method: PUT

URL: /api/assignToProject/:id (ProjectID) --> ProjectManager can assign employee to Project
BODY {
    "employeeId": 
}

URL: /api/removeFromProject/:id (ProjectID) --> ProjectManager can remove employee from Project
BODY {
    "employeeId": 
}

URL: /api/updateMaterial/:id (MaterialID) --> ProjectManager can Update a material
BODY {
    "name": 
    "quantity": 
}

URL: /api/updateMaterialStatus/:id (MaterialID) --> ProjectManager can Update a material status inside the project, this will automatically mark as terminated the material
URL: /api/message/:id (MessageID) --> To update message inside the chat
BODY{
    "message": 
}

URL: /api/completeProject/:id (ProjectID) --> To Complete the project
BODY{
    "message": 
}

URL: /api/editTask/:id (TaskID) --> To Edit task inside project
BODY{
    "name": 
    "description": 
}

URL: /api/markascomplete/:id (TaskID) --> To mark as complete the task

URL: /api/endTask/:id (WorkID) --> Employee can terminate to work in a task


--------------------------------------------

### Method: DELETE

URL: /api/material/:id (MaterialID) --> ProjectManager can delete the material from project

URL: /api/message/:id (MessageId) --> ProjectManager can delete the message inside the chat 

URL: /api/deleteProject/:id (ProjectID) --> ProjectManager can delete the Project

URL: /api/deleteTask/:id (TaskID) --> ProjectManager can delete the Task

--------------------------------------------

## Author 	

#### [Luciano Germani](https://github.com/Germanilu) :it:
 


[:top:](#toc)
