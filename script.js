var userProfile = (function(){
    function nameLength(fname){
        fname = document.getElementById("fname").value.trim();
        let infoBox = document.getElementById('name_info');
        let codeWarn = '';
        if(fname){
            //there is name match the pattern
           fname = nameCheck(fname)
           if(fname == true){
            alert('match')
           }else{
            console.log('mistmatch')
           }
        }else{
            //infoBox.style.color ='red';
            codeWarn = "username should not be blank";
           console.log(codeWarn); 
        };

    }
    function nameCheck(fname){
        //alert('hello')
      let pattern = /[a-z]/
      if(pattern.test(fname)){
          return true;
      }else{
          return false;
      }
    }
    function passwordVal(pwd){
        console.log('name valiate')
        let pattern = /[0-9]/
        if(pattern.test(pwd)){
            return true;
        }else{
            return false;
        }
    }
    return{
        "name":nameLength
    }  
  }())
//userProfile.name();
// form data
let form = document.createElement("form");
let inputElement = document.createElement("input");
inputElement.setAttribute("file_name", "file_name");
inputElement.setAttribute("type", "file")
inputElement.setAttribute("id", 'file_upload');
//document.body.appendChild(inputElement);
form.setAttribute("method", 'post');
const displayForm = document.querySelector("form");
displayForm.appendChild(inputElement)
//console.log(displayForm)
document.querySelector('#file_upload').addEventListener("input", function(event){
    const file_upload = this.files.item(0);
    let image_file_reader = new FileReader();
    image_file_reader.readAsDataURL(file_upload);
    console.log(image_file_reader);
    image_file_reader.onload = function(){
        const type = ['image/png'];
        imageFormat = file_upload.type;
        if(type.includes(imageFormat)){
            let image_loaded = this.result
            //console.log(image_loaded)
            const form = new FormData();
            form.append('image', image_loaded)
            for(const pics of form.entries()){
                console.log(pics)
                break;
            }
             //console.log(pics)
            axios.post("http://localhost:5000/blogs/uploadImage", form, {
                headers:{
                    "Content-Type":"multipart/formData"
                }
            }).then(data =>{
                console.log(data.data);
            }
            ).catch(error=>{
                console.log(error.message);
            })
        }else{
            console.log("wrong image format")
        }
       
    }
})