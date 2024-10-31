const modal = document.getElementById("myModal");
const openModal = document.getElementById("open");
const closeModal = document.getElementById("closeModel");
const submitPost = document.getElementById("submit-post")

const modalProfile = document.getElementById("myModalprofile");
const openProfile = document.getElementById("openProfile");
const closeModels = document.getElementById("closeModels");
const updateProfile = document.getElementById("submit-upadate")

const postContentainer = document.getElementById('posts-container');

//open modal
openModal.onclick = function(){
    modal.style.display="block"
    document.body.classList.add("modal-active")
}

//close modal
closeModal.onclick = function(){
    modal.style.display ="none"
    document.body.classList.remove("modal-active")
}
//when user click any where to close the modal
window.onclick = function(e){
    if(e.target == modal){
        modal.style.display ="none" 
        document.body.classList.remove("modal-active") 
    }
}

//open modalProfile
openProfile.onclick = function(){
    modalProfile.style.display="block"
}

//close modalProfile
closeModels.onclick = function(){
    modalProfile.style.display ="none"
}

//when user click any where to close the modal
window.onclick = function(e){
    if(e.target == modal){
        modalProfile.style.display ="none" 
    }
}

//submitting a post in a database

submitPost.addEventListener('submit',async function(e){
    e.preventDefault();

    //accepting user inputs
    const content = document.getElementById("post-content").value;
  if (content) {
    //sending a post request to the required url
    try {
        const res = await fetch('http://localhost:7060/api/post/create',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                content:String(content)
            })
    })
    const result= await res.json();
    if (result.success) {
      const postSection= document.getElementById("posts-section");
      const newPost= document.createElement('p');
      newPost.textContent=data.content;
      postSection.prepend(newPost);
      alert('Successfull')
      
      //clearing textarea
      postContent.value = '';
    }

    } catch (error) {
     
        //display an error on screen

        console.error('Error:',error);  
    }
  }
})

// loaing post from backend
fetch('http://localhost:7060/api/post/userspost')
   .then(response=>response.json())
   .then(data=>{
    if (data.success) {
        const posts = data.data; //getting all post
        displayPosts(posts); //displaying our posts in html
    }else{
        console.error('Error loading Post: ' ,data.message)
    }
   })
   .catch(error=>{
    console.error('Error:',error);
   })
   function displayPosts(items){
    const postList = postContentainer;
    if (items.length === 0) {
        postList.innerHTML = '<p>No post Found</p>'
        return;
    }
    
       items.forEach(post=>{
        const postLists = post.items.map(item=> `
         <div class="post-row">
            <div class="user-profile">
            <img src="${item.user.profilePicture}" alt="${item.user.name}">
            <div>
        <p>${item.user.name}</p>
    <span>${new Date (item.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
        </div>
        <p class="post-text">${item.content}</p>
        <img src="" class="post-img">
    <div class="post-row">
        <div class="activity-icon">
        <div><img src="images/like.png">120</div>
        <div><img src="images/comments.png">45</div>
        </div>
        <div class="post-profile-icon">
            <img src="${item.postImage}">
        </div>
    </div>
        `).join('') ;
        postLists.innerHTML
       });
    }