import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#FAF6EF]  w-full overflow-x-hidden">
      {/* Footer PART */}
      <div className="px-36 py-20 h-auto bg-[#252525]">
        <div className="flex space-x-48">
          <ul className="space-y-3.5">
            <li className="text-xl text-white font-serif hover:text-gray-400 transition-colors duration-300 cursor-pointer">
              About{" "}
            </li>
            <li className="text-xl text-white font-serif hover:text-gray-400 transition-colors duration-300 cursor-pointer">
              Newsletter
            </li>
            <li className="text-xl text-white font-serif hover:text-gray-400 transition-colors duration-300 cursor-pointer">
              Press Area
            </li>
          </ul>
        </div>

        <div className="mt-20 flex justify-between">
          <div className="flex space-x-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="#fffcf6" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
                ></path>
                <path d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z"></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m17.5 6.51l.01-.011"
                ></path>
              </g>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="#fffcf6"
                d="M17.303 2.25H6.697A4.447 4.447 0 0 0 2.25 6.697v10.606a4.447 4.447 0 0 0 4.447 4.447h10.606a4.447 4.447 0 0 0 4.447-4.447V6.697a4.447 4.447 0 0 0-4.447-4.447m-8.46 15.742a.4.4 0 0 1-.4.423h-1.78a.41.41 0 0 1-.4-.412V10.6a.4.4 0 0 1 .4-.411h1.78a.4.4 0 0 1 .4.411zM7.52 8.632a1.467 1.467 0 1 1 .022-2.935A1.467 1.467 0 0 1 7.52 8.63m10.817 9.35a.39.39 0 0 1-.378.388H16.08a.39.39 0 0 1-.378-.389v-3.424c0-.511.156-2.223-1.356-2.223c-1.179 0-1.412 1.2-1.457 1.734v3.991a.39.39 0 0 1-.378.39h-1.823a.39.39 0 0 1-.389-.39v-7.493a.39.39 0 0 1 .39-.378h1.822a.39.39 0 0 1 .39.378v.645a2.59 2.59 0 0 1 2.434-1.112c3.035 0 3.024 2.835 3.024 4.447z"
                strokeWidth={0.5}
                stroke="#fff"
              ></path>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 16 16"
              className="mt-0.5"
            >
              <path
                fill="#fffcf6"
                d="M13.7 1H2.2A1.27 1.27 0 0 0 .927 2.273v11.5A1.27 1.27 0 0 0 2.2 15.046h6.36v-5.73H6.65v-1.91h1.91v-1.03c0-1.94.946-2.79 2.56-2.79c.772 0 1.18.057 1.37.083V5.5h-1.1c-.685 0-.924.361-.924 1.09v.816h2.01l-.272 1.91h-1.73v5.73h3.18a1.27 1.27 0 0 0 1.273-1.273v-11.5A1.27 1.27 0 0 0 13.654 1z"
                strokeWidth={0.5}
                stroke="#fff"
              ></path>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 24 24"
            >
              <path
                fill="#fffcf6"
                d="M15.073 2.5c1.824 0 3.293 0 4.45.155c1.2.162 2.21.507 3.012 1.31c.803.802 1.148 1.813 1.31 3.013C24 8.134 24 9.603 24 11.427v1.146c0 1.824 0 3.293-.155 4.45c-.162 1.2-.507 2.21-1.31 3.012c-.802.803-1.812 1.148-3.013 1.31c-1.156.155-2.625.155-4.449.155H8.927c-1.824 0-3.293 0-4.45-.155c-1.2-.162-2.21-.507-3.013-1.31c-.802-.802-1.147-1.812-1.309-3.013C0 15.866 0 14.397 0 12.573v-1.146c0-1.824 0-3.293.155-4.45c.162-1.2.507-2.21 1.31-3.013c.802-.802 1.813-1.147 3.013-1.309C5.634 2.5 7.103 2.5 8.927 2.5zm1.426 9.501L9.3 7.832v8.338z"
                strokeWidth={0.5}
                stroke="#fff"
              ></path>
            </svg>
          </div>

          <div className="text-gray-400 flex space-x-4">
            <p className="font-serif hover:text-gray-500 transition-colors duration-300 cursor-pointer">
              Disclaimer
            </p>
            <p className="font-serif hover:text-gray-500 transition-colors duration-300 cursor-pointer">
              Cookie Policy
            </p>
            <p className="font-serif hover:text-gray-500 transition-colors duration-300 cursor-pointer">
              General Conditions
            </p>
            <p className="font-serif hover:text-gray-500 transition-colors duration-300 cursor-pointer">
              Privacy Statement
            </p>
            <p className="font-serif hover:text-gray-500 transition-colors duration-300 cursor-pointer">
              ©2025 Lofticore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer
