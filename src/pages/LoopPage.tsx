import { BottomTabBar } from '@/components/layout/BottomTabBar';

export function LoopPage() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[14px] text-gray-500">작업 예정</p>
      </div>
      <BottomTabBar />
    </div>
  );
}
