import { Loader } from 'lucide-react';
import { useGetRecentPosts } from '@/lib/react-query/quariesAndMutations.ts';
import { Models } from 'appwrite';
import PostCard from '@/components/shared/PostCard.tsx';

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h-2-bold text-left w-full'>Home Feed</h2>
        </div>
        {isPostLoading && !posts ? (
          <Loader />
        ) : (
          <ul className='flex flex-col lfex-1 gap-9 w-full'>
            {posts?.documents.map((post: Models.Document) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;