import axios from 'axios';
const url = 'http://localhost:5000';

export async function getAllPosts() {
  try {
    const posts = await axios.get(url + '/api/blog/getAll');
    return posts.data.rows;
  } catch (err) {
    return err.message;
  }
}

export async function getOnePost(postId) {
  try {
    const post = await axios.get(`${url}/posts/${postId}`);
    // console.log(post)
    return post;
  } catch (err) {
    return err.message;
  }
}
export async function updateLike(postId) {
  try {
    const response = await axios.get(`${url}/posts/updateLike/${postId}`);
    if (response) {
      return response;
    }
  } catch (err) {
    return err.message;
  }
}
export async function updateComment(commentdetails) {
  try {
    const response = await axios.post(
      `${url}/posts/updatecomments/`,
      commentdetails
    );
    if (response) {
      return response;
    }
  } catch (err) {
    return err.message;
  }
}
export async function deleteComment(commentid) {
  try {
    const response = await axios.get(
      `${url}/posts/deletecomments/` + commentid
    );
    if (response) {
      return response;
    }
  } catch (err) {
    return err.message;
  }
}
export async function getAllCommentsByPostId(postid) {
  try {
    const response = await axios.get(`${url}/posts/getcomments/${postid}`);
    if (response) {
      return response;
    }
  } catch (err) {
    return err.message;
  }
}

export async function uploadPost(postdata) {
  try {
    const response = await axios.post(`${url}/posts/upload`, postdata);
    if (response) {
      return response;
    }
  } catch (err) {
    return err.message;
  }
}

export async function signIn(userData) {
  try {
    const { email, password } = userData;
    const response = await axios.post(`${url}/auth/signin`, {
      email,
      password,
    });

    if (response) {
      await window.localStorage.setItem('token', response.data.token);
      return response;
    }
  } catch (err) {
    return err.message;
  }
}

export async function getPostByMinMax(min, count) {
  try {
    const response = await axios.post(`${url}/posts/minmax/`, { min, count });
    // console.log(response.data.res);
    if (response) {
      return response.data.res;
    }
  } catch (err) {
    return err.message;
  }
}
export async function searchPost(searchContent) {
  try {
    const response = await axios.get(
      `${url}/posts/searchPost/${searchContent}`
    );
    if (response) {
      return response;
    }
  } catch (err) {
    return err.message;
  }
}
