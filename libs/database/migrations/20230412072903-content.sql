-- Path: libs/database/migrations/20230412072903-content.sql

CREATE SCHEMA IF NOT EXISTS content;

--- MAIN RESOURCES
CREATE TABLE IF NOT EXISTS content.resources (
  id SERIAL PRIMARY KEY,

  category VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,

  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_commit VARCHAR(40) NOT NULL,

  UNIQUE (category, path)
);

CREATE TABLE IF NOT EXISTS content.tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS content.resource_tags (
  resource_id INTEGER NOT NULL REFERENCES content.resources(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES content.tags(id) ON DELETE CASCADE,

  PRIMARY KEY (resource_id, tag_id)
);

--- BOOKS
CREATE TABLE IF NOT EXISTS content.books (
  resource_id INTEGER PRIMARY KEY REFERENCES content.resources(id) ON DELETE CASCADE,

  level VARCHAR(255),
  author TEXT NOT NULL,
  website_url TEXT
);

CREATE TABLE IF NOT EXISTS content.books_localized (
  book_id INTEGER NOT NULL REFERENCES content.books(resource_id) ON DELETE CASCADE,
  language VARCHAR(10) NOT NULL,
  original BOOLEAN NOT NULL,

  -- Per translation
  title TEXT NOT NULL,
  translator TEXT,
  description TEXT,
  publisher VARCHAR(255),
  publication_year INTEGER,
  cover TEXT,
  summary_text TEXT,
  summary_contributor_id VARCHAR(20),

  -- Links
  shop_url TEXT,
  download_url TEXT,

  PRIMARY KEY (book_id, language)
);

--- BUILDERS
CREATE TABLE IF NOT EXISTS content.builders (
  resource_id INTEGER PRIMARY KEY REFERENCES content.resources(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,

  -- Links
  website_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  nostr TEXT
);

CREATE TABLE IF NOT EXISTS content.builders_localized (
  builder_id INTEGER NOT NULL REFERENCES content.builders(resource_id) ON DELETE CASCADE,
  language VARCHAR(10) NOT NULL,

  description TEXT,

  PRIMARY KEY (builder_id, language)
);

--- PODCASTS
CREATE TABLE IF NOT EXISTS content.podcasts (
  resource_id INTEGER PRIMARY KEY REFERENCES content.resources(id) ON DELETE CASCADE,
  language VARCHAR(10) NOT NULL,

  name TEXT NOT NULL,
  host TEXT NOT NULL,
  description TEXT,

    -- Links
  website_url TEXT,
  twitter_url TEXT,
  podcast_url TEXT,
  nostr TEXT
);

--- COURSES
CREATE TABLE IF NOT EXISTS content.courses (
  id VARCHAR(20) PRIMARY KEY,

  level VARCHAR(255) NOT NULL,
  hours FLOAT NOT NULL,

  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_commit VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS content.courses_localized (
  course_id VARCHAR(20) NOT NULL REFERENCES content.courses(id) ON DELETE CASCADE,
  language VARCHAR(10) NOT NULL,

  -- Per translation
  name TEXT NOT NULL,
  goal TEXT NOT NULL,
  objectives TEXT[] NOT NULL,
  raw_description TEXT NOT NULL,

  PRIMARY KEY (course_id, language)
);

CREATE TABLE IF NOT EXISTS content.course_parts (
  course_id VARCHAR(20) NOT NULL REFERENCES content.courses(id) ON DELETE CASCADE,
  part INTEGER NOT NULL,

  PRIMARY KEY (course_id, part)
);

CREATE TABLE IF NOT EXISTS content.course_parts_localized (
  course_id VARCHAR(20) NOT NULL,
  part INTEGER NOT NULL,
  language VARCHAR(10) NOT NULL,

  -- Per part
  title TEXT NOT NULL,

  PRIMARY KEY (course_id, part, language),

  CONSTRAINT fk_course_parts_localized_to_course_parts
    FOREIGN KEY (course_id, part)
    REFERENCES content.course_parts(course_id, part)
    ON DELETE CASCADE,

  CONSTRAINT fk_course_parts_localized_to_course_localized
    FOREIGN KEY (course_id, language)
    REFERENCES content.courses_localized(course_id, language)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS content.course_chapters (
  course_id VARCHAR(20) NOT NULL,
  part INTEGER NOT NULL,
  chapter INTEGER NOT NULL,

  PRIMARY KEY (course_id, part, chapter),

  CONSTRAINT fk_course_chapters_to_course_parts
    FOREIGN KEY (course_id, part)
    REFERENCES content.course_parts(course_id, part)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS content.course_chapters_localized (
  course_id VARCHAR(20) NOT NULL,
  part INTEGER NOT NULL,
  chapter INTEGER NOT NULL,
  language VARCHAR(10) NOT NULL,

  -- Per chapter
  title TEXT NOT NULL,
  sections TEXT[] NOT NULL,
  raw_content TEXT NOT NULL,

  PRIMARY KEY (course_id, part, chapter, language),

  CONSTRAINT fk_course_chapters_localized_to_course_chapters
    FOREIGN KEY (course_id, part, chapter)
    REFERENCES content.course_chapters(course_id, part, chapter)
    ON DELETE CASCADE,

  CONSTRAINT fk_course_chapters_localized_to_course_localized
    FOREIGN KEY (course_id, language)
    REFERENCES content.courses_localized(course_id, language)
    ON DELETE CASCADE,

  CONSTRAINT fk_course_chapters_localized_to_course_parts_localized
    FOREIGN KEY (course_id, part, language)
    REFERENCES content.course_parts_localized(course_id, part, language)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS content.course_tags (
  course_id VARCHAR(20) NOT NULL REFERENCES content.courses(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES content.tags(id) ON DELETE CASCADE,

  PRIMARY KEY (course_id, tag_id)
);

--- TUTORIALS
CREATE TABLE IF NOT EXISTS content.tutorials (
  id SERIAL PRIMARY KEY,
  path VARCHAR(255) UNIQUE NOT NULL,

  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  subcategory VARCHAR(255),

  level VARCHAR(255) NOT NULL,
  builder VARCHAR(255),

  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_commit VARCHAR(40) NOT NULL,

  UNIQUE (name, category)
);

CREATE TABLE IF NOT EXISTS content.tutorials_localized (
  tutorial_id INTEGER NOT NULL REFERENCES content.tutorials(id) ON DELETE CASCADE,
  language VARCHAR(10) NOT NULL,

  -- Per translation
  title TEXT NOT NULL,
  description TEXT,
  raw_content TEXT NOT NULL,

  PRIMARY KEY (tutorial_id, language)
);

CREATE TABLE IF NOT EXISTS content.tutorial_tags (
  tutorial_id INTEGER NOT NULL REFERENCES content.tutorials(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES content.tags(id) ON DELETE CASCADE,

  PRIMARY KEY (tutorial_id, tag_id)
);

 --Key_dates
CREATE TABLE IF NOT EXISTS content.date_events (
  resource_id INTEGER PRIMARY KEY REFERENCES content.resources(id) ON DELETE CASCADE,
  date VARCHAR(255) NOT NULL,
  title TEXT NOT NULL,
  exact_date DATE NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT
);
