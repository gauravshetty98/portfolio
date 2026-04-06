export interface Publication {
  title: string;
  publisher: string;
  date: string;
  description: string;
  url: string;
  logo: string;
}

export const publications: Publication[] = [
  {
    title:
      "Sentiment Analysis and Classification on Twitter Spam Account Dataset",
    publisher: "IEEE Xplore",
    date: "Jul 2020",
    description:
      "Developed a sentiment analysis model using VADER and a Random Forest classifier to accurately identify Twitter spam accounts, achieving 94% accuracy.",
    url: "https://ieeexplore.ieee.org/document/9213206",
    logo: "/assets/ieee.jpeg",
  },
  {
    title:
      "Type-II Diabetes detection using Decision-tree based Ensemble of Classifiers",
    publisher: "IEEE Xplore",
    date: "Sept 2019",
    description:
      "Investigated the use of Decision Tree-based Ensemble classifiers for Type-II diabetes detection, achieving a maximum accuracy of 93.5% with XGBoost.",
    url: "http://ieeexplore.ieee.org/document/9129348/",
    logo: "/assets/ieee.jpeg",
  },
];
