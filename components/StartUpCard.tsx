import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {Author,Startup } from "@/sanity/types";

// Omit is used to omit the author field from the Startup type and get the type of remaning variables without manual coding as below
export type StartUpCardType = Omit<Startup,"author"> & {
    author?:Author
}
// export type StartUpCardType = {
//   _createdAt: string;
//   _id: number;
//   views: number;
//   author: { _id: number; name: string };
//   _title: string;
//   description: string;
//   image: string;
//   category: string;
// }

const StartUpCard = ({post}: {post: StartUpCardType}) => {
    const {_createdAt,_id,views,author,title,description,image,category}=post;
  return (
    <li className="startup-card group text-black">
        <div className="flex-between">
            <p className="startup_card_date">
                {formatDate(_createdAt)}
            </p>
            <div className="flex gap-1.5">
                <EyeIcon className="size-6 text-primary" />
                <span className="text-16-medium">{views}</span>
            </div>
        </div>
        <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${author?._id}`}>
                    <p className="text-16-medium line-clamp-1">{author?.name}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className="text-26-semibold line-clamp-1">
                        {title}
                    </h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
                <Image src={author?.image || ""} alt={author?.name || ""} width={48} height={48} className="rounded-full" />
            </Link>
        </div>

        <Link href={`/startup/${_id}`}>
            <p className="startup-card_desc">
                {description}
            </p>
            <img src={image} alt="placeholder" className="startup-card_img" />
        </Link>
        <div className="flex-between gap-3 mt-5">
            <Link href={`/?query=${category ? category.toLowerCase() : ''}`}>
                <p className="text-16-medium">{category}</p>
            </Link>
            <Button className="startup-card_btn" asChild>
                <Link href={`/startup/${_id}`}>
                Details
                </Link>
            </Button>
        </div>
    </li>
  )
}

export default StartUpCard