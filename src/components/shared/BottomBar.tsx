import { Link, useLocation } from 'react-router-dom';

import { bottombarLinks } from '@/constants';

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive && ' bg-primary-500 '
            } flex-center flex-col gap-1 p-2 rounded-[10px] transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`${isActive && 'invert-white'}`}
            />
            <p className='tiny-medium text-light-2'>{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
