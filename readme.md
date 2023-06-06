 <h1>Social Media App</h1>
    <img src="https://thumbs.gfycat.com/ThunderousIllHippopotamus-max-1mb.gif" alt="Img">
    <p>This mini-Project where users can add friends</p>
    <h3>Some feautures of this Project👇</h3>
    <ul>
        <li>Register/Login</li>
        <li>Hashing</li>
        <li>MVC</li>
        <li>Authentication</li>
        <li>Send Friend Request</li>
        <li>Accept or reject Freind Request</li>
        <li>Add Posts</li>
        <li>Delete Posts</li>
        <li>Users can Like or Comment on that Post</li>
        <li>User can update his Post</li>
        <li>See all Users who have commented and comment details</li>
    </ul>
    <h2>Backend Deployed Link : - </h2>
    <br>
    <h1>Routes</h1>
    <br>
    <h2>/api/register</h2>
    <h3>METHOD : - POST</h3>
    <p>Body : - Required</p>
    <p>This endpoint should allow users to register. Hash the password on store.</p>
    <br>
    <h2>/api/Login</h2>
    <h3>METHOD : - POST</h3>
    <p>Body : - Required</p>
    <p>This endpoint should allow users to login. Return JWT token on successful login.</p>
    <br>
    <h2>/api/users</h2>
    <h3>METHOD : - GET</h3>
    <p>Body : - Not Required</p>
    <p>This endpoint should return a list of all registered users. </p>
    <br>
    <h2>/api/users/:id?friends</h2>
    <h3>METHOD : - GET</h3>
    <p>Body : - Not Required</p>
    <p>This endpoint should return a list of all friends of a specific user identified by its ID.</p>
    <br>
    <h2>/api/users/:id?friends</h2>
    <h3>METHOD : - POST</h3>
    <p>Body : - Not Required</p>
    <p>This endpoint should allow the user to send a friend request to another user identified by its ID.
        (Protected Route)</p>
    <br>
    <h2>/api/users/:id?friends</h2>
    <h3>METHOD : - PATCH</h3>
    <p>Body : - Required</p>
    <p>This endpoint should allow users to accept or reject friend requests sent to them by another user identified by
        its ID.
        (Protected Route)</p>
    <br>
    <h2>/api/posts</h2>
    <h3>METHOD : - GET</h3>
    <p>Body : - Not Required</p>
    <p>This endpoint should return a list of all posts.</p>
    <br>
    <h2>/api/posts</h2>
    <h3>METHOD : - POST</h3>
    <p>Body : - Required</p>
    <p>This endpoint should allow the user to create a new post.
        (Protected Route)</p>
    <br>
    <h2>/api/posts/:id</h2>
    <h3>METHOD : - PATCH</h3>
    <p>Body : - Required</p>
    <p>This endpoint should allow users to update the text or image of a specific post identified by its ID.
        (Protected Route)</p>
    <br>
    <h2>/api/posts/:id</h2>
    <h3>METHOD : - DELETE</h3>
    <p>Body : - Not Required</p>
    <p>This endpoint should allow users to delete a specific post identified by its ID.
        (Protected Route)</p>
    <br>
    <h2>/api/posts/:id/like</h2>
    <h3>METHOD : - POST</h3>
    <p>Body : - Required</p>
    <p>This endpoint should allow users to like a specific post identified by its ID.
        (Protected Route)</p>
    <br>
    <h2>/api/posts/:id/comment</h2>
    <h3>METHOD : - POST</h3>
    <p>Body : - Required</p>
    <p>This endpoint should allow users to comment on a specific post identified by its ID.
        (Protected Route)</p>
    <br>
    <h2>/api/posts/:id</h2>
    <h3>METHOD : - GET</h3>
    <p>Body : - Not Required</p>
    <p>This endpoint should return the details of a specific post identified by its ID.</p>