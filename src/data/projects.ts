export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  category: string[];
  keywords: string[];
  thumbnail: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  sections: {
    objective: string;
    keyFocus?: string;
    methodology: string;
    tools: string[];
    outcome: string;
    learnMore?: { url: string; text: string }[];
  };
  images: {
    overview?: string;
    methodology?: string;
    outcome?: string;
    extra?: { src: string; alt: string; caption?: string }[];
  };
}

export const projects: Project[] = [
  {
    slug: "metalearning-loss-functions",
    title:
      "Automating Loss Function Generation Using LLMs And Agentic AI Workflows",
    shortTitle: "AI Loss Function Generator",
    description:
      "This project automates a critical aspect of the neural network training pipeline: loss function generation. By leveraging large language models (LLMs) like CodeLlama, we dynamically generate PyTorch-compatible loss functions based on natural language task descriptions.",
    shortDescription:
      "Developing a system that dynamically creates and validates custom loss functions using LLMs, GPUs and Agentic AI workflows.",
    category: ["nlp", "ai-ml"],
    keywords: [
      "CodeLlama",
      "PyTorch",
      "HuggingFace",
      "Agentic AI",
      "GPU Acceleration",
    ],
    thumbnail: "/assets/metalearn.jpeg",
    featured: true,
    githubUrl:
      "https://github.com/gauravshetty98/Rubick-Automating-Loss-Function-Generation-Using-LLMs",
    sections: {
      objective:
        "The goal of this research is to develop a system that automatically creates loss functions using LLMs and Agentic AI workflow concepts. By analyzing the problem statement or the machine learning task, the system will generate PyTorch compatible loss functions tailored to the task, improving adaptability and performance. The workflow would not only generate a compatible loss function but also validate it, resolve any potential bugs and only then provide it to the user. Unlike manually designed loss functions, which often require extensive trial and error, this approach automates the process, making model training more efficient and reducing human effort.",
      methodology:
        "Leveraged CodeLlama-7B-Instruct to generate PyTorch-compatible loss functions based on task descriptions using a chat-style prompt format. Deployed the model on Rutgers University's Amarel HPC cluster for GPU-accelerated generation. Integrated a validation pipeline that performs syntax checking, unit testing, and automated retries for faulty outputs. Designed an agent-based feedback loop to classify and refine error classification and correction, improving function quality over time. Used PlantUML diagrams to visualize the workflow, and structured the workflow into inner and outer loops.",
      tools: [
        "PyTorch",
        "Hugging Face Transformers",
        "CodeLlama-7B-Instruct",
        "Amarel HPC Cluster (Rutgers)",
        "PlantUML",
        "Python (re, unittest, torch)",
      ],
      outcome:
        "Successfully built an automated pipeline that generates, validates, and refines custom loss functions using LLMs, reducing manual effort and improving model adaptability across diverse tasks.",
      learnMore: [
        {
          url: "https://medium.com/@myscale/agentic-workflow-for-llms-boost-ai-efficiency-and-automation-f4839ec78271",
          text: "Agentic Workflow for LLMs",
        },
        {
          url: "https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard#/",
          text: "HuggingFace Open LLM Leaderboard",
        },
      ],
    },
    images: {
      overview: "/assets/metalearning_overview.jpeg",
      methodology: "/assets/metalearning_block.jpeg",
      outcome: "/assets/rubick_example.jpeg",
      extra: [
        {
          src: "/assets/geneticprog_block.jpeg",
          alt: "Genetic programming block diagram",
        },
      ],
    },
  },
  {
    slug: "nextbuys",
    title: "NextBuys.co - A Recommendation Engine",
    shortTitle: "NextBuys.co",
    description:
      "NextBuys.co is a recommendation engine system that enhances product recommendations using Amazon transaction data. Leveraging a dataset of over 1.8 million transactions across 1,800 product categories, the system preprocesses data to identify multi-item purchases and applies cosine similarity to refine product categorization. Algorithms like FP-Growth and metrics like cosine similarity have been used to optimize these recommendations. A customer feedback loop to change recommendations based on user input.",
    shortDescription:
      "Created a website that recommends products using a combination of similarity metrics and association rule mining.",
    category: ["data-analytics"],
    keywords: [
      "FP-Growth",
      "Cosine Similarity",
      "Collaborative Filtering",
      "SQL",
    ],
    thumbnail: "/assets/nextbuys.jpeg",
    featured: true,
    githubUrl: "https://github.com/gauravshetty98/NextBuys",
    liveUrl: "https://nextbuys.co",
    sections: {
      objective:
        "To build a recommendation system capable of suggesting items based on purchase trends and item similarity.",
      keyFocus:
        "Enhancing user experience with tailored product recommendations.",
      methodology:
        "Utilized FP-Growth algorithm to identify items that are frequently bought together and used metrics such as lift and confidence to refine these suggestions. Implemented cosine similarity to identify items that are similar to each other. Also designed a customer feedback loop to let the users like or dislike the recommendations based on which they are altered.",
      tools: ["Python", "SQL", "HTML/CSS/JavaScript"],
      outcome:
        "Successfully developed an end-to-end recommendation system, blending machine learning with web development to provide an intuitive user experience.",
    },
    images: {
      overview: "/assets/nextbuys_overview.jpeg",
      methodology: "/assets/nextbys_block.png",
      outcome: "/assets/nextbuys_outcome.jpeg",
    },
  },
  {
    slug: "gauravgpt",
    title: "Intelligent Portfolio Chatbot: AI-Powered Interactive Resume",
    shortTitle: "GauravGPT",
    description:
      "This project is an AI-powered chatbot integrated into my portfolio website, designed to provide visitors with an interactive way to learn about my experiences, skills, and projects. Unlike a static resume, this chatbot leverages Retrieval-Augmented Generation (RAG) with an LLM model to answer questions dynamically based on structured information from my portfolio and additional documents.",
    shortDescription:
      "An AI-powered chatbot leveraging RAG and LLM to provide dynamic responses about me.",
    category: ["nlp", "ai-ml"],
    keywords: ["FAISS", "FastAPI", "Render", "RAG", "LLM"],
    thumbnail: "/assets/gauravgpt_details.jpeg",
    featured: false,
    githubUrl: "https://github.com/gauravshetty98/Chatbot-backend",
    liveUrl: "https://gauravshetty98.github.io/portfolio/chatbot",
    sections: {
      objective:
        "The primary objective of this project is to create a seamless and intelligent interface that allows recruiters, collaborators, and visitors to explore my professional background through natural language interactions.",
      keyFocus:
        "Providing precise, contextually relevant answers about my work. It integrates structured and unstructured data sources, ensuring that responses are both informative and aligned with my professional experience.",
      methodology:
        "The chatbot was built by first creating a structured document containing comprehensive details about my projects, experiences, publications, and other professional work. Using Python, I preprocessed the data by segmenting it into meaningful textual chunks. These chunks were then converted into vector embeddings using all-MiniLM-L6-v2, allowing semantic similarity searches. To store and index these embeddings efficiently, I implemented FAISS (Facebook AI Similarity Search). For response generation, I integrated Gemini-2.0-Flash. The core retrieval workflow involves taking a user query, using FAISS to fetch the most relevant information, and then passing both the query and retrieved data to the LLM for response generation. I built a FastAPI backend deployed on Render.",
      tools: [
        "Python",
        "FAISS",
        "SentenceTransformer (all-MiniLM-L6-v2)",
        "Gemini-2.0-Flash",
        "FastAPI",
        "Render",
        "HTML/CSS/JavaScript",
      ],
      outcome:
        "The chatbot significantly enhances user experience by providing a conversational and engaging way to explore my work. It allows visitors to receive tailored responses without manually searching through different sections of the portfolio.",
    },
    images: {
      overview: "/assets/gauravgpt_overview.jpeg",
      methodology: "/assets/gauravgpt_block.jpg",
      outcome: "/assets/gauravgpt_result.jpeg",
    },
  },
  {
    slug: "adversarial-attacks",
    title:
      "A Study on Adversarial Attacks and Defenses in Deep Learning Models",
    shortTitle: "Adversarial Attacks Study",
    description:
      "This project explores inference attacks on machine learning models, highlighting both attack strategies and defense mechanisms. Using a PyTorch-based computer vision model for vehicle damage assessment, we demonstrate how an attacker can exploit weaknesses using the Fast Gradient Sign Method (FGSM) to significantly degrade model accuracy. Additionally, we showcase defensive techniques such as Gaussian Noise Augmentation and adversarial training to mitigate these attacks.",
    shortDescription:
      "Exploring inference attacks in machine learning and methods to defend against them.",
    category: ["computer-vision", "ai-ml"],
    keywords: [
      "TensorFlow",
      "Keras",
      "OpenCV",
      "ART",
      "PyTorch",
      "LIME",
    ],
    thumbnail: "/assets/attack.jpeg",
    featured: true,
    githubUrl:
      "https://github.com/gauravshetty98/Inference-Attack-On-Insurance-Claim-Model/blob/main/RobustML.ipynb",
    sections: {
      objective:
        "This project aims to analyze the impact of adversarial attacks on deep learning models, focusing on inference attacks and defense mechanisms in computer vision applications.",
      keyFocus:
        "Observing how vulnerable machine learning models are against these attacks and the effectiveness of defense mechanisms.",
      methodology:
        "The project follows a structured approach, beginning with the development and training of a computer vision model for vehicle damage assessment using PyTorch. After establishing a baseline accuracy of 77%, we implement FGSM attacks to craft adversarial samples and assess their impact on model performance. The model performance dropped to 16% based on these attacks. We also look into defensive techniques such as Gaussian Noise Augmentation and implement adversarial training.",
      tools: ["ART library", "PyTorch", "Torchvision", "LIME"],
      outcome:
        "This study demonstrates how even machine learning models are exposed to security risks like these attacks which can degrade the model performance. It also shows ways to defend against these attacks emphasizing the necessity of adversarial defense mechanisms in securing AI applications.",
    },
    images: {
      overview: "/assets/attack_overview.jpeg",
      methodology: "/assets/attack_methodology.jpeg",
      outcome: "/assets/adattack_outcome.jpeg",
    },
  },
  {
    slug: "heart-failure-regression",
    title:
      "Assessing Heart Failure Risk: Statistical Modeling with Logistic Regression",
    shortTitle: "Heart Failure Risk Model",
    description:
      "This project explores the use of logistic regression for predicting heart failure survival, leveraging statistical modeling to understand key health predictors. Exploratory data analysis (EDA) was performed to uncover patterns and relationships within patient records. Techniques like stepwise selection were used to optimize model performance while maintaining interpretability.",
    shortDescription:
      "Analysing survival chance of heart failure patients using statistical modeling and interpreted model results.",
    category: ["statistical-modeling"],
    keywords: ["R", "Statistical Testing", "Model Explainability"],
    thumbnail: "/assets/regression.jpeg",
    featured: false,
    githubUrl:
      "https://github.com/gauravshetty98/Predicting-Heart-Failure-Survival-Using-Logistic-Regression",
    sections: {
      objective:
        "This project aims to assess heart failure risk by leveraging logistic regression to predict patient survival based on key health indicators. It also explores the different statistical methods used for model optimization, feature selection and model explainability.",
      keyFocus:
        "Using the various statistical analysis methods to analyse the model and interpret its results.",
      methodology:
        "The study begins with exploratory data analysis (EDA) to identify patterns, correlations, and outliers within patient records. Feature selection is performed using stepwise regression. Model accuracy and reliability are assessed through residual analysis and validation metrics such as chi square tests and confusion matrices. Additionally, odds ratios are computed to quantify the impact of individual health factors on survival probability.",
      tools: ["R", "Generalized Linear Models", "Statistical/EDA libraries in R"],
      outcome:
        "The project shows in the emerging world of complex neural networks, how a statistical model can provide accurate results while maintaining simplicity and being interpretable. Key risk factors such as age, ejection fraction, and creatinine levels significantly influence survival probability.",
    },
    images: {
      overview: "/assets/regression_overview.jpeg",
      methodology: "/assets/regression_block.png",
      outcome: "/assets/regression_outcome.png",
    },
  },
  {
    slug: "lstm-sentiment-analysis",
    title:
      "Deep Learning for Sentiment Analysis: IMDb Movie Reviews with LSTMs",
    shortTitle: "LSTM Sentiment Analysis",
    description:
      "This project explores sentiment analysis on a movie reviews dataset using bi-directional Long Short-Term Memory (LSTM) networks, showcasing the application of deep learning in Natural Language Processing (NLP). The model is designed to analyze the sentiment of movie reviews, leveraging one-hot encoding for vectorization to capture contextual dependencies in text data.",
    shortDescription:
      "Implemented a Bi-directional LSTM to perform sentiment analysis on movie reviews.",
    category: ["nlp", "ai-ml"],
    keywords: [
      "NLTK",
      "spaCy",
      "PyTorch",
      "BERT",
      "Bi-directional LSTMs",
    ],
    thumbnail: "/assets/lstm_nlp.jpeg",
    featured: false,
    githubUrl: "https://github.com/gauravshetty98/nextbuys",
    sections: {
      objective:
        "The aim of this project was to explore the applications of deep learning algorithms like Long Short-Term Memory networks in the field of Natural Language Processing.",
      keyFocus:
        "Implementing a recurrent neural network and comparing its performance with other architectures for NLP tasks.",
      methodology:
        "The dataset is preprocessed through one-hot encoding to transform text into numerical vectors. A bi-directional LSTM architecture is implemented with multiple layers followed by a sigmoid activation function for binary classification. The model is trained and evaluated using standard metrics such as accuracy, precision, recall, and F1-score, while techniques like dropout regularization are applied to prevent overfitting.",
      tools: ["Python", "TensorFlow", "Keras", "Scikit-learn"],
      outcome:
        "The study underscores the importance of deep learning in NLP applications, particularly in understanding sentiment and context within textual data. The findings suggest that LSTMs are well-suited for sentiment analysis, paving the way for further improvements using attention mechanisms or transformer-based models.",
    },
    images: {
      overview: "/assets/lstm_overview.jpeg",
      methodology: "/assets/lstm_block.jpeg",
    },
  },
  {
    slug: "monty-industry-analytics",
    title:
      "ML-Driven Industry Analytics: LinkedIn, BERT, and GIS in Action",
    shortTitle: "MONTY Analytics",
    description:
      "This project aimed to provide industry analytics based on a user's LinkedIn profile, offering insights into salary trends, job openings, and industry shifts pre- and post-COVID. A dashboard built with Plotly Dash integrated the LinkedIn API to fetch user data and analyzed Bureau of Labor Statistics datasets.",
    shortDescription:
      "Combined data analysis with machine learning and LinkedIn API to produce customised Industry analytics.",
    category: ["nlp", "data-analytics", "statistical-modeling"],
    keywords: [
      "BERT",
      "REST API",
      "GIS",
      "Cosine Similarity",
      "Plotly Dash",
    ],
    thumbnail: "/assets/monty.jpeg",
    featured: false,
    githubUrl: "https://github.com/gauravshetty98/MONTY",
    sections: {
      objective:
        "The project aimed to leverage machine learning and NLP techniques to deliver personalized career insights by analyzing data from the Bureau of Labor Statistics and the LinkedIn API.",
      keyFocus:
        "Combining concepts across various fields to create a dashboard to show personalized industry analysis.",
      methodology:
        "The project utilizes a Plotly Dash-based interactive dashboard. User details fetched from LinkedIn API are preprocessed before applying NLP techniques to find user's industry data from Bureau of Labour statistics. A combination of word embeddings derived through BERT and cosine similarity metric is used to identify the user's industry. In-depth analysis showcases different trends including geographic hotspots with GIS libraries.",
      tools: [
        "LinkedIn API",
        "BERT",
        "Cosine Similarity",
        "Plotly Dash",
        "GeoPandas",
        "Folium",
      ],
      outcome:
        "The study helped in creating a system for providing career insights based on a user's industry. It highlights how Data Science techniques can transform labor market insights into actionable career decisions. This project lays the foundation for AI-powered career advisory tools.",
    },
    images: {
      overview: "/assets/monty_overview.jpeg",
      outcome: "/assets/monty_outcome.jpeg",
      extra: [
        { src: "/assets/monty_overview_2.jpeg", alt: "Dashboard view 1" },
        { src: "/assets/monty_overview_3.jpeg", alt: "Dashboard view 2" },
      ],
    },
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "computer-vision", label: "Computer Vision" },
  { id: "nlp", label: "NLP" },
  { id: "statistical-modeling", label: "Statistical Modeling" },
  { id: "data-analytics", label: "Data Analytics" },
];
