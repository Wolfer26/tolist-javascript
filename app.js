var taskInput=document.getElementById("new-task");
var addBtn=document.getElementsByTagName("button")[0];
var incompleteTask=document.getElementById("incomplete-tasks");
var completedTasks=document.getElementById("completed-tasks");


//------------------ New task -----------------------//
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	var checkBox=document.createElement("input");
	var label=document.createElement("label");
	var editInput=document.createElement("input");
	var editButton=document.createElement("button");
	

	//Delete Button
	var deleteButton=document.createElement("button");

	label.innerText=taskString;

	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";



	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	//Add Task
	var listItem=createNewTaskElement(taskInput.value);

	incompleteTask.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

//Edit task.
var editTask=function() {

var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		
		if(containsClass) {

			label.innerText=editInput.value;
		} else {
			editInput.value=label.innerText;
		}
		listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		ul.removeChild(listItem);

}


//Mark completed
var taskCompleted=function(){
	console.log("Complete Task");
	
	var listItem=this.parentNode;
	completedTasks.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function() {
	var listItem=this.parentNode;
	incompleteTask.appendChild(listItem);
	bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function() {}


addBtn.addEventListener("click",addTask);
addBtn.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){

	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");

	editButton.onclick=editTask;
	deleteButton.onclick=deleteTask;
	checkBox.onchange=checkBoxEventHandler;
}


	for (var i=0; i<incompleteTask.children.length;i++){

		bindTaskEvents(incompleteTask.children[i],taskCompleted);
	}


	for (var i=0; i<completedTasks.children.length;i++){
		bindTaskEvents(completedTasks.children[i],taskIncomplete);
	}
