export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  subscription_plan: SubscriptionPlan;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export type SubscriptionPlan = 'free' | 'pro';

export type TemplateType = 'modern' | 'classic' | 'minimal';

export interface PersonalInfo {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  current: boolean;
  description: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  gpa: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface ResumeData {
  personal_info: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  template: TemplateType;
  resume_data: ResumeData;
  created_at: string;
  updated_at: string;
}

export interface GenerateRequest {
  job_title: string;
  job_description: string;
  current_data: Partial<ResumeData>;
}

export interface GenerateResponse {
  summary: string;
  experience_bullets: Record<string, string[]>;
  skills: string[];
}

export const DEFAULT_RESUME_DATA: ResumeData = {
  personal_info: {
    full_name: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};
