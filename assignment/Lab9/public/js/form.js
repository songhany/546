(function() {

  // calculate Fibonacci value
  function fibonacci(n) {
    if (typeof n !== 'number') throw 'Must provide a number index';
    if (isNaN(n)) throw 'Must provide a number';

    if (n < 0 ) return 0;  //	Fibonacci of anything less than 1 is 0

    if (n<=1)
      return n;
    else {
      return fibonacci(n-1) + fibonacci(n-2);
    }
  };

  
  //check whether value is Prime 
  function valIsPrime(value) {

    let isPrime = true;
    if (value == 1 || value == 0) {
      isPrime = false;
    }
    for (let i=2; i < value; i++) {
      if (value % i == 0) {
        isPrime = false;
        break;
      }
    }

    return isPrime;
  }

  
  let serverForm = document.getElementById('server-form');
  let resultList = document.getElementById('results');
  let indexInput = document.getElementById('index_input');
  
  let errorContainer = document.getElementById('error-container');  //error check
  let errorTextElement = errorContainer.getElementsByClassName('text-goes-here')[0];

  if (serverForm) {
    serverForm.addEventListener('submit', (event) => {
      event.preventDefault();  //avoid default behavior
      
      try {
        // hide containers by default
        errorContainer.classList.add('hidden');
        //calculate fibonacci value
        let index = indexInput.value;  //get index
        if (!index) throw 'You must at least one index';
        index = parseInt(index);  //convert string index to integer
        let value = fibonacci(index);
        //create new li element
        let li = document.createElement("li");
        li.innerHTML = "The Fibonacci of " + index + " is " + value + "."; 
        // check current value in li element whether is prime
        if (valIsPrime(value))
          li.classList.add('is-prime');
        else
          li.classList.add('not-prime');
        //after you create li element, you must append it to <ul>
        resultList.appendChild(li);
        //reset form, and put thhe cursor back into that input field
        serverForm.reset();
        indexInput.focus();
      } catch (e) {
        // console.log(e);
        const message = typeof e === 'string' ? e : e.message;
        errorTextElement.textContent = e;
        errorContainer.classList.remove('hidden');
      }
    });
  }

})();