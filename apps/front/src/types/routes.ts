// TODO document each route

export enum Routes {
  /**
   * Available in MVP
   */
  Home = '/',
  AboutUs = '/about-us',
  UnderConstruction = '/under-construction',

  // Courses
  Courses = '/courses',
  Course = '/course/:courseId/:language?',
  CourseChapter = '/course/:courseId/:language?/chapter/:chapterIndex',

  // Resources
  Resources = '/resources',

  // Resource per type
  Books = '/resources/books',
  Book = '/resources/books/:bookId/:language',
  Podcasts = '/resources/podcasts',
  Podcast = '/resources/podcast/:podcastId',
  Builders = '/resources/builders',
  Builder = '/resources/builder/:builderId/:language',

  // Tutorials
  Tutorials = '/tutorials',
  Tutorial = '/tutorial/:tutorialType',
  Wallets = '/tutorials/wallets',
  Exchanges = '/tutorials/exchanges',
  Merchants = '/tutorials/merchants',
  Mining = '/tutorials/mining',
  Lightning = '/tutorials/lightning',
  Node = '/tutorials/nodes',

  Profile = '/profile',

  /**
   * For later use
   */
  Newsletter = '/newletters',
  Articles = '/articles',
  Article = '/articles/:articleId',
  Interviews = '/interview',
  Interview = '/interview/:interviewId',
  Videos = '/videos',
  Video = '/videos/:videoId',
  Tools = '/tools',
  Tool = '/tools/:toolId',
  BIPs = '/bips',
  BIP = '/bips/:bipId',
  Conferences = '/conferences',
  Conference = '/conferences/:conferenceId',
  Lexique = '/lexique',
  Calendar = '/calendar',
  Contact = '/contact',
}
