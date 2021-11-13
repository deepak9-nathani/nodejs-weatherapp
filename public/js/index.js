console.log("connected to index.js")




const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const errorText = document.querySelector('#error')
const valid = document.querySelector('#valid')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    errorText.textContent = 'Loading....'
    valid.textContent = ''

    fetch('/weather?address='+location).then((response)=>{
response.json().then((data)=>{
    if(data.error)
       {
           errorText.textContent = data.error
           valid.textContent = ''
       } 
       else 
       {
          errorText.textContent = data.location
          valid.textContent = data.forecast  
    }
})
})
})