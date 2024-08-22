import Card from "@/components/Card/Card";

interface TutorialCardProps {
  children?: React.ReactNode;
}
const TutorialCard = async ({ children }: TutorialCardProps) => {
  return <Card>{children}</Card>;
};

export default TutorialCard;
