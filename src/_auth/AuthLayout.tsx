import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext.tsx';

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center flex-col px-5 pt-2'>
            <Outlet />
          </section>
          <div className='min-h-screen hidden xl:block w-1/2 bg-cover bg-[url("/assets/images/side-image.svg")] bg-no-repeat' />
        </>
      )}
    </>
  );
};

export default AuthLayout;
