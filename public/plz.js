

console.log("did it work?")

document.getElementById("button").addEventListener("click", hah)


 async function hah (){
   let e = document.getElementById('drop')
   let text = e.options[e.selectedIndex].text;
   const data = {text}
   const options = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   };

   const responce = await fetch("/searchh", options);
   const data1 = await responce.json();
   console.log(data1)
   console.log(text)
//      fetch("/searchh", options).then(response =>{
//     console.log(response);
//    } );

    console.log(text)
}