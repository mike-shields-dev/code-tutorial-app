import Card from "@/components/Card/Card";
import { getTutorialCardConfig } from "@/utils/localFileSystemMethods";
import Image from "next/image";

interface TutorialCardProps {
  tutorialID: string;
}

async function TutorialCard({ tutorialID }: TutorialCardProps) {
  const { title, description, imgSrc, imgAlt } = await getTutorialCardConfig(
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
