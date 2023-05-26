'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();
    return (
    <Image onClick={() => router.push('/')} alt='laundropad logo' className='hidded md:block cursor-pointer' height={200} width={200} src="/images/logo.png"/>
  )
}

export default Logo