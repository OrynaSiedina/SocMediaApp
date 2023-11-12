import TopBar from '@/components/shared/TopBar.tsx';
import LeftSidebar from '@/components/shared/LeftSidebar.tsx';
import { Outlet } from 'react-router-dom';
import BottomBar from '@/components/shared/BottomBar.tsx';

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar/>
      <LeftSidebar/>
      <section className='flex flex-1 h-full'>
        <Outlet/>
      </section>
      <BottomBar/>
    </div>
  )
}

export default RootLayout