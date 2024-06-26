export function addSpaceToCourseId(courseId?: string) {
  if (!courseId) return '';

  return `${courseId.match(/\D+/)?.[0] || ''} ${
    courseId.match(/\d+/)?.[0] || ''
  }`;
}

export function fakeCourseId(courseId: string) {
  switch (courseId) {
    case 'cuboplus': {
      return 'btc401';
    }
    case 'rgb': {
      return 'btc402';
    }
    case 'bizschool': {
      return 'econ102';
    }
    default: {
      return courseId;
    }
  }
}
