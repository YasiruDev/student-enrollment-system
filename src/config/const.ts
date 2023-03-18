import * as dotenv from 'dotenv';
dotenv.config();

export const LOG_PATH = process.env.LOG_PATH;
export const TOKEN_KEY = process.env.TOKEN_KEY;

export const VALIDATIONS = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  DTO_VALIDATION_ERROR: 'Error in DTO validation',
  INVALID_TOKEN: 'Invalid Token',
  UN_AUTHERIZED: 'Un-Autherized user',
};

export const STRING = {
  SUCCESS: 'Success',
  FAIL: 'Fail',
  RETRIEVE: 'Retrieve',
  CREATE: 'Create',
  UPDATE: 'Update',
  SUCCESSFULLY: 'Successfully',
  ADD_NEW_RECORD: 'add new record',
  FETCH_RECORD: 'fetch record',
  DUPLICATE_RECORD: 'Duplicate records',
  ACTIVE_COURSE_EXIST: 'Active course exists with the given course title.',
  NO_COURSE: 'Course not found',
  ENROLLED_SUCCESS: 'enrolled for the course',
  COURSE_FULL: 'Sorry,Course is full.You cannot enroll for this course',
  ALLREADY_ENROLL: 'You have allready enrolled for this course',
  ENROLL_NOT_FOUND: 'Cannot find enrollment records',
  DIS_ENROLLED_SUCCESS: 'disenrolled from the course',
  USER_EXIST: 'user already exist',
  USER: 'user',
  INVALID: 'Invalid',
  LOG_IN: 'Login',
};

export const LOG_FILE = {
  COURSE_CONTROLLER: 'course.controller.ts',
  COURSE_SERVICE: 'course.service.ts',
  STUDENT_CONTROLLER: 'student.controller.ts',
  STUDENT_SERVICE: 'student.service.ts',
  ADMIN_CONTROLLER: 'admin.controller.ts',
  ADMIN_SERVICE: 'admin.service.ts',
};

export const LOG_TITLE = {
  ADD_NEW_COURSE: 'addNewCourse',
  COURSE_LIST: 'courseList',
  ENROLL_COURSE: 'enrollCourse',
  DROP_COURSE: 'dropCourse',
  ENROLL_BY_STUDENT: '_enrollmentsByCourseIdAndStudentId',
  ENROLL_BY_COURSE: '_enrollmentsByCourseId',
  REG_STUDENT: 'regStudent',
  ADMIN_LOGIN: 'adminLogin',
};

export const LOG_TYPE = {
  REQUEST: 'Request',
  RESPONSE: 'Response',
  ERROR: 'error',
};

export const NUMBER = {
  ZERO: 0,
  ONE: 1,
};
