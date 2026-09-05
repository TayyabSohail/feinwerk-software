/** Site-wide backdrop: two soft brand glows, nothing that draws lines. */
export function Backdrop() {
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'
    >
      <div className='absolute -right-40 top-[30vh] h-[36rem] w-[36rem] rounded-full bg-brand/[0.07] blur-[140px]' />
      <div className='absolute -left-52 top-[75vh] h-[30rem] w-[30rem] rounded-full bg-brand/[0.05] blur-[140px]' />
    </div>
  );
}
