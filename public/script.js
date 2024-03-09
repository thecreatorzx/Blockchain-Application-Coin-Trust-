
function removeToast(){
    let toast = document.getElementById("toastbox");

    // if(messages.error){
    //     toast.classList.add("error")
    // }
    // if(messages.success){
    //     toast.classList.add("success");
    // }
    // if(messages.invalid){
        //     toast.classList.add("invalid");
        
        // }
        let snd = new Audio("success.wav");
        snd.play();
        snd.currentTime = 0;
    
    setTimeout(()=>{
        toast.remove();
    },3000);
}
removeToast();
