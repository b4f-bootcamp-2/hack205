import React, { useState } from 'react';

export function TaskList() {

    const [tasks, setTasks] = useState([{
      Date: new Date,
      Task: "",
      Pomodoros: Number(),
      

    }])
     

    return <div>
      <ul>{tasks && <li>{tasks}</li> }</ul>
    </div>
}


export default TaskList;