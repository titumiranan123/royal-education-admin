interface CourseContent {
  live_class: string;
  total_subject: string[];
  lecture_sheet: string;
  total_exam: string;
}



interface CourseDetails {
  title: string;
  description: string;
}

interface CourseBenefit {
  title: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  course_thumbnail: string;
  description: string;
  type: string;
  course_content: CourseContent;
  price: string;
  enrollment_last_date: string;
  course_details: CourseDetails[];
  course_benefit: CourseBenefit[];
}
