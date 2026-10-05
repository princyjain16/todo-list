$(document).ready(function () {

    // Array to store tasks
    let tasks = [];

    // Add Task
    $("#addTaskBtn").click(function () {

        let taskText = $("#taskInput").val().trim();

        // Check if task is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create task object
        let task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        // Add task to array
        tasks.push(task);

        // Clear input
        $("#taskInput").val("");

        // Display tasks
        displayTasks();

    });


    // Add task by pressing Enter
    $("#taskInput").keypress(function (event) {

        if (event.which === 13) {
            $("#addTaskBtn").click();
        }

    });


    // Display Tasks
    function displayTasks() {

        $("#taskList").empty();

        if (tasks.length === 0) {

            $("#noTasks").show();

        } else {

            $("#noTasks").hide();

            $.each(tasks, function (index, task) {

                let completedClass =
                    task.completed ? "completed" : "";

                let taskItem = `
                    <li class="list-group-item">

                        <span class="${completedClass}">
                            ${task.text}
                        </span>

                        <div class="task-buttons">

                            <button
                                class="btn btn-success btn-sm complete-btn"
                                data-id="${task.id}">
                                Complete
                            </button>

                            <button
                                class="btn btn-danger btn-sm delete-btn"
                                data-id="${task.id}">
                                Delete
                            </button>

                        </div>

                    </li>
                `;

                $("#taskList").append(taskItem);

            });

        }

        updateTaskSummary();

    }


    // Mark Task as Completed
    $(document).on("click", ".complete-btn", function () {

        let taskId = $(this).data("id");

        $.each(tasks, function (index, task) {

            if (task.id == taskId) {
                task.completed = !task.completed;
            }

        });

        displayTasks();

    });


    // Delete Task
    $(document).on("click", ".delete-btn", function () {

        let taskId = $(this).data("id");

        tasks = tasks.filter(function (task) {

            return task.id != taskId;

        });

        displayTasks();

    });


    // Update Task Summary
    function updateTaskSummary() {

        let total = tasks.length;

        let completed = tasks.filter(function (task) {

            return task.completed === true;

        }).length;

        let pending = total - completed;

        $("#totalTasks").text(total);

        $("#completedTasks").text(completed);

        $("#pendingTasks").text(pending);

    }


    // Display tasks initially
    displayTasks();

});