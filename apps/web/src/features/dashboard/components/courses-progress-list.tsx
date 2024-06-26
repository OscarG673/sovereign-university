import { Link } from '@tanstack/react-router';
import { t } from 'i18next';

import { Button } from '@sovereign-university/ui';

import OrangePill from '../../../assets/icons/orange_pill_color_gradient.svg';
import { addSpaceToCourseId } from '../../../utils/courses.ts';
import { compose } from '../../../utils/index.ts';
import type { TRPCRouterOutput } from '../../../utils/trpc.tsx';

export const CoursesProgressList = ({
  courses,
}: {
  courses?: NonNullable<TRPCRouterOutput['user']['courses']['getProgress']>;
}) => (
  <div className="flex flex-col justify-start gap-4 md:gap-0">
    {courses && courses.length > 0 ? (
      courses.map((course) => (
        <div
          key={course.courseId}
          className="flex flex-col items-start justify-start space-x-8 rounded-3xl px-6 py-4 md:rounded-none md:px-0 md:py-2"
        >
          <div className="flex w-full flex-col items-start justify-start space-y-2 py-2">
            <div className="mb-2 flex w-full justify-between">
              <span className="text-xl font-semibold uppercase sm:text-base">
                {addSpaceToCourseId(course.courseId)}
              </span>
              <div className="font-semibold text-darkOrange-5">
                {course.progressPercentage}%
              </div>
            </div>
            <div className="relative flex h-2 w-full rounded-r-full">
              <div className="absolute h-2 w-full rounded-full bg-gray-700"></div>
              <div
                style={{ width: `${course.progressPercentage}%` }}
                className={`absolute h-2 rounded-l-full bg-darkOrange-5`}
              ></div>
              <img
                src={OrangePill}
                style={{ marginLeft: `${course.progressPercentage}%` }}
                className={compose('absolute top-[-12px] w-[14px]')}
                alt=""
              />
            </div>
          </div>
          {/* Only for courses in progress */}
          <div
            className={compose(
              'flex flex-row gap-2 pt-4 !m-0',
              course.progressPercentage === 100 ? 'hidden' : '',
            )}
          >
            <Link
              to={'/courses/$courseId/$partIndex/$chapterIndex'}
              params={{
                courseId: course.courseId,
                partIndex: String(course.nextChapter?.part),
                chapterIndex: String(course.nextChapter?.chapter),
              }}
            >
              <Button variant="newPrimary" size="xs">
                {t('dashboard.myCourses.resumeLesson')}
              </Button>
            </Link>
            <Button variant="newPrimaryGhost" size="xs">
              {t('words.details')}
            </Button>
          </div>
          {/* Only for Completed course */}
          <div
            className={compose(
              'flex flex-row gap-2 pt-4 !m-0',
              course.progressPercentage === 100 ? '' : 'hidden',
            )}
          >
            <Button
              variant="newPrimaryGhost"
              size="xs"
              rounded
              className="px-3"
            >
              {t('words.details')}
            </Button>
          </div>
        </div>
      ))
    ) : (
      <div className="w-full py-6">
        <Link to={'/courses'} className="text-orange-600">
          Start a course
        </Link>
        <span> to see your progress here!</span>
      </div>
    )}
  </div>
);
