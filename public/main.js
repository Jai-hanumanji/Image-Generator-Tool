function onSubmit(e){
    e.preventDefault();

    document.querySelector('.msg').textContent="";
    document.querySelector('#image').src='';

    const prompt=document.querySelector('#prompt').value;
    const size=document.querySelector('#size').value;
    if(prompt===''){
        alert("please add text");
        return;
    }
    console.log(prompt,size);

    generateImageRequest(prompt,size);

}

async function generateImageRequest(prompt,size){
    try{
        showSpinner();
        const response=await fetch('/openai/generateimage',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });
        if(!response.ok){
            removeSpinner();
            throw new Error('that image not generated');
        }
        const data=await response.json();
        // console.log(data);
        removeSpinner();
        const imageUrl=data.data;
        document.querySelector('#image').src=imageUrl;
    }
    catch(e){
        document.querySelector('.msg').textContent=e;
    }
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit',onSubmit);