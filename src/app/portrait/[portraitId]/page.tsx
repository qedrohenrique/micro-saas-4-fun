// import { getRefFromStorage } from "@/lib/firebase/firebase";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getRefFromStorage } from "@/lib/firebase/firebase";
import { getDownloadURL, listAll } from "@firebase/storage";
import Image from "next/image";

interface PortraitParams {
  portraitId: string;
}

interface PortraitPageProps {
  params: PortraitParams;
}

export default async function PortraitPage({ params }: PortraitPageProps) {
  const { portraitId } = await params;

  const portraitImagesRef = await getRefFromStorage(
    `portraits/${portraitId}/images`
  );
  const imageRefs = await listAll(portraitImagesRef);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen px-4 lg:px-32">
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          {imageRefs.items.map(async (imageRef) => {
            const imageUrl = await getDownloadURL(imageRef);
            return (
              <CarouselItem key={imageRef.fullPath} className='flex flex-col items-center justify-center'>
                <Image src={imageUrl} alt="Portrait" className='rounded-lg' width={768} height={1024}/>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='hidden lg:flex'/>
        <CarouselNext className='hidden lg:flex'/>
      </Carousel>
    </div>
  );
}
