import React from 'react';
import { useFetchPostsQuery, useDynamicMutationMutation } from '../api/apiSlice';
import PostView from '../views/PostView';

const PostController = () => {
  const { data: posts, isLoading, isError, refetch } = useFetchPostsQuery('posts');
  const [mutate, { isLoading: isMutating }] = useDynamicMutationMutation();

  const fetchPosts = () => posts || []; // Provide fetched posts or an empty array

  const createPost = async (newPost) => {
    await mutate({
      endpoint: 'posts',
      method: 'POST',
      body: newPost,
    });

    // refetch();
  };

  const updatePost = async (id, updatedPost) => {
    await mutate({
      endpoint: `posts/${id}`,
      method: 'PUT',
      body: updatedPost,
    });

    // refetch();
  };

  const deletePost = async (id) => {
    await mutate({
      endpoint: `posts/${id}`,
      method: 'DELETE',
    });

    // refetch();
  };

  return (
    <PostView
      fetchPosts={fetchPosts}
      createPost={createPost}
      updatePost={updatePost}
      deletePost={deletePost}
      isLoading={isLoading || isMutating}
      isError={isError}
    />
  );
};

export default PostController;
