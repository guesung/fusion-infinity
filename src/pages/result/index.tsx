export default function Result() {
  return (
    <div className='h-full p-4'>
      <div className='w-full rounded-3xl bg-white p-4'>
        <h1 className='text-bold mb-6 text-[20px]'>
          지난달 같은 기간 보다
          <div>
            <span className='text-main'>11,557원 더 사용</span>하고 있어요.
          </div>
        </h1>
        <div className='flex h-full justify-center gap-10'>
          <div className='flex w-[100px] flex-col items-center text-[.875rem]'>
            <p>지난달</p>
            <p>
              <b className='text-[24px]'>142.4</b>kwh
            </p>
            <p>13,234원</p>
          </div>
          <span className='bg-main my-[.3125rem] w-[.0625rem] items-stretch'></span>
          <div className='flex w-[100px] flex-col items-center text-[.875rem]'>
            <p>지난달</p>
            <p>
              <b className='text-[24px]'>142.4</b>kwh
            </p>
            <p>13,234원</p>
          </div>
        </div>
      </div>
    </div>
  );
}
