const express = require('express');
const cors=require('cors')

const storage = require('node-persist');

const app = express();
app.use(cors());


const PORT = 4000;


storage.init().then(() => {
  
  app.use(express.json());

  
  
  app.post('/addTask', async (req, res) => {
    const task = req.body.task;
    if (task) {
      
      const existingTasks = await storage.getItem('tasks') || [];

    
      existingTasks.push(task);

      
      await storage.setItem('tasks', existingTasks);

      res.status(201).json({ message: 'Task added successfully.' });
    } else {
      res.status(400).json({ message: 'Task is required.' });
    }
  });
  app.get('/tasks', async (req, res) => {
    const tasks = await storage.getItem('tasks')|| [];
    res.status(200).json({ tasks });
  });
  storage.clear();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {

  console.error('Error initializing storage:', error);
});



// const express = require('express');
// const storage = require('node-persist');

// const app = express();
// const PORT = 3000;

// // Initialize Node-persist storage
// storage.init();

// // Set up middleware to parse JSON requests
// app.use(express.json());

// // Define routes

// // Add a task to storage
// app.post('/addTask', async (req, res) => {
//   const task = req.body.task;
//   if (task) {
//     // Get existing tasks from storage
//     const existingTasks = await storage.getItem('tasks') || [];

//     // Add the new
// existingTasks.push(task);

//     // Store updated tasks
//     await storage.setItem('tasks', existingTasks);

//     res.status(201).json({ message: 'Task added successfully.' });
//   } else {
//     res.status(400).json({ message: 'Task is required.' });
//   }
// });
// // Get all tasks from storage
// app.get('/tasks', async (req, res) => {
//   const tasks = await storage.getItem('tasks') || [];
//   res.status(200).json({ tasks });
// });

// // Clear Node-persist data on application restart
// storage.clear();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // const express = require('express');
// // const storage = require('node-persist');

// // const app = express();
// // const PORT = 3000;

// // // Initialize Node-persist storage
// // storage.init();

// // // Set up middleware to parse JSON requests
// // app.use(express.json());

// // // Define routes

// // // Add a task to storage
// // app.post('/addTask',async (req, res) => {
// //   const task = req.body.task;
// //   if (task) {
// //     // Get existing tasks from storage
// //     const existingTasks = await storage.getItemSync('tasks') || [];

// //     // Add the new task
// //     existingTasks.push(task);

// //     // Store updated tasks
// //       await storage.setItemSync('tasks', existingTasks);

// //     res.status(201).json({ message: 'Task added successfully.' });
// //   } else {
// //     res.status(400).json({ message: 'Task is required.' });
// //   }
// // });

// // // Get all tasks from storage
// // app.get('/tasks', async (req, res) => {
// //   const tasks = await storage.getItemSync('tasks') || [];
// //   res.status(200).json({ tasks });
// // });

// // // Clear Node-persist data on application restart
// // storage.();

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });