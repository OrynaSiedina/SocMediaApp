import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';

const TopBar = () => {
  return (
    <>
      <section className='topbar h-full'>
        <div className='flex-between py-4 px-5'>
          <Link to='/' className='flex gap-3 items-center'>
            <img
              src='/assets/images/logo.svg'
              alt='logo'
              width={130}
              height={325}
            />
          </Link>
          <div className='flex gap-4'>
            <Button>
              <img src='/assets/icons/logout.svg' alt='logout' />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopBar;
