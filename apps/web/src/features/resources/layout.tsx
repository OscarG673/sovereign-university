import type { ToPathOption } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { cn } from '@sovereign-university/ui';

import { PageHeader } from '#src/components/PageHeader/index.tsx';

import { MainLayout } from '../../components/MainLayout/index.tsx';

import { CategoryTabs } from './components/CategoryTabs/index.tsx';
import { DropdownMenu } from './components/DropdownMenu/dropdown-menu.tsx';
import { FilterBar } from './components/FilterBar/index.tsx';
import { Pagination } from './components/Pagination/index.tsx';

interface Props {
  title: string;
  tagLine?: string;
  children: ReactNode;
  filterBar?: {
    label?: string;
    value?: string;
    onChange: (v: string) => void;
  };
  pagination?: boolean;
  className?: string;
  // TODO fix this build issue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link?: ToPathOption<any>;
  // link?: ToPathOption<RegisteredRouter['routeTree']>;
  activeCategory?: string;
}

export const ResourceLayout = ({
  title,
  tagLine,
  children,
  filterBar,
  pagination,
  className,
  link,
  activeCategory,
}: Props) => {
  return (
    <MainLayout footerVariant="dark">
      <div className={cn('flex h-fit justify-center p-2 md:p-10', className)}>
        <div className="w-full max-w-6xl text-black">
          <CategoryTabs resourceActiveCategory={activeCategory} />
          <DropdownMenu resourceActiveCategory={activeCategory} />

          <PageHeader
            title={title}
            description={tagLine || ''}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            link={link ? link : ''}
            hasGithubDescription={true}
          />

          {filterBar && (
            <div className="flex justify-center my-3 sm:my-6 md:my-8">
              <FilterBar {...filterBar} />
            </div>
          )}

          <div className="my-4 sm:my-6">{children}</div>

          {pagination && (
            <div className="mx-auto w-max">
              <Pagination />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
