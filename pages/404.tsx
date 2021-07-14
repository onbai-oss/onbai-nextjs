import Link from 'next/link'

export default function Custom404() {
  return (
    <div
      className={`
    w-screen h-screen flex flex-col justify-start items-center
    `}
    >
      <h1 className={`text-2xl mb-4 mt-10 font-semibold`}>Page Not Found!</h1>

      <div className={`my-3`}>
        <img
          className={`shadow-md hover:shadow-lg transform hover:-skew-y-2 rounded-md`}
          width="320"
          src="https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=995&q=80"
          alt=""
        />
      </div>
      <div className={`my-5`}>
        <Link href="/">
          <div
            className={`flex justify-items-center items-center cursor-pointer`}
          >
            <i
              data-eva="arrow-back-outline"
              data-eva-fill="rgba(59, 130, 246,1)"
            ></i>
            <a className={`hover:underline text-blue-500 font-semibold`}>
              Back to home page.
            </a>
          </div>
        </Link>
      </div>
    </div>
  )
}
