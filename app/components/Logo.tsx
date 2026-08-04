import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="GreenGarden Logo"
        width={40}
        height={40}
        priority
      />
      <span className="text-xl font-bold text-green-700">GreenGarden</span>
    </div>
  );
}
