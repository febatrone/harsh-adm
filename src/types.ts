export interface CTAItem {
  n: string;
  l: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  role: string;
  desc: string;
  accent: string;
  icon: string;
}

export interface ProjectItem {
  n: string;
  title: string;
  desc: string;
  tags: string[];
  label: string;
  cta: string;
  color: string;
}
