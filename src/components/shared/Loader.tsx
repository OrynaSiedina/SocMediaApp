type LoaderProps = {
  size?: number; 
};

const Loader = ({ size = 24 }: LoaderProps) => {
  return (
    <div className='flex-center w-full'>
      <img src='/assets/icons/loader.svg' alt='loader' width={size} height={size} />
    </div>
  );
};

export default Loader;
