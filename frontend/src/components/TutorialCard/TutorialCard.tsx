import Card from "@/components/Card/Card";
import Image from "next/image";

async function fetchTutorialCard(
  tutorialID: number
) {
  const response = await fetch(`https://localhost:5000/tutorialCardInfo/${tutorialID}`);
  const cardInfo: ITutorialCard = await response.json();
  return cardInfo;
}

interface TutorialCardProps {
  tutorialID: number;
}
async function TutorialCard({ tutorialID }: TutorialCardProps) {
  const { title, description, imgSrc, imgAlt } = await fetchTutorialCard(
    tutorialID
  );
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
      {imgSrc && imgAlt && <Image src={imgSrc} alt={imgAlt} />}
    </Card>
  );
}

export default TutorialCard;
