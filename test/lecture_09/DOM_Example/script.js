// let myP = document.getElementById("myP")
// // myP.innerHTML= 'I have been changed'
// let myErrorDiv = document.getElementById("error")
// let myBtnTwo = document.getElementById('myBtnTwo')
// let myDivBtn = document.getElementById("divBtn")
// let divContainer = document.getElementById("container")
// let myUl = document.getElementById("list")

// function btnClick(){
// 	if (myP.className == 'myClassOne'){
// 		myP.className = 'myClassTwo'
// 		myP.innerHTML= "I am now classTwo"
// 	}else{
// 		myP.className = 'myClassOne'
// 		myP.innerHTML= "I am now classOne"
// 	}
// }

// myBtnTwo.addEventListener('click', ()=>{
// 	if (myErrorDiv.hidden== true){
// 		myErrorDiv.hidden=false
// 	}else{
// 		myErrorDiv.hidden= true
// 	}
// })

// myDivBtn.addEventListener('click', ()=>{
// 	let newP = document.createElement('p')
// 	newP.innerHTML = "I'm another P tag"
// 	divContainer.appendChild(newP)  //after you create element, you must append it
// })

// function addItem(){
// 	let li=document.createElement("li")
// 	li.innerHTML = "I'm a new item"
// 	myUl.appendChild(li)
// }


let myForm = document.getElementById('myForm');
let textInput = document.getElementById('text_input');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('list');
let frmLabel = document.getElementById('formLabel');

if (myForm) {
  myForm.addEventListener('submit', (event) => {
    event.preventDefault();  // prevent default behavior, without this line, page will reload, new added item will not show on screen. The form submission by default wants to either trigger reload for if you're posting to that page or if it wants to go to the server if there's an action
    if (textInput.value.trim()) {  // trim(): Remove whitespace from both sides of a string  
      //if there is error message before, in next valid input, make error message hidden
      textInput.classList.remove('inputClass');
      errorDiv.hidden = true;
      frmLabel.classList.remove('error');
      
      //create a new item in list
      let li = document.createElement('li');
      li.innerHTML = textInput.value;
      myUl.appendChild(li);

      //reset form, and put thhe cursor back into that input field
      myForm.reset();
      textInput.focus();  // set focus, put thhe cursor back into that input, so it's ready for the next one
    } else {  //you don't enter a value in form
      textInput.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'You must enter a value';
      frmLabel.className = 'error';  //add 'error' class to label, so CSS will work on it
      textInput.focus();
      textInput.className = 'inputClass';
    }
  });
}
