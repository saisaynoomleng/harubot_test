import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Button asChild>
        <Link href="/chat">Go to Chat</Link>
      </Button>
    </div>
  );
}
