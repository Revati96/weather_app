console.log('Client side javascript file is loaded!!');

 const weatherForm = document.querySelector('form');
 const search = document.querySelector('input');
 const messageOne = document.querySelector('#message-one');
 const messageTwo = document.querySelector('#message-two');

 weatherForm.addEventListener('submit' , (e) =>
 {
     e.preventDefault();
     var location = search.value;
messageOne.textContent = 'Loading...';
 messageTwo.textContent = ' ';
     fetch('http://localhost:3000/weather?location='+location).then((response) => 
     {
     response.json().then((data) => {
         if(! data.error)
         {
            messageOne.textContent = data.location;
            messageTwo.textContent = data. forecast;
         }
         else
         {
            messageOne.textContent = data.error;
         }
     
     })
     }) 
     console.log('Test');
 })
