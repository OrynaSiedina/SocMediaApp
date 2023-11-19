import { Models } from 'appwrite';
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/quariesAndMutations.ts';
import React, { useEffect, useState } from 'react';
import { checkIsLiked } from '@/lib/utils.ts';
import Loader from '@/components/shared/Loader.tsx';

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: unsavePost, isPending:isUnsaving } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id,
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likesArray: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSavingPost || isUnsaving) return;
    if (savedPostRecord) {
      setIsSaved(false);
      unsavePost(savedPostRecord.$id);
    } else {
      if (!isSaved) {
        savePost({ postId: post?.$id || '', userId });
        setIsSaved(true);
      }
    }
  };

  return (
    <div className='flex justify-between items-center z-20'>
      <div className='flex gap-2 mr-5'>
        <img
          src={`/assets/icons/${
            checkIsLiked(likes, userId) ? 'liked' : 'like'
          }.svg`}
          alt='like'
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className='cursor-pointer'
        />
        <p className='smal-medium lg:base-medium'>{likes.length}</p>
      </div>
      <div className='flex gap-2'>
        {isSavingPost || isUnsaving
          ? <Loader size={20}/>
        : <img
          src={`/assets/icons/${isSaved ? 'saved' : 'save'}.svg`}
          alt='share'
          width={20}
          height={20}
          className='cursor-pointer'
          onClick={(e) => handleSavePost(e)}
        />}
      </div>
    </div>
  );
};

export default PostStats;
