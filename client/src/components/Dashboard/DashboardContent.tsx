import InteractiveRoom from "../InteractiveRoom/InteractiveRoom";

type DashboardContentProps = {
  username: string;
};

function DashboardContent({ username }: DashboardContentProps) {
  return (
    <div>
      <InteractiveRoom username={username} />
    </div>
  );
}

export default DashboardContent;
