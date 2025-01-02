// import { getRefFromStorage } from "@/lib/firebase/firebase";

import { getRefFromStorage } from "@/lib/firebase/firebase";
import { getDownloadURL } from "@firebase/storage";
import Image from "next/image";

interface PortraitParams {
  portraitId: string;
}

interface PortraitPageProps {
  params: PortraitParams;
}

export default async function PortraitPage({ params }: PortraitPageProps) {
  const { portraitId } = await params;

  const imageRef = await getRefFromStorage(`portraits/${portraitId}/image.png`);
  const imageUrl = await getDownloadURL(imageRef);

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen px-32'>
      <div>My portrait: {portraitId}</div>
      <div className='w-64 h-64 overflow-hidden relative'>
        <Image src={imageUrl} alt={""} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}
