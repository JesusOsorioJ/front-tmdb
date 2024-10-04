export function Porcentage({ value, circle = "80px", text = "18px" }) {
  return (
    <div className={`relative`} style={{ width: circle, height: circle }}>
      <svg
        className="absolute top-0 left-0"
        viewBox="0 0 36 36"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          className="circle-bg"
          d="M18 2.0845a 15.9155 15.9155 0 1 0 0 31.831 15.9155 15.9155 0 1 0 0-31.831"
          stroke="#eee"
          strokeWidth="3"
          fill="none"
        ></path>
        <path
          className="circle"
          strokeDasharray="85, 100"
          d="M18 2.0845a 15.9155 15.9155 0 1 0 0 31.831 15.9155 15.9155 0 1 0 0-31.831"
          stroke="#4caf50"
          strokeWidth="3"
          fill="none"
        ></path>
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontSize: text }}
      >
        {parseInt(value)}%
      </span>
    </div>
  );
}

export function Favorite({ checked }) {
  const color = checked ? "text-[#5877dd]" : "text-[#F6F6F6]";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 29.6"
      className={`w-[30px] h-[30px] ${color}`}
    >
      <path
        d="M23.6,0c-2.9,0-5.6,1.3-7.6,3.4C13.9,1.3,11.2,0,8.3,0C4.4,0,1,3.4,1,7.3c0,5.4,11.6,11.3,15.7,17.1
            c4.1-5.8,15.7-11.7,15.7-17.1C31,3.4,27.6,0,23.6,0z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Back() {
  return (
    <svg
      className="w-5 h-5 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}

export function Forward() {
  return (
    <svg
      className="w-5 h-5 ml-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export function Loading() {
  return (
    <div className="fixed h-screen w-screen flex items-center justify-center bg-white bg-opacity-40 z-50">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export function DeleteFilter({ color = "white" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <line x1="30" y1="30" x2="70" y2="70" stroke={color} strokeWidth="2" />
      <line x1="30" y1="70" x2="70" y2="30" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function LoadingIcon() {
  return (
    <div className="flex justify-center p-10">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export function Person({color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="100"
      height="100"
      fill={color}
    >
      <path d="M12 0c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 10c3.33 0 10 1.67 10 5v1h-20v-1c0-3.33 6.67-5 10-5z" />
    </svg>
  );
}
