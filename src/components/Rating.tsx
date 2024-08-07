import { format } from "date-fns";
import Image from "next/image";
import { ReactElement } from "react";
import type { Rating as RatingEntity } from "@/entities/rating.entity";

export default function Rating({ rating }: { rating: RatingEntity }): ReactElement {
  return (
    <div>
      <div className="flex items-center mb-4">
        {rating.user.avatarUrl ? (
          <Image
            src={rating.user.avatarUrl}
            className="w-10 h-10 me-4 rounded-full"
            alt="User avatar"
            height="36"
            width="36"
          />
        ) : (
          <div className="w-10 h-10 me-4 rounded-full p-2 bg-slate-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <div className="font-medium dark:text-white">
          <p>{rating.user.displayName}</p>
          <p suppressHydrationWarning className="block text-sm text-gray-500 dark:text-gray-400">
            Joined on {format(rating.user.createdAt, "MMMM d, yyyy")}
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        {rating.numStars >= 0 &&
          [...Array(rating.numStars)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        {rating.numStars < 5 &&
          [...Array(5 - rating.numStars)].map((_, i) => (
            <svg
              key={rating.numStars + i}
              className="w-4 h-4 text-gray-300 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
      </div>
      <footer className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <p suppressHydrationWarning>{format(rating.createdAt, "MMMM d, yyyy")}</p>
      </footer>
      {rating.comment && <p className="mb-2 text-gray-500 dark:text-gray-400">{rating.comment}</p>}
      
    </div>
  );
}
