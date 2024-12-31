interface PortraitParams {
  portraitId: string;
}

interface PortraitInterface {
  params: PortraitParams;
}

export default async function Portrait({ params }: PortraitInterface) {
  return <div>My portrait: {params.portraitId}</div>;
}
