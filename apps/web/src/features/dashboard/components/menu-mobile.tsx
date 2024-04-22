import { useLocation } from '@react-hooks-library/core';
import { Link, useNavigate } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { AiOutlineBook } from 'react-icons/ai';
import { IoLogOutOutline, IoPersonOutline } from 'react-icons/io5';

import { useAppDispatch } from '../../../hooks/index.ts';
import { userSlice } from '../../../store/index.ts';

import { MenuItem } from './menu-item.tsx';

export const MenuMobile = () => {
  const [pathname, setPathname] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const dashboardPath = '/dashboard';
  const profilePath = '/dashboard/profile';
  const courseDetailPath = '/dashboard/course';

  useEffect(() => {
    if (location) {
      console.log(location);
      const { pathname } = location;
      if (pathname) {
        setPathname(pathname);
      }
    }
  }, [location]);

  return (
    <div className="fixed bottom-0 py-2 z-10 mx-auto flex w-full flex-row bg-darkOrange-5 text-white md:hidden md:bg-transparent">
      <Link to={dashboardPath} className="w-full">
        <MenuItem
          text={t('dashboard.courses')}
          icon={<AiOutlineBook size={28} />}
          active={
            pathname === dashboardPath || pathname.startsWith(courseDetailPath)
          }
        />
      </Link>
      <Link to={profilePath} className="w-full">
        <MenuItem
          text={t('dashboard.account')}
          icon={<IoPersonOutline size={28} />}
          active={pathname === profilePath}
        />
      </Link>
      <MenuItem
        text={t('dashboard.logout')}
        icon={<IoLogOutOutline size={28} />}
        onClick={() => {
          dispatch(userSlice.actions.logout());
          navigate({ to: '/' });
        }}
      />
    </div>
  );
};
