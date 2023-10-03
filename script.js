

const apiUrl = 'http://jsonplaceholder.typicode.com/posts';
const postContainer = document.getElementById('posting');

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayPosts(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const displayPosts = (posts) => {
  postContainer.innerHTML = ''; 

  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.id = `post_${post.id}`;
    postElement.innerHTML = `
      <h2 id="post_h2${post.id}">${post.title}</h2>
      <p id="post_p${post.id}">${post.body}</p>
      <button onclick="editPost(${post.id})" type="button" class="button2"><i class="fa-solid fa-pen" ></i>EditPost</button> 
      </div>
      <div>
        <button  onclick="deletePost(${post.id})" type="button" class="button4"><i class="fa-solid fa-trash" ></i>DeletePost</button>         
      </div>
    `;

    postContainer.appendChild(postElement);
  });
};

const createPost = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'New Post',
        body: 'This is the content of the new post.',
        userId: 1,
      }),
    });
    const data = await response.json();
    console.log('Created Post:', data);

    fetchData();
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

const editPost = (postId) => {
  const postElement = document.getElementById(`post_${postId}`);

  if (postElement) {
    const postTitle = document.getElementById(`post_h2${postId}`);
    const postBody = document.getElementById(`post_p${postId}`);
    console.log(postTitle, postBody)

    const titleInput = document.createElement('input');
    titleInput.value = postTitle.textContent;

    const bodyTextarea = document.createElement('textarea');
    bodyTextarea.value = postBody.textContent;

    postTitle.replaceWith(titleInput);
    postBody.replaceWith(bodyTextarea);

    const saveButton = document.createElement('button');
    postElement.appendChild(saveButton);
    saveButton.textContent = 'Save';
    saveButton.onclick = () => {
      const postTitle1 = document.createElement("h3")
      const postBody1 = document.createElement("p")
      postTitle1.textContent = titleInput.value;
      postBody1.textContent = bodyTextarea.value;
      titleInput.replaceWith(postTitle1);
      bodyTextarea.replaceWith(postBody1);
    }
  }
};

const deletePost = async (postId) => {
  try {
    const userConfirmation = confirm('Are you sure you want to delete this post?');
    if (userConfirmation) {
      const response = await fetch(apiUrl+'/'+postId, {
        method: 'DELETE',
      });

      if (response.ok) {
        const postElementToRemove = document.getElementById(`post_${postId}`);
        if (postElementToRemove) {
          postElementToRemove.remove();
        } else {
          console.warn(`Post with ID ${postId} not found in the DOM.`);
        }

        console.log('Deleted Post:', postId);
      } else {
        console.error('Error deleting post:', response.status);
      }
    }
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

window.onload = fetchData;



