import { Button } from "@/components/ui/button";
import { getRefFromStorage } from "@/lib/firebase/firebase";
import { getDownloadURL } from "@firebase/storage";
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SuccessParams {
  portraitId: string;
}

interface SuccessPageProps {
  params: SuccessParams;
}


export default async function SuccessPage({ params }: SuccessPageProps) {
  const { portraitId } = await params;

  const portraitDataRef = await getRefFromStorage(`portraits/${portraitId}/info.json`);
  const dataUrl = await getDownloadURL(portraitDataRef);

  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch the JSON file');
  }
  const data = await response.json();

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen gap-8'>
      <Link href={`/portrait/${portraitId}`} >
        <Button variant='outline'>
          <SquareArrowOutUpRight /> Acesse seu site
        </Button>
      </Link>
      <Image className='rounded-lg' src={data.qrCode} alt="QR Code" width={256} height={256}/>
    </div>
  )
}