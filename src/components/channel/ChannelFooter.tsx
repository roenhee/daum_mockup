export function ChannelFooter() {
  return (
    <footer className="bg-white px-4 pt-6 pb-8">
      <ul className="flex items-center gap-x-3 gap-y-2 flex-wrap text-[13px] text-gray-700">
        <li>
          <button type="button">로그아웃</button>
        </li>
        <Dot />
        <li>
          <button type="button">PC화면</button>
        </li>
        <Dot />
        <li>
          <button type="button">입점 문의</button>
        </li>
      </ul>
      <ul className="mt-3 flex items-center gap-x-2.5 gap-y-1 flex-wrap text-[11px] text-gray-500">
        <li>
          <button type="button">운영 정책</button>
        </li>
        <Dot small />
        <li>
          <button type="button">고객 센터</button>
        </li>
        <Dot small />
        <li>
          <button type="button">개인정보처리방침</button>
        </li>
      </ul>
      <p className="mt-4 text-[11px] text-gray-400">
        Copyright ⓒ Kakao Corp. All rights reserved.
      </p>
    </footer>
  );
}

function Dot({ small }: { small?: boolean }) {
  return (
    <li
      aria-hidden
      className={small ? 'text-[10px] text-gray-300' : 'text-gray-300'}
    >
      ·
    </li>
  );
}
