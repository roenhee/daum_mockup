function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="text-[12px] text-gray-500">
      {children}
    </button>
  );
}

function Sep() {
  return (
    <span className="text-gray-300" aria-hidden>
      |
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-gray-100 px-4 py-5 flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-3">
        <FooterLink>내정보</FooterLink>
        <Sep />
        <FooterLink>로그아웃</FooterLink>
        <Sep />
        <FooterLink>PC화면</FooterLink>
        <Sep />
        <FooterLink>전체보기</FooterLink>
      </div>
      <div className="flex items-center gap-3">
        <FooterLink>이용 약관</FooterLink>
        <Sep />
        <FooterLink>고객센터</FooterLink>
        <Sep />
        <FooterLink>유해정보신고</FooterLink>
      </div>
      <div className="mt-1 text-[11px] text-gray-500">© AXZ Corp</div>
    </footer>
  );
}
