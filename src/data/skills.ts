export interface SkillCategory {
  label: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["Python", "R", "SQL"],
  },
  {
    label: "AI / Machine Learning",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "HuggingFace",
      "OpenCV",
    ],
  },
  {
    label: "Data & Visualization",
    skills: [
      "Pandas",
      "GeoPandas",
      "Matplotlib",
      "Plotly",
      "Holoviews",
      "Tableau",
    ],
  },
  {
    label: "Tools & Cloud",
    skills: ["AWS", "GIT", "Postman", "SOAP", "Docker"],
  },
];
