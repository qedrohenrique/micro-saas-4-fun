"use client";

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
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner"; // Supondo que você tenha um componente de Spinner
import React from "react";

interface PortraitParams {
  portraitId: string;
}

interface PortraitPageProps {
  params: Promise<PortraitParams>;
}

export default function PortraitPage({ params }: PortraitPageProps) {
  const { portraitId } = React.use(params);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const portraitImagesRef = await getRefFromStorage(
          `portraits/${portraitId}/images`
        );
        const imageRefs = await listAll(portraitImagesRef);

        const urls = await Promise.all(
          imageRefs.items.map((imageRef) => getDownloadURL(imageRef))
        );

        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [portraitId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen px-4 lg:px-32">
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          {loading ? (
            <div className="flex items-center justify-center h-full w-full">
              <Spinner className="w-8 h-8" />
            </div>
          ) : (
            imageUrls.map((imageUrl, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <Image
                  src={imageUrl}
                  alt={`Portrait ${index + 1}`}
                  className="rounded-lg"
                  width={768}
                  height={1024}
                />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
}
