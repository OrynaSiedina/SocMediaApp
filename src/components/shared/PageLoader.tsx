import '@/styles/PageLoaderStyle.css';

const PageLoader = () => {
  return (
    <section className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='loader loader-6'>
        <div className='loader-inner'></div>
      </div>
      <p className='body-bold text-light-2'>Loading...</p>
    </section>
  );
};

export default PageLoader;