import React from "react";
import ProjectDisplay from "../components/ProjectDisplay/ProjectDisplay";

const PreviewProjectPage: React.FC = () => {
  const mockProject = {
    title: "World of Engineercraft",
    description:
      "A fantasy game about warriors of great Silesian university of technology.",
    imageURL:
      "https://effvision.com/wp-content/uploads/2024/06/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
    tags: ["Fantasy", "Creative"],
    category: "Gaming",
    fundingGoal: 10000,
    deadline: "2025-12-25",
    story:
      "## <center>Welcome to my project </center> <br /> This is a **great** fantasy game about Silesian warriors!",
    rewards: [
      {
        rewardId: 4,
        title: "Sword of amial",
        price: 2000,
        contents: true,
        description:
          "This sword was forged in the depths of Mordor, or more precisely in the aula A",
        imageURL:
          "https://preview.redd.it/i-3d-modelled-a-sword-using-the-witcher-3-shadow-of-mordor-v0-ew1lgcrrgm9b1.jpg",
        count: 20,
        deadline: "2024-12-31",
      },
    ],
  };

  return <ProjectDisplay {...mockProject} mode="preview" />;
};

export default PreviewProjectPage;
