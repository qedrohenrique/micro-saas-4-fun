// import { getRefFromStorage } from "@/lib/firebase/firebase";

interface PortraitParams {
  portraitId: string;
}

interface PortraitInterface {
  params: PortraitParams;
}

export default async function Portrait({ params }: PortraitInterface) {
  // const portraitRef = await getRefFromStorage(`portraits/${params.portraitId}`);

  return <div>My portrait: {params.portraitId}</div>;
}
