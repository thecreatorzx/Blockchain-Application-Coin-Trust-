
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

    setTimeout(()=>{
        toast.remove();
    },3000);
}
removeToast();
