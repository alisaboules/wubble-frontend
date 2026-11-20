import ScopeLogo from '@/assets/scopeLogo.svg';

export function Logo() {
  return (
    <div className="flex items-center drop-shadow-[0_0_25px_#FFFFFF80] gap-2">
      <ScopeLogo className="drop-shadow-[0_0_60px_#FFFFFF80]" />
      <h1 className="text-gblue [-webkit-text-stroke:0.5px_#122D70] [text-shadow:0_0_50px_#FFFFFF80] text-[36px] font-adam">
        Wubble
      </h1>
    </div>
  );
}
