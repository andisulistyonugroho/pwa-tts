interface Option {
  id: number;
  the_text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  chapter_id: number;
  question_text: string;
  the_level: number;
  options: Option[];
}
